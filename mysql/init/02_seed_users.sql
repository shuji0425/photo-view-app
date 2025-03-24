-- ============================================
-- 初期管理者ユーザー（開発用）
-- ユーザー名: test
-- パスワード: password（SHA256）
-- ============================================

INSERT INTO users (username, email, password_hash, role)
VALUES (
  'test',
  'test@example.com',
  '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', -- "password" のSHA256
  'admin'
);
