"use client";
import dynamic from "next/dynamic";

const IndustriesCarouselImpl = dynamic(() => import("./IndustriesCarouselImpl"), {
  ssr: false,
  loading: () => null,
});

export default IndustriesCarouselImpl;
