import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShortUrl } from '../api/shortUrl.api'
import { queryKeys } from '../api/queryKeys'

export const useCreateShortUrl = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShortUrl,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.histories() })
    },
  })
}
