package auth

import (
	"github.com/batmanboxer/chatapp/models"
	"golang.org/x/crypto/bcrypt"
)

func (auth *AuthManager) AuthSignUp(signUpData models.SignUpData) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(signUpData.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	signUpData.Password = string(hashedPassword)
	err = auth.AuthDb.AddAccount(signUpData)
	if err != nil {
		return err
	}

	return nil
}
