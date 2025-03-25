SET NAMES utf8mb4;

-- ============================================
-- 地方（地方）タグを登録（category = '地方'）
-- ============================================

INSERT INTO tags (name, category_id)
SELECT '北海道地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '東北地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '関東地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '中部地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '近畿地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '中国地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '四国地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '九州地方', id FROM categories WHERE name = '地方' UNION ALL
SELECT '沖縄地方', id FROM categories WHERE name = '地方';
