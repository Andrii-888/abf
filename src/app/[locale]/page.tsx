import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";

export default function HomePage() {
  return (
    <section
      className="
        min-h-[80vh]
        bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(26,188,156,0.12)_45%,rgba(212,175,55,0.18)_100%),linear-gradient(#ffffff,#ffffff)]
        pt-6 md:pt-8
      "
    >
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
    </section>
  );
}
