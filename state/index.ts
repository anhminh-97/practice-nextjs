import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'

export type TypeUser = {
  USERID: string
  email: string
  password: string
  fullname: string
  gender: string
  description: string
  status: string
  profilepicture: string
  permission: string
  youviewed: string
  yourviewed: string
}

type TypeInitState = {
  currentUser: TypeUser | null
  token?: string
}

const initialState: TypeInitState = {
  currentUser: null,
  token: '',
}
const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }
