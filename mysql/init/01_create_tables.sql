-- ============================================
-- ユーザー情報を管理するテーブル
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE, -- 表示名やログイン名
  email VARCHAR(255) NOT NULL UNIQUE,    -- メールアドレス
  password_hash VARCHAR(255) NOT NULL,   -- パスワードのハッシュ値
  role ENUM('admin', 'user') DEFAULT 'user', -- 管理者か一般ユーザーか
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- カテゴリを管理するテーブル
-- 例: 風景 / ポートレート / モノクロ など
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE, -- カテゴリ名
  sort_order INT NOT NULL DEFAULT 0,  -- 並び順
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 写真のメイン情報を管理するテーブル
-- タイトル、説明、カテゴリ、投稿者など
-- ============================================
CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL UNIQUE,    -- アップロードされた画URL
  width INT NOT NULL DEFAULT 0,              -- 横幅
  height INT NOT NULL DEFAULT 0,             -- 高さ
  aspect_ratio DECIMAL(5,2),                 -- アスペクト比
  title VARCHAR(255),                        -- タイトル（任意）
  description TEXT,                          -- 説明文（任意）
  category_id INT,                           -- カテゴリ（外部キー）
  user_id INT,                               -- 投稿者（外部キー）
  is_visible BOOLEAN NOT NULL DEFAULT FALSE, -- 表示切り替え
  taken_at DATETIME,                         -- 撮影日
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- 写真に紐づくExif情報を保存するテーブル
-- カメラ・レンズ・シャッタースピードなど
-- ============================================
CREATE TABLE IF NOT EXISTS photo_exif (
  photo_id INT PRIMARY KEY,              -- photos.id と1対1のリレーション
  camera_make VARCHAR(100),              -- カメラメーカー（例：Canon）
  camera_model VARCHAR(100),             -- カメラ機種（例：EOS R5）
  lens_model VARCHAR(100),               -- 使用レンズ（例：24-70mm f/2.8）
  iso INT,                               -- ISO感度（例：100）
  f_number DECIMAL(4,2),                 -- 絞り値（例：2.8）
  exposure_time VARCHAR(20),             -- シャッタースピード（例："1/125"）
  focal_length VARCHAR(20),              -- 焦点距離（例："50mm"）
  white_balance VARCHAR(50),             -- ホワイトバランス（例："Auto"）
  orientation VARCHAR(20),               -- 画像の向き（例："1"）
  taken_at DATETIME,                     -- 撮影日時
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE
);

-- ============================================
-- GPS情報のみを保存するテーブル
-- 緯度・経度を数値で正確に保存
-- ============================================
CREATE TABLE IF NOT EXISTS photo_gps (
  photo_id INT PRIMARY KEY,                  -- photos.id と1対1のリレーション
  latitude DECIMAL(10, 8),                   -- 緯度（例：35.689487）
  longitude DECIMAL(11, 8),                  -- 経度（例：139.691706）
  is_visible BOOLEAN NOT NULL DEFAULT FALSE, -- 表示/非表示の制御フラグ
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE
);

-- ============================================
-- タグ情報を管理するテーブル
-- 例: '東京', '北区', '旅行'
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category_id INT,                   -- 外部キーで種類を参照
  sort_order INT NOT NULL DEFAULT 0, -- 並び順
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ============================================
-- タグ間の親子関係を管理する中間テーブル（多対多）
-- 例: 東京都 → 渋谷区
-- ============================================
CREATE TABLE IF NOT EXISTS tag_relations (
  parent_tag_id INT NOT NULL,
  child_tag_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (parent_tag_id, child_tag_id),
  FOREIGN KEY (parent_tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  FOREIGN KEY (child_tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- ============================================
-- 写真とタグの中間テーブル（多対多リレーション）
-- ============================================
CREATE TABLE IF NOT EXISTS photo_tags (
  photo_id INT NOT NULL,
  tag_id INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,  -- 並び順
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (photo_id, tag_id),
  FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- ============================================
-- プロフィール情報を管理するテーブル
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  user_id INT PRIMARY KEY,                      -- users テーブルとの1対1
  display_name VARCHAR(100) NOT NULL,           -- 表示名（作家名・公開名）
  avatar VARCHAR(255),                          -- プロフィール画像URL
  cover_image VARCHAR(255),                     -- カバー画像URL（OGP向け）
  bio TEXT,                                     -- 自己紹介
  job_title VARCHAR(100),                       -- 肩書き（例：風景写真家）
  website VARCHAR(255),                         -- ウェブサイトURL
  location VARCHAR(100),                        -- 居住地・活動拠点
  birth_place VARCHAR(100),                     -- 出身地
  sns_links JSON,                               -- SNSリンク（JSON形式）
  is_public BOOLEAN DEFAULT TRUE,               -- 公開/非公開フラグ
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 管理者ごとのメタデータ表示ポリシーを管理
-- ============================================
CREATE TABLE IF NOT EXISTS metadata_visibility_policy (
  user_id INT PRIMARY KEY,                   -- 管理者ID（users.id）と1対1
  show_camera_make BOOLEAN DEFAULT TRUE,     -- カメラメーカー（例：Canon）
  show_camera_model BOOLEAN DEFAULT TRUE,    -- カメラ機種（例：EOS R5）
  show_lens_model BOOLEAN DEFAULT TRUE,      -- 使用レンズ（例：24-70mm f/2.8）
  show_iso BOOLEAN DEFAULT TRUE,             -- ISO感度（例：100）
  show_f_number BOOLEAN DEFAULT TRUE,        -- 絞り値（例：2.8）
  show_exposure_time BOOLEAN DEFAULT TRUE,   -- シャッタースピード（例："1/125"）
  show_focal_length BOOLEAN DEFAULT FALSE,   -- 焦点距離（例："50mm"）
  show_white_balance BOOLEAN DEFAULT FALSE,  -- ホワイトバランス（例："Auto"）
  show_orientation BOOLEAN DEFAULT FALSE,    -- 画像の向き（例："1"）
  show_taken_at BOOLEAN DEFAULT FALSE,       -- 撮影日時
  show_gps BOOLEAN DEFAULT FALSE,            -- GPS
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);