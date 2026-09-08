# English Testing Platform Backend API

Dự án cung cấp Backend API cho nền tảng thi thử tiếng Anh (VSTEP, IELTS), bao gồm quản lý người dùng, tạo bài thi (Reading, Listening, Writing, Speaking), và hệ thống tự động chấm điểm trắc nghiệm.

## 1. Công nghệ & Cấu trúc

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose)

## 2. Quy trình Logic Cốt lõi

### 2.1. Bảo mật đáp án (Anti-cheat)

Khi Frontend gọi API lấy đề thi, Backend bắt buộc cắt bỏ trường `correctAnswer` trước khi trả về để tránh lộ đáp án qua Network tab.

```javascript
// Dùng hàm select() của Mongoose để loại trừ
Test.findById(testId).select('-content.reading.questions.correctAnswer -content.listening.questions.correctAnswer')
```

### 2.2. Chấm điểm tự động (Auto-Grading)

1. Thí sinh nộp bài, Frontend gửi mảng các lựa chọn (A, B, C, D).
2. Backend query DB lấy bài Test gốc (bao gồm đáp án thật).
3. Code chạy vòng lặp đối chiếu `selectedOption` với `correctAnswer`.
4. Gán `isCorrect`, tính tổng điểm và lưu xuống bảng `Result`.

### 2.3. Vòng đời bài thi (Status Pipeline)

* `in_progress`: Thí sinh bắt đầu làm bài (đếm giờ từ `startedAt`).
* `submitted`: Thí sinh nộp bài, máy đã chấm xong trắc nghiệm.
* `graded`: Giáo viên chấm xong tự luận (Speaking/Writing) và chốt điểm cuối cùng.

**2.4.Danh sách API cốt lõi :**

User :

| Phương thức | Đường  | col3 |
| -------------- | ---------- | ---- |
|                |            |      |
|                |            |      |
