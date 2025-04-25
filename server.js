require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

// Thiết lập các biến môi trường mặc định nếu không tìm thấy file .env
// ===== THAY THẾ CÁC GIÁ TRỊ NÀY BẰNG CLIENT ID VÀ CLIENT SECRET TỪ GOOGLE CLOUD CONSOLE =====
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "1027700739625-0pm0f6c0j7qvtu74b8re8jm3h30aqb40.apps.googleusercontent.com"; // Client ID của bạn
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "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"; // Client Secret của bạn
process.env.JWT_SECRET = process.env.JWT_SECRET || "quiz-management-jwt-secret";
process.env.SESSION_SECRET = process.env.SESSION_SECRET || "quiz-management-session";

// Import routes sau khi đã thiết lập các biến môi trường
const authRoutes = require('./app/api/auth/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Hiển thị biến môi trường để debug
console.log('Đang sử dụng CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Đang sử dụng CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET.substring(0, 5) + '...');

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Đăng ký routes
app.use('/api/auth', authRoutes);

// Route mặc định
app.get('/', (req, res) => {
  res.send('API đang hoạt động');
});

// Xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi server' });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
}); 