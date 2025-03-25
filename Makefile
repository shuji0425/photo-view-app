include .env

# MySQL にスキーマを流す
db-migrate:
	docker-compose exec $(DB_CONTAINER) sh -c 'MYSQL_PWD=$(MYSQL_PASSWORD) mysql -u $(MYSQL_USER) $(MYSQL_DATABASE) < 01_create_tables.sql'

# シードデータの投入（オプション指定 or 手動入力）
db-seed:
	@if [ -z "$(FILE)" ]; then \
		echo "Available seed files:"; ls *.sql; \
		read -p "Enter seed file name: " FILE; \
	fi; \
	echo "Seeding database with $$FILE"; \
	docker-compose exec $(DB_CONTAINER) sh -c 'MYSQL_PWD=$(MYSQL_PASSWORD) mysql -u $(MYSQL_USER) $(MYSQL_DATABASE) < "$$FILE"'