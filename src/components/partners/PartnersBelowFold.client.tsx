"use client";
import dynamic from "next/dynamic";
import type { SectionsProps } from "./PartnersBelowFoldImpl";

const Impl = dynamic(() => import("./PartnersBelowFoldImpl"), {
  ssr: false,
  loading: () => null,
});

export default function PartnersBelowFold(props: SectionsProps) {
  return <Impl {...props} />;
}
