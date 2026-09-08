const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Kiểm tra xem Frontend có gửi token lên qua Header không (Chuẩn Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Cắt lấy chuỗi token (Vì chuỗi gửi lên có dạng: "Bearer asdfghjkl...")
      token = req.headers.authorization.split(' ')[1];

      // 2. Giải mã token bằng chìa khóa bí mật
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Tìm user trong DB bằng ID vừa giải mã, và BỎ QUA không lấy password
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Cho phép đi tiếp vào Controller
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Không có quyền truy cập, token hỏng hoặc hết hạn' });
    }
  }

  // Nếu không có token ngay từ đầu
  if (!token) {
    return res.status(401).json({ message: 'Không có quyền truy cập, không tìm thấy token' });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Không có quyền truy cập, chỉ admin mới được phép' });
  }
}
module.exports = { protect ,checkAdmin};