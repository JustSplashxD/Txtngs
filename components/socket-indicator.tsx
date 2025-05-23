'use client'

import { useSocket } from './providers/socket-provider'
import { Badge } from './ui/badge'

export const SocketIndicator = () => {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <Badge variant='outline' className='bg-yellow-600 text-white border-none hidden'>
        Fallback: Polling Every 1s
      </Badge>
    )
  }

  return (
    <Badge variant='outline' className='bg-emerald-500 text-white border-none hidden'>
      Live: Real-Time Updates
    </Badge>
  )
}
