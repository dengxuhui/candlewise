/**
 * useCases.js — K线案例数据加载与筛选 Hook
 * 策略：一次性 fetch，模块级变量缓存，避免重复网络请求
 */

import { useState, useEffect, useCallback } from 'react'

/** 模块级缓存：首次加载后存储所有案例 */
let casesCache = null
/** 记录是否正在加载（避免并发请求） */
let loadingPromise = null

/**
 * Fisher-Yates 原地随机打乱数组（返回新数组）
 */
function shuffleArray(arr) {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function useCases() {
  const [cases, setCases] = useState(casesCache)
  const [loading, setLoading] = useState(casesCache === null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 已有缓存，无需重新加载
    if (casesCache !== null) {
      setCases(casesCache)
      setLoading(false)
      return
    }

    // 复用已在进行的请求
    if (!loadingPromise) {
      loadingPromise = fetch(`${import.meta.env.BASE_URL}data/candlewise_cases.json`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then((data) => {
          casesCache = data.cases
          return casesCache
        })
        .finally(() => {
          loadingPromise = null
        })
    }

    loadingPromise
      .then((allCases) => {
        setCases(allCases)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  function getCasesByModule(module) {
    if (!cases) return []
    return cases.filter((c) => c.module === module)
  }

  function getCasesByDifficulty(difficulty) {
    if (!cases) return []
    return cases.filter((c) => c.difficulty === difficulty)
  }

  const getRandomCases = useCallback((module, count = 5) => {
    if (!cases) return []
    const pool = module ? cases.filter((c) => c.module === module) : cases
    const shuffled = shuffleArray(pool)
    return shuffled.slice(0, count)
  }, [cases])

  const getCaseById = useCallback((id) => {
    if (!cases) return null
    return cases.find((c) => c.id === id) ?? null
  }, [cases])

  return {
    cases,
    loading,
    error,
    getCasesByModule,
    getCasesByDifficulty,
    getRandomCases,
    getCaseById,
  }
}
