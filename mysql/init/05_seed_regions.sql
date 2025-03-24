SET NAMES utf8mb4;

-- ============================================
-- 地方（region）タグを登録（tag_type = 'region'）
-- ============================================

INSERT INTO tags (name, tag_type_id)
SELECT '北海道地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '東北地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '関東地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '中部地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '近畿地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '中国地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '四国地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '九州地方', id FROM tag_types WHERE name = 'region' UNION ALL
SELECT '沖縄地方', id FROM tag_types WHERE name = 'region';
