import { useEffect, useRef, useState } from "react"

export const useElementOnScreen = (element = null,) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callback = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback)
    const target = element ? element.current : containerRef.current

    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [containerRef, element])

  return [containerRef, isVisible]
}