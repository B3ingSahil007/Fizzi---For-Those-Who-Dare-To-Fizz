"use client";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";

const headings = [
  "Spark Joy with Every Sip 🌱💦",
  "Pure Enjoyment, Zero Compromise 🎉🔥",
  "Refreshment, Redefined 🌿✨",
];

const bodies = [
  "Discover a soda that works as hard for your body as it does for your taste buds. Infused with powerful prebiotics and billions of live probiotics, each can nourishes your gut and supports natural balance—so you feel good from the inside out.",
  "Feel the freedom to indulge! Our soda delivers vibrant, mouthwatering flavor with only 20 calories per can. No need to trade taste for wellness—savor the deliciousness, guilt-free.",
  "Sip confidently knowing every ingredient is naturally sourced. No weird chemicals, no artificial aftertaste—just crisp, clean refreshment bursting with the real flavors of nature that uplift and energize.",
];

const AlternatingText = (): JSX.Element => {
  return (
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950">
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {headings.map((heading, index) => (
            <div
              key={heading}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30",
                )}
              >
                <h2 className="text-balance text-6xl font-bold">{heading}</h2>
                <div className="mt-4 text-xl">{bodies[index]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
