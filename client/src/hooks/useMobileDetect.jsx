import { useState, useEffect } from 'react'

export const useMobileDetect = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')

        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
        }

        mediaQuery.addEventListener('change', handleMediaQueryChange)
        handleMediaQueryChange(mediaQuery)


        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])
    return isMobile
}
