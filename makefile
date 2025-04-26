protofile:
	@cd proto && protoc --go_out=../backend --go-grpc_out=../backend --proto_path=./ chat.proto

build:
	@cd backend && go build -o ../bin/chatapp ./cmd 

run: build
	@./bin/chatapp

