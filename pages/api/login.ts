// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import api from './../../services/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  if (method !== 'POST') {
    res.status(200).json({
      status: 500,
      message: 'Method not allowed',
    })
  }

  const data = req.body

  try {
    const response = await api.callJson('/member/login.php', { data, method })
    const currentTime = new Date()
    const nextYear = new Date(
      currentTime.getFullYear() + 1,
      currentTime.getMonth(),
      currentTime.getDate()
    )
    if (response.status === 200) {
      res.status(302)
      res.setHeader('Location', '/')
      res.setHeader('Content-Type', 'application/json')
      res.setHeader(
        'Set-Cookie',
        `token=${response.token}; expires=${nextYear.toUTCString()}; path=/`
      )
      res.json(response)
    } else {
      res.status(302)
      res.setHeader('Location', '/login?error=Fail')
      res.json(response)
    }
  } catch (error) {
    res.status(200).json({ status: 500, message: 'Internal Server Error' })
  }
}
