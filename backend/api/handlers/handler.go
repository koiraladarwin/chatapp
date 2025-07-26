package handlers

import (
	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"net/http"
)

type customHttpHandler func(http.ResponseWriter, *http.Request) error

type ChatService interface {
	WebsocketAddClient(*websocket.Conn,string)
	AddChatRoom([]uuid.UUID) error
	GetChatRoomsByUser(uuid.UUID) ([]*models.ResponseChatRoom, error)
	CheckChatRoomExistsBtwnUsers(uuid.UUID, uuid.UUID) bool
	CheckChatRoomExists(uuid.UUID, int) bool
	GetUsersByName(string, string) ([]models.AccountModelDto, error)
	GetChatsByChatRoom(uuid.UUID,string) ([]models.MessageModel, error)
	GetLastMessageChatRoom(int) (*models.MessageModel, error)
}

type AuthService interface {
	AuthLogin(models.LoginState) (string, error)
	AuthSignUp(models.SignUpDto) error
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

