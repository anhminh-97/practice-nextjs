import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'

type TypeCurrentState = {
  USERID: string
  email: string
  password: string
  fullname: string
  gender: string
  description: string
  status: string
  profilepicture: string
  permission: string
}

type TypeInitState = {
  currentUser: TypeCurrentState | null
  token?: string
}

const initialState: TypeInitState = {
  currentUser: null,
  token: '',
}
const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }
