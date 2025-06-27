import { supabaseBrowser } from '@/lib/supabase/browser'
import { useQuery } from '@tanstack/react-query'

const initUser = {
  created_at: '',
  display_name: '',
  email: '',
  id: '',
  image_url: '',
}

export default function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = supabaseBrowser()
      const { data } = await supabase.auth.getSession()
      console.log(data)

      if (data.session?.user) {
        // fetch user profile
        const { data: user } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()
        return user
      }

      return initUser
    },
  })
}
