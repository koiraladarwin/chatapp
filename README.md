# ChatApp

## 🚀 How to Build and Run

### Prerequisites

- **Go** (>= 1.23.7)
- **Node.js** (>= 18.x recommended)
- **npm** (>= 9.x recommended)
- **protoc** (Protocol Buffers compiler)
- **protoc-gen-ts** (for TypeScript gRPC stubs)
- **Make** (for running makefile targets)

### 🚀 Build & Run Guide

Follow these steps to set up and run the full stack application:

---

### 1. **Clone the repository**
```
git clone https://github.com/koiraladarwin/chatapp
cd chatapp
```
---

### 2. **(Optional) Generate gRPC/Protobuf code**
```
make compileproto
```
This regenerates Go and TypeScript code from `proto/chat.proto` for backend and frontend communication.

> ✅ You can skip this step if the generated files are already up to date.

---

### 3. **Build the backend**
```
make build-backend
```
Compiles the Go backend and places the output binary at `bin/chatapp`.

---

### 4. **Install frontend dependencies**
```
make build-frontend
```
Installs all required npm packages in the frontend directory.

---

### 5. **Run both backend and frontend concurrently**
```
make run
```
Runs both the Go backend and React frontend in parallel (for development use).

---

## 🛠️ Technical Overview

### Backend

- **Language:** Go (Go modules, see `backend/go.mod`)
- **Frameworks/Libraries:** 
  - `gorilla/mux` (HTTP routing)
  - `gorilla/websocket` (WebSocket support)
  - `lib/pq` (PostgreSQL driver)
  - `golang-jwt/jwt` (JWT authentication)
  - gRPC and Protocol Buffers for API contracts
- **Structure:** 
  - `cmd/` - Main application entrypoint
  - `api/`, `models/`, `internal/`, `common/` - Modular Go code
  - `protomodels/` - Generated protobuf Go code

### Frontend

- **Language:** TypeScript
- **Framework:** React (see `frontend/package.json`)
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **State/Data:** React Query, React Hook Form
- **gRPC/Protobuf:** Uses generated TypeScript stubs for API communication

### Protocol

- **Protobuf/gRPC:** Defined in `proto/chat.proto`
  - Supports message types (text, photo)
  - Used for both backend (Go) and frontend (TypeScript) code generation

### Build System

- **Makefile:** Centralizes build, codegen, and run commands for both frontend and backend.
- **Code Generation:** Uses `protoc` and `protoc-gen-ts` for cross-language API contracts.

---

## ❌ Pull Requests

**This repository does _not_ accept pull requests.**  
If you have suggestions, please open an issue instead.

---

## 📁 Directory Structure

- `backend/` — Go backend source code
- `frontend/` — React frontend source code
- `proto/` — Protobuf definitions
- `makefile` — Build and run automation



