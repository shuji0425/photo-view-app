SET NAMES utf8mb4;

-- ============================================
-- 47都道府県のタグを登録（category_id = '都道府県'）
-- ============================================

INSERT INTO tags (name, category_id)
SELECT 'おすすめ', id FROM categories WHERE name = 'その他' UNION ALL
SELECT '北海道', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '青森県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '岩手県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '宮城県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '秋田県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '山形県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '福島県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '茨城県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '栃木県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '群馬県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '埼玉県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '千葉県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '東京都', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '神奈川県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '新潟県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '富山県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '石川県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '福井県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '山梨県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '長野県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '岐阜県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '静岡県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '愛知県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '三重県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '滋賀県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '京都府', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '大阪府', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '兵庫県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '奈良県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '和歌山県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '鳥取県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '島根県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '岡山県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '広島県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '山口県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '徳島県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '香川県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '愛媛県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '高知県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '福岡県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '佐賀県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '長崎県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '熊本県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '大分県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '宮崎県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '鹿児島県', id FROM categories WHERE name = '都道府県' UNION ALL
SELECT '沖縄県', id FROM categories WHERE name = '都道府県';
