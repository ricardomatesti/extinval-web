/** @type {import('next').NextConfig} */
const nextConfig = {
  // All env vars starting with NEXT_PUBLIC_ are exposed to the browser.
  // Keys without that prefix stay server-side only.
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
  async rewrites() {
    return [
      { source: '/about',                           destination: '/nosotros' },
      { source: '/contact',                         destination: '/contacto' },
      { source: '/authority',                       destination: '/autoridad' },
      { source: '/services/oil-gas',                destination: '/servicios/oil-gas' },
      { source: '/services/merchant-vessels',       destination: '/servicios/buques-mercantes' },
      { source: '/services/recreational-maritime',  destination: '/servicios/nautica-recreo' },
      { source: '/services/industrial-commercial',  destination: '/servicios/industrial-comercial' },
      { source: '/client-area',                     destination: '/area-clientes' },
    ]
  },
}

export default nextConfig
