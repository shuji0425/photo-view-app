-- ============================================
-- 初期管理者ユーザー（開発用）
-- ユーザー名: test
-- パスワード: password（bcrypt）
-- ============================================

INSERT INTO users (username, email, password_hash, role)
VALUES (
  'test',
  'test@example.com',
  '$2a$10$QMCes0Muo7875pB3AnR62eZP.YrQgirq5EZlhS91kmeUeYwb/tPH2', -- "password" のbcrypt
  'admin'
);
