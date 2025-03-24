-- ============================================
-- 初期管理者ユーザー（開発用）
-- ユーザー名: test
-- パスワード: password（bcrypt）
-- ============================================

INSERT INTO users (username, email, password_hash, role)
VALUES (
  'test',
  'test@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZo5e.PBLT1/kZ3W6f6qfQfLgG03AO7r2eBLa', -- "password" のbcrypt
  'admin'
);
