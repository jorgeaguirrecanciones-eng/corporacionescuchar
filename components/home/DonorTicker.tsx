"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const feed = [
  { name: "Camila", seats: 3 },
  { name: "Felipe", seats: 1 },
  { name: "Valentina", seats: 5 },
  { name: "Diego", seats: 2 },
  { name: "Sofía", seats: 10 },
  { name: "Andrés", seats: 1 },
  { name: "Javiera", seats: 3 },
  { name: "Matías", seats: 2 },
  { name: "Isidora", seats: 4 },
  { name: "Sebastián", seats: 1 },
  { name: "Paula", seats: 5 },
  { name: "Tomás", seats: 2 },
];

export default function DonorTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setVisible(false);
      // swap name + fade in
      setTimeout(() => {
        setIndex((i) => (i + 1) % feed.length);
        setVisible(true);
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const { name, seats } = feed[index];

  return (
    <div
      style={{ transition: "opacity 350ms ease" }}
      className={`inline-flex items-center gap-2.5 bg-beige px-4 py-2 rounded-full ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Heart size={13} className="text-terracota shrink-0" fill="currentColor" />
      <span className="text-sm font-sans text-verde/70 whitespace-nowrap">
        <span className="font-semibold text-verde">{name}</span>
        {" acaba de regalar "}
        <span className="font-semibold text-terracota">
          {seats} {seats === 1 ? "asiento" : "asientos"}
        </span>
      </span>
    </div>
  );
}
