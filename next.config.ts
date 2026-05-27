import type { NextConfig } from "next";

// Wo Strapi seine Uploads (JPG/PNG/WEBP) hostet:
// - Lokal: http://localhost:1337/uploads/*
// - Strapi Cloud: https://<slug>.strapiapp.com/uploads/* (alte Variante)
//                 oder https://<slug>.media.strapiapp.com/* (neue v5 CDN)
// - Strapi Cloud Direct CDN: https://*.strapi.io/* (fallback)
// - Optional Cloudinary (wenn CLOUDINARY_NAME im CMS gesetzt ist):
//                 https://res.cloudinary.com/<cloud>/image/upload/*
const nextConfig: NextConfig = {
  images: {
    // SVG: weiterhin erlauben (mit harter CSP), wird aber clientseitig
    // via `unoptimized` an /_next/image vorbei direkt geladen.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Lokales Strapi (Entwicklung)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Strapi Cloud — alle Subdomains, beide Pfad-Konventionen.
      // `**.strapiapp.com` deckt z. B. wonderful-art-xxx.strapiapp.com
      // und my-project.media.strapiapp.com gleichermaßen ab.
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
      },
      // Strapi Cloud Storage (separate Media-Domain, falls genutzt)
      {
        protocol: "https",
        hostname: "**.media.strapicloud.com",
      },
      {
        protocol: "https",
        hostname: "**.strapi.io",
      },
      // Cloudinary (falls als Upload-Provider konfiguriert)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
