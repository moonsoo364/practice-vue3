import { useFetch } from '@/composables/ch05/useFetch'

type Repo = {}
export const useGitHubRepos = (username: string) => {
  return useFetch<Repo[]>(`https://api.github.com/users/${username}/repos`)
}
