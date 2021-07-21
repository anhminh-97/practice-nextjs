import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseJwt } from '.'
import { ROUTER } from '../constants/commonConstants'
import { useGlobalState } from '../state'

// dang nhap moi vao duoc
const useAuthen = () => {
  const router = useRouter()
  const [token] = useGlobalState('token')
  useEffect(() => {
    const userToken = parseJwt(token)
    if (!(userToken && userToken?.id && userToken?.email)) {
      router.push(ROUTER.Home)
    }
  }, [token])
}

// chua dang nhap moi vao duoc
const useNotAuthen = () => {
  const router = useRouter()
  const [token] = useGlobalState('token')
  useEffect(() => {
    const userToken = parseJwt(token)
    if (userToken && userToken?.id && userToken?.email) {
      router.push(ROUTER.Home)
    }
  }, [token])
}

export { useAuthen, useNotAuthen }
