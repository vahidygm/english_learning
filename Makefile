run-postgres:
	cd backend && docker-compose up
run-backend:
	cd backend && go run ./cmd/server
run-migration:
	cd backend && go run ./cmd/migrate

run-importer:
	cd backend && go run ./cmd/importer
run-importer-specific-file:
	cd backend && go run ./cmd/importer --file ./books/speakout/lesson1.json