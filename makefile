compileproto:
	@echo "Generating Go protobuf files..." && \
	cd proto && \
	protoc --go_out=../backend \
	       --go-grpc_out=../backend \
	       --proto_path=./ chat.proto auth.proto &
	wait
	@echo "Generating TypeScript protobuf files..." && \
	protoc \
		--plugin=protoc-gen-ts=/usr/local/bin/protoc-gen-ts \
		--ts_out=./frontend/src/proto \
		--proto_path=./proto \
		./proto/chat.proto ./proto/auth.proto

build-backend:
	echo "Building backend..."
	@cd backend && go build -o ../bin/chatapp ./cmd
# Start backend 
start-backend: build-backend
	echo "Starting backend..."
	@./bin/chatapp
# Start frontend development server
build-frontend:
	echo "Install npm packages"
	@cd frontend && npm install
dev-frontend:
	echo "Starting frontend dev server..."
	@cd frontend && npm run dev
# Run both frontend and backend (no building)
run: 
	echo "Running frontend and backend..."
	@make dev-frontend & \
	make start-backend
