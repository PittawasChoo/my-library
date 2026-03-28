import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'

export function useFuzzySearch(data, options) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => {
    return new Fuse(data, {
      threshold: 0.3, // 🔥 lower = stricter (0.3 ~ 70-80% match)
      ignoreLocation: true,
      keys: ['name', 'publisher', 'volume'],
      ...options,
    })
  }, [data])

  const results = useMemo(() => {
    if (!query) return data
    return fuse.search(query).map((r) => r.item)
  }, [query, fuse, data])

  return { query, setQuery, results }
}
