import Script from 'next/script'

export default function LandingLayout({ children }) {
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
