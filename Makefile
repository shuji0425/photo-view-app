include .env

SEED_DIR=./mysql/init

# MySQL にスキーマを流す
db-migrate:
	docker-compose exec $(DB_CONTAINER) sh -c 'MYSQL_PWD=$(MYSQL_PASSWORD) mysql -u $(MYSQL_USER) $(MYSQL_DATABASE) < 01_create_tables.sql'

# シードデータの投入（オプション指定 or 手動入力）
db-seed:
	@if [ -z "$(FILE)" ]; then \
		echo "Available seed files:"; ls $(SEED_DIR)/*.sql; \
		read -p "Enter seed file name: " FILE; \
	fi; \
	if [ -f "$(SEED_DIR)/$$FILE" ]; then \
		FILE_PATH="$(SEED_DIR)/$$FILE"; \
	else \
		FILE_PATH="$$FILE"; \
	fi; \
	if [ ! -f "$$FILE_PATH" ]; then \
		echo "Error: File $$FILE_PATH does not exist!"; \
		exit 1; \
	fi; \
	echo "Seeding database with $$FILE_PATH"; \
	docker-compose exec -T $(DB_CONTAINER) sh -c 'MYSQL_PWD=$(MYSQL_PASSWORD) mysql -u $(MYSQL_USER) $(MYSQL_DATABASE)' < "$$FILE_PATH"