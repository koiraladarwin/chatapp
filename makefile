protofile:
	@cd proto && protoc --go_out=../backend --go-grpc_out=../backend --proto_path=./ chat.proto

buildbackend:
	@cd backend && go build -o ../bin/chatapp ./cmd 

devfrontend:
	@cd frontend && npm install && npm run dev

run: buildbackend
	@make devfrontend & \
	./bin/chatapp

