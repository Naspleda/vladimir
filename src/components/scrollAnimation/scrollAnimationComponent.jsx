"use client";
import React from "react";
import { ContainerScroll } from "./scrollAnimation";
// import Image from "next/image";

export function HeroScrollDemo() {
  return (
    (<div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }>
        <img
          src={`https://static.vecteezy.com/system/resources/thumbnails/021/782/435/small_2x/generative-ai-stock-market-chart-lines-financial-graph-on-technology-abstract-background-represent-financial-crisis-financial-meltdown-technology-concept-trading-market-concept-photo.jpeg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>)
  );
}
