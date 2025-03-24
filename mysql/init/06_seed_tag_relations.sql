SET NAMES utf8mb4;

-- ============================================
-- 地方 → 都道府県の親子関係を登録
-- parent: 地方, child: 都道府県
-- ============================================

-- 北海道地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '北海道地方' AND c.name = '北海道';

-- 東北地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '東北地方' AND c.name IN (
  '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'
);

-- 関東地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '関東地方' AND c.name IN (
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'
);

-- 中部地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '中部地方' AND c.name IN (
  '新潟県', '富山県', '石川県', '福井県',
  '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'
);

-- 近畿地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '近畿地方' AND c.name IN (
  '三重県', '滋賀県', '京都府', '大阪府',
  '兵庫県', '奈良県', '和歌山県'
);

-- 中国地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '中国地方' AND c.name IN (
  '鳥取県', '島根県', '岡山県', '広島県', '山口県'
);

-- 四国地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '四国地方' AND c.name IN (
  '徳島県', '香川県', '愛媛県', '高知県'
);

-- 九州地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '九州地方' AND c.name IN (
  '福岡県', '佐賀県', '長崎県', '熊本県',
  '大分県', '宮崎県', '鹿児島県'
);

-- 沖縄地方
INSERT INTO tag_relations (parent_tag_id, child_tag_id)
SELECT p.id, c.id FROM tags p, tags c
WHERE p.name = '沖縄地方' AND c.name = '沖縄県';
