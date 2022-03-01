import { createGlobalState } from 'react-hooks-global-state'
import { TypeUser } from '../types/user'

type TypeCategory = {
  id: number
  text: string
}

type TypeInitState = {
  currentUser: TypeUser | null
  token?: string
  categories: TypeCategory[]
}

const initialState: TypeInitState = {
  currentUser: null,
  token: '',
  categories: [],
}
const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }
