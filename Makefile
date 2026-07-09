run-postgres:
	cd backend && docker-compose up
run-backend:
	cd backend && go run ./cmd/server
run-migration:
	cd backend && go run ./cmd/migration