"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card.jsx";

export function GoldCard({...props}) {
  const { title, description } = props;
  return (
      (
          <CardContainer className="inter-var">
      <CardBody
        className="bg-stone-900 relative group/card  hover:shadow-2xl hover:shadow-stone-500/[0.1] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-[#C0A080]/40 ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-[#C0A080]">
          {title || "3D Card"}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {/* <img
            src="https://media.istockphoto.com/id/497802746/photo/gold-paper-texture-background.jpg?s=612x612&w=0&k=20&c=EyqTaphwKUT-NnZP53pHqsrh_MZKi2-fVQy1p5M2Dqo="
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" /> */}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-[#C0A080] text-sm max-w-sm mt-2">
            {description || 'Hover over this card to unleash the power of CSS perspective'}
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="text-[#C0A080] px-4 py-2 rounded-xl text-xs font-normal">
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    )
  );
}
