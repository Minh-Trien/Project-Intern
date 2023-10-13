const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sử dụng bodyParser để lấy dữ liệu từ biểu mẫu POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cài đặt cổng và lắng nghe kết nối
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Đường dẫn POST để xử lý gửi email từ biểu mẫu liên hệ
app.post('/contact', (req, res) => {
  const { name, phone, email, message } = req.body;

  // Tạo một máy chủ email với Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: 'trien112345@gmail.com', // Thay thế bằng email của bạn
      pass: 'xulgjwocwxdwoatb', // Thay thế bằng mật khẩu của bạn
    },
  });
  // Cấu hình email
  const mailOptions = {
    from: 'trien112345@gmail.com', // Thay thế bằng email của bạn
    to: 'satnhangaming@gmail.com', // Thay thế bằng địa chỉ email của người nhận
    subject: 'Liên hệ từ trang web',
    text: `Tên: ${name}\nSố điện thoại: ${phone}\nEmail: ${email}\nNội dung: ${message}`,
  };
  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Có lỗi xảy ra khi gửi email.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email đã được gửi thành công.' });
    }
  });
});
