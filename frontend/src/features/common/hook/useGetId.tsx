import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function useJwt(): string {
  const id = useContext(AuthContext)

  if (id == undefined) {
    throw null
  }

  return id
}

