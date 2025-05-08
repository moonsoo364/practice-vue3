import { ref, type Ref, type UnwrapRef } from 'vue'
type FetchResponse<T> = {
  data: Ref<UnwrapRef<T> | null>
  error: Ref<UnwrapRef<Error | null>>
  loading: Ref<boolean>
}

export function useFetch<T>(url: string): FetchResponse<T> {
  const data = ref<UnwrapRef<T> | null>(null) as Ref<UnwrapRef<T> | null>
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  const fetchDate = async () => {
    try {
      loading.value = true
      const response = await fetch(url)
      console.log(response)

      if (!response.ok) {
        throw new Error(`Failed to fetch date from ${url}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }
  fetchDate()
  return {
    data,
    error,
    loading,
  }
}
