# English Testing Platform Backend API

Dự án cung cấp Backend API cho nền tảng thi thử tiếng Anh (VSTEP, IELTS), bao gồm quản lý người dùng, tạo bài thi (Reading, Listening, Writing, Speaking), và hệ thống tự động chấm điểm trắc nghiệm.

1.Công nghệ và cấu trúc

    -  **Runtime:** Node.js

* **-Framework:** Express.js
* **-Database:** MongoDB (Mongoose)

###### 2.Danh sách APIs

ResultTest:

| Phương thức | Đường dẫn          | Mô tả                      | Role |
| -------------- | ---------------------- | ---------------------------- | ---- |
| GET            | api/getResult/:id      | Lấy kết quả bài thi      | user |
| GET            | api/getAllResultOfUser | Lấy tất cả bài đã làm | user |

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
