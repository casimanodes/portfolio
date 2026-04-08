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

  // Ensure exactly 4 items in a 2x2 grid
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

        return (
          <Link
            key={item.id}
            href={`/angebote/${item.slug}`}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Background image */}
            <Image
              src={item.bild}
              alt={item.titel}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />

            {/* Permanent gradient overlay for title readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

            {/* Title — always visible at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="font-display font-bold text-white text-lg leading-tight drop-shadow-lg">
                {item.titel}
              </h3>
            </div>

            {/* Hover overlay with description */}
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
