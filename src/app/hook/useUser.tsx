import { supabaseBrowser } from '@/lib/supabase/browser'
import { useQuery } from '@tanstack/react-query'

const emptyUser = {
  created_at: '',
  full_name: '',
  email: '',
  id: '',
  avatar_url: '',
}

export default function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = supabaseBrowser()
      const { data } = await supabase.auth.getSession()

      if (data.session?.user) {
        return {
          created_at: data.session.user.created_at,
          full_name: data.session.user.user_metadata.full_name,
          email: data.session.user.email,
          id: data.session.user.id,
          avatar_url: data.session.user.user_metadata.avatar_url,
        }
      }

      return emptyUser
    },
  })
}
