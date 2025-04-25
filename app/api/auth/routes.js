const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

// Cấu hình Passport với Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google profile:', profile);
    
    // Tìm hoặc tạo người dùng trong cơ sở dữ liệu của bạn
    // Đây là nơi bạn sẽ lưu thông tin người dùng từ Google
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
      // Mặc định role là participant, có thể thay đổi trong cơ sở dữ liệu thực tế
      role: 'participant'
    };
    
    // Trong một ứng dụng thực tế, bạn sẽ thêm logic để lưu vào cơ sở dữ liệu
    // Ví dụ: const savedUser = await User.findOrCreate(user);
    
    return done(null, user);
  } catch (error) {
    console.error('Lỗi xác thực Google:', error);
    return done(error, null);
  }
}));

// Lưu thông tin người dùng vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route bắt đầu quá trình đăng nhập Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback URL sau khi Google xác thực thành công
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    try {
      // Tạo JWT token để client lưu trữ
      const token = jwt.sign(
        { 
          id: req.user.googleId, 
          email: req.user.email,
          name: req.user.name,
          avatar: req.user.avatar,
          role: req.user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Thời gian token hợp lệ lâu hơn
      );
      
      console.log('Đăng nhập thành công, chuyển hướng với token');
      
      // Redirect về client với token
      res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3001'}/auth/success?token=${token}`);
    } catch (error) {
      console.error('Lỗi khi tạo token:', error);
      res.redirect('/login?error=authentication_failed');
    }
  }
);

// Route kiểm tra người dùng hiện tại
router.get('/current-user', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Không có token xác thực' });
  }
  
  const token = req.headers.authorization.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch (error) {
    console.error('Lỗi xác thực token:', error);
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
});

// Route đăng xuất
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Lỗi khi đăng xuất:', err);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng xuất' });
    }
    res.json({ success: true });
  });
});

module.exports = router; 