'use client'
import { useEffect } from 'react'

export default function ErrorLogger() {
  useEffect(() => {
    function onError(e: ErrorEvent) {
      try {
        // Log structured info to console to help debugging
        // eslint-disable-next-line no-console
        console.error('Captured window error:', {
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          stack: (e.error && e.error.stack) || null,
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error while logging error event', err)
      }
    }

    function onRejection(e: PromiseRejectionEvent) {
      try {
        // eslint-disable-next-line no-console
        console.error('Captured unhandledrejection:', {
          reason: e.reason,
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error while logging rejection', err)
      }
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  return null
}
