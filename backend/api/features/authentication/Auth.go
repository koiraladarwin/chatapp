package auth

import (
	"github.com/batmanboxer/chatapp/models"
)

type AuthStorage interface {
	AddAccount(models.SignUpDto) error
	GetUserByEmail(string) (models.AccountModel, error)
	GetUserById(string) (models.AccountModel, error)
}

type AuthManager struct {
	AuthDb AuthStorage
}
