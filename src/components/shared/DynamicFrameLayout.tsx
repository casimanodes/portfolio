"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface ThemenbereichItem {
  id: number;
  titel: string;
  beschreibung: string;
  bild: string;
  slug: string;
  reihenfolge: number;
}

interface DynamicFrameLayoutProps {
  items: ThemenbereichItem[];
}

const HOVER_SIZE = 7.5;
const GAP = 4;

// Fallback-Bild wenn Strapi/Daten keine bild liefern oder die URL ungültig ist.
const FALLBACK_IMAGE = "/images/denksport.svg";

// Slug → bekanntes lokales Asset (falls Strapi bild leer ist und der Slug zu
// einem unserer SVGs in /public/images/ passt).
const SLUG_TO_LOCAL_IMAGE: Record<string, string> = {
  zauberwuerfel: "/images/zauberwuerfel.svg",
  schach: "/images/schach.svg",
  schlagball: "/images/schlagball.svg",
  badminton: "/images/badminton.svg",
  // Legacy slugs für alte Strapi-Daten:
  denksport: "/images/denksport.svg",
  schwimmen: "/images/schwimmen.svg",
};

function resolveBild(item: ThemenbereichItem): string {
  if (item.bild && item.bild.trim().length > 0) return item.bild;
  if (item.slug && SLUG_TO_LOCAL_IMAGE[item.slug]) {
    return SLUG_TO_LOCAL_IMAGE[item.slug];
  }
  return FALLBACK_IMAGE;
}

function isSvgSource(src: string): boolean {
  // Sowohl direkter Pfad als auch URL mit Query (z. B. Strapi /uploads/foo.svg?...).
  return /\.svg(\?.*)?$/i.test(src);
}

export default function DynamicFrameLayout({ items }: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null
  );

  const getSizes = (axis: "row" | "col") => {
    if (!hovered) return "1fr 1fr";
    const idx = axis === "row" ? hovered.row : hovered.col;
    const nonHovered = 12 - HOVER_SIZE;
    return [0, 1]
      .map((i) => (i === idx ? `${HOVER_SIZE}fr` : `${nonHovered}fr`))
      .join(" ");
  };

  const grid = items.slice(0, 4);

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{
        display: "grid",
        gridTemplateRows: getSizes("row"),
        gridTemplateColumns: getSizes("col"),
        gap: `${GAP}px`,
        transition:
          "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1), grid-template-columns 0.4s cubic-bezier(0.4,0,0.2,1)",
        minHeight: "420px",
      }}
    >
      {grid.map((item, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const isHovered =
          hovered !== null && hovered.row === row && hovered.col === col;

        const src = resolveBild(item);
        const isSvg = isSvgSource(src);

        return (
          <Link
            key={item.id}
            href={`/angebote/${item.slug}`}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <Image
              src={src}
              alt={item.titel}
              fill
              // SVGs werden vom Image-Optimizer aktiv abgelehnt (Vercel:
              // INVALID_IMAGE_OPTIMIZE_REQUEST). SVGs sind Vektorgrafiken und
              // brauchen keine Optimierung — direkt ausliefern.
              unoptimized={isSvg}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="font-display font-bold text-white text-lg leading-tight drop-shadow-lg">
                {item.titel}
              </h3>
            </div>

            <div
              className={`absolute inset-0 z-30 flex flex-col justify-end p-5 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{ background: "rgba(10, 10, 18, 0.75)" }}
            >
              <h3 className="font-display font-bold text-white text-xl mb-2">
                {item.titel}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                {item.beschreibung}
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-3">
                Mehr erfahren →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
