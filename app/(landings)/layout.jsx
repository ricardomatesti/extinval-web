import Script from 'next/script'
import './landing.css'

export default function LandingsLayout({ children }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
        strategy="beforeInteractive"
      />
      <style type="text/tailwindcss">{`
        @theme {
          --font-sans: "DM Sans", system-ui, sans-serif;
        }
      `}</style>
      {children}
    </>
  )
}
