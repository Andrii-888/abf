import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";

export default function HomePage() {
  return (
    <main
      className="
        relative
        min-h-[85vh]
        flex items-center
        bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(26,188,156,0.12)_45%,rgba(212,175,55,0.18)_100%),linear-gradient(#ffffff,#ffffff)]
        pt-14 md:pt-14 pb-16 md:pb-20
      "
    >
      {/* Контейнер */}
      <div
        className="
          mx-auto max-w-6xl px-4
          grid grid-cols-1 md:grid-cols-2
          items-center gap-10
        "
      >
        <HeroLeft />
        <HeroRight />
      </div>

      {/* Декоративная подложка (при желании можно убрать) */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_at_top_right,rgba(26,188,156,0.08),transparent_70%)]
        "
      />
    </main>
  );
}
