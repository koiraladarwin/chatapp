package handlers

import (
	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"net/http"
)

type ChatService interface {
	WebsocketAddClient(conn *websocket.Conn, chatRoomId string, userId string)
	AddChatRoom(users []uuid.UUID) error
	GetChatRoomsByUser(uuid.UUID) ([]*models.ResponseChatRoom, error)
	CheckChatRoomExistsBtwnUsers(uuid.UUID, uuid.UUID) bool
	CheckChatRoomExists(uuid.UUID, int) bool
	GetUsersByName(string) ([]models.ResponseAccountModel, error)
}

type AuthService interface {
	AuthLogin(models.LoginData) (string, error)
	AuthSignUp(models.SignUpData) error
	AuthGetUserById(string) (models.AccountModel, error)
}

type Handlers struct {
	AuthManager AuthService
	ChatManager ChatService
}

func NewHandlers(
	authService AuthService,
	ChatService ChatService,
) *Handlers {
	return &Handlers{
		AuthManager: authService,
		ChatManager: ChatService,
	}
}

type customHttpHandler func(http.ResponseWriter, *http.Request) error
