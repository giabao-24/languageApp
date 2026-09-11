# English Testing Platform Backend API

Dự án cung cấp Backend API cho nền tảng thi thử tiếng Anh (VSTEP, IELTS), bao gồm quản lý người dùng, tạo bài thi (Reading, Listening, Writing, Speaking), và hệ thống tự động chấm điểm trắc nghiệm.

1.Công nghệ và cấu trúc

    -  **Runtime:** Node.js

* **-Framework:** Express.js
* **-Database:** MongoDB (Mongoose)

###### 2.Danh sách APIs

| Phương thức | Đường dẫn             | Mô tả                                                                                                                                                                                                                                                                        | Role  |
| -------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| POST           | api/submitVocabQuiz       | Thực hiện nộp chấm bài và lưu kết quả                                                                                                                                                                                                                                 | user  |
| GET            | api/myVocabResult         | Lấy kết quả bài thi và hiển thị như là lịch sử bài làm hiển thị lên dashboard của user                                                                                                                                                                        | user  |
| GET            | api/getVocabResult/:id    | `Hiển thị trang "Xem lại chi tiết" sau khi vừa nộp bài xong hoặc khi người dùng bấm vào xem lại từ lịch sử.`                                                                                                                                                | user  |
| GET            | api/getAllVocabResult     | Cung cấp dữ liệu tổng tổng quan cho Admin Dashboard để thống kê lượng người học, phổ điểm, hoặc bộ từ vựng nào đang hot nhất.                                                                                                                          | admin |
| DELETE         | api/deleteVocabResult/:id | Cho phép Admin dọn dẹp dữ liệu rác. Đặc biệt quan trọng khi Admin xóa một bộ`VocabQuiz`, bạn sẽ cần tự động gọi lệnh xóa toàn bộ các `VocabResult` liên quan đến ID bộ từ vựng đó để tránh lỗi văng app do dữ liệu bị đứt gãy. | admin |

VocabQuiz:

| Phương thức | Đường dẫn           | Mô tả                                                                                                                     | Role  |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----- |
| GET            | api/getAllVocabQuizzes  | Chỉ cung cấp phần vỏ cho admin và user để hiển thị thông tin của một bộ quiz nhưng không trả về câu hỏi. | user  |
| GET            | api/getVocabQuiz/:id    | Lấy bộ câu hỏi cụ thể và hiển thị luôn bài làm                                                                  | user  |
| PUT            | api/updateVocabQuiz/:id | Cập nhật Quiz theo id cụ thể                                                                                            | admin |
| DELETE         | api/deleteVocabQuiz/:id | Xóa quiz theo id                                                                                                           | admin |
| POST           | api/submitVocabQuiz     | Nộp bài quiz và chấm điểm                                                                                             | user  |

ResultTest:

| Phương thức | Đường dẫn          | Mô tả                         | Role |
| -------------- | ---------------------- | ------------------------------- | ---- |
| GET            | api/getResult/:id      | Lấy kết quả bài thi theo id | user |
| GET            | api/getAllResultOfUser | Lấy tất cả bài đã làm    | user |

Test:

| Phương thức | Đường dẫn      | Mô tả                | Role  |
| -------------- | ------------------ | ---------------------- | ----- |
| POST           | api/createTest     | Tạo bài thi          | Admin |
| GET            | api/getTest/:id    | Lấy bài thi          | User  |
| GET            | api/getAllTests    | Lấy tất cả bài thi | X     |
| DELETE         | api/deleteTest/:id | Xóa test              | Admin |
| POST           | api/submitTest     | Nộp bài              | user  |

User :

| Phương thức | Đường dẫn                | Mô tả                          | Role  |
| -------------- | ---------------------------- | -------------------------------- | ----- |
| POST           | /users/login                 | Đăng nhập user                | X     |
| POST           | /users/register              | Đăng ký user                  | X     |
| GET            | /users/getUserInformation    | Lấy thông tin user             | user  |
| DELETE         | /users/deleteAccount         | Xóa tài khoản user            | user  |
| DELETE         | /users/deleteUserAccount     | Xóa tài khoản user            | admin |
| PUT            | /users/updateUserInformation | Cập nhật thông tin            | user  |
| GET            | /users/getAllUsers           | Lấy thông tin tài khoản      | admin |
| PUT            | /users/updateUserByAdmin/:id | Admin cập nhật thông tin user | admin |
