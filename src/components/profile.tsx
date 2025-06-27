'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import useUser from '@/app/hook/useUser'
import Image from 'next/image'

export default function Profile() {
  const { isFetching, data } = useUser()

  if (isFetching) return null

  return (
    <div>
      {data?.id ? (
        <Image
          src={data.image_url || ''}
          alt={data.display_name || ''}
          width={50}
          height={50}
          className="rounded-full animate-fade"
        />
      ) : (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">SignIn</Button>
        </Link>
      )}
    </div>
  )
}
