import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // 스크롤 진행도 계산 (0 ~ 1)
      const totalScrollableHeight = documentHeight - windowHeight
      const progress = scrollTop / totalScrollableHeight

      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기값 설정

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}
