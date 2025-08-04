"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;
      const introTl = gsap.timeline();
      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.inOut",
          delay: 0.3,
          stagger: 0.5,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=0.2",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.8,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .to(".hero-header-word", {
          scale: 3,
          ease: "power4.inOut",
          stagger: 0.5,
          opacity: 0,
        })
        .to(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=0.2",
        )
        .to(".hero-body", {
          opacity: 0,
          y: 30,
        })
        .to(".hero-button", {
          opacity: 0,
          y: 30,
          duration: 0.8,
        })
        .to(".hero-header-word", {
          scale: 1,
          ease: "power4.inOut",
          stagger: 0.5,
          opacity: 1,
        });

      scrollTl
        .fromTo(
          "body",
          { backgroundColor: "#FDE047" },
          { backgroundColor: "#D9F99D", overwrite: "auto" },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -15,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from("text-side-body", {
          y: 30,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={500} speed={5} repeat={true} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header mt-4 text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[10rem]">
              <TextSplitter
                text={"DARE TO FIZZ"}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-6 text-5xl font-semibold text-sky-950 lg:text-6xl">
              Explore Our World of Bold Flavors!
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              Less Sugar. More Guts. All Flavor.
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text={"Your Taste Buds Deserve a Party!"} />
            </h2>
            <div className="text-side-body mt-6 max-w-xl text-balance text-xl font-normal text-sky-950">
              Gutsy Soda rewrites the rules with real fruit juice, a touch of
              cane sugar, and absolutely no compromises. We skip the artificial
              sweeteners and high-fructose corn syrup - because real flavor
              deserves real ingredients. Each of our five bold flavors delivers
              just 3-5g of sugar while packing a whopping 9g of gut-friendly
              prebiotic fiber. This isnt just better-for-you soda - its a
              full-flavored rebellion in every sip. Try all five flavors and
              join the movement where taste meets guts.
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
