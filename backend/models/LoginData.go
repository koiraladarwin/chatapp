package models

import (
	"github.com/google/uuid"
	"time"
)

type LoginSucess struct {
	Jwt string `json:"jwt"`
}

type SignUpSuccess struct {
	Status string `json:"status"`
}

// model represents database
// data represents request and respose
type LoginDto struct{
  Email string
  Password string
}

type SignUpDto struct {
	Name     string
	Age      int32
	Email    string
	Password string
}

type AccountModel struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Verified  bool      `json:"verified"`
	CreatedAt time.Time `json:"created_at"`
}

type ResponseAccountModel struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Verified  bool      `json:"verified"`
	CreatedAt time.Time `json:"created_at"`
}


