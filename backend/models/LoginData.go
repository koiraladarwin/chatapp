package models

import (
	"github.com/google/uuid"
	"time"
)


type AccountModel struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Verified  bool      `json:"verified"`
	CreatedAt time.Time `json:"created_at"`
}


// model represents database
// data represents request and respose

type LoginState struct{
  Email string
  Password string
}

type SignUpDto struct {
	Name     string
	Age      int32
	Email    string
	Password string
}

type AccountModelDto struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Verified  bool      `json:"verified"`
	CreatedAt time.Time `json:"created_at"`
}


