import type { Metadata } from "next";
import { normalizeLocale, languagesAlternates, ogLocale } from "./helpers";

type GetMeta = (locale?: string) => { title: string; description: string };

export function makePageMetadata(pathSuffix: string, getMeta: GetMeta) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const loc = normalizeLocale(locale);
    const meta = getMeta(loc);

    return {
      title: meta.title,
      description: meta.description,
      alternates: { languages: languagesAlternates(pathSuffix) },
      openGraph: {
        title: meta.title,
        description: meta.description,
        locale: ogLocale(loc),
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
      },
    };
  };
}
