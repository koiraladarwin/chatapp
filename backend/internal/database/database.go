package database

import (
	"github.com/batmanboxer/chatapp/models"
	"github.com/google/uuid"
)

type Storage interface {
	GetUsersByChatRoomID(string) ([]models.AccountModel, error)
	AddAccount(models.SignUpDto) error
	GetUserByEmail(string) (models.AccountModel, error)
	GetMessages(string, int, int) ([]models.MessageModel, error)
	AddMessage(models.MessageModel) error
	CreateChatRoom([]uuid.UUID) error
	GetChatRoomsByUser(uuid.UUID) ([]*models.ChatRoom, error)
	RemoveUserFromRoom(int, int) error
	GetUserById(string) (models.AccountModel, error)
	GetUsersByName(string) ([]models.AccountModel, error)
}
