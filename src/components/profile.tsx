'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import useUser from '@/app/hook/useUser'
import Image from 'next/image'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { isFetching, data } = useUser()
  const queryClient = useQueryClient()
  const router = useRouter()

  if (isFetching) return null

  const handleLogout = async () => {
    const supabase = supabaseBrowser()
    queryClient.clear()
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div>
      {data?.id ? (
        <Image
          src={data.avatar_url || '/default_profile.png'}
          alt={data.full_name || ''}
          width={50}
          height={50}
          className="rounded-full animate-fade ring-2 cursor-pointer"
          onClick={() => handleLogout()}
        />
      ) : (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">SignIn</Button>
        </Link>
      )}
    </div>
  )
}
