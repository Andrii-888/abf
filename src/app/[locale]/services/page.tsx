import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Handshake,
  FileCheck2,
  Lock,
  Clock,
  Users,
  Building2,
  MapPin,
  ChevronRight,
  Phone,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

// ---- типы ключей для i18n
type BadgeId = "b1" | "b2" | "b3" | "b4";
type ValueCardKey = "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
type StepKey = "s1" | "s2" | "s3" | "s4" | "s5";
type OfficeKey = "o1" | "o2" | "o3";

// ---- данные (без any)
const badges: BadgeId[] = ["b1", "b2", "b3", "b4"];

const valueCards: { Icon: LucideIcon; key: ValueCardKey }[] = [
  { Icon: Users, key: "c1" },
  { Icon: FileCheck2, key: "c2" },
  { Icon: Building2, key: "c3" },
  { Icon: Handshake, key: "c4" },
  { Icon: ShieldCheck, key: "c5" },
  { Icon: Clock, key: "c6" },
];

const steps: StepKey[] = ["s1", "s2", "s3", "s4", "s5"];

const offices: { key: OfficeKey; map: string }[] = [
  { key: "o1", map: "#" },
  { key: "o2", map: "#" },
  { key: "o3", map: "#" },
];

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="rounded-2xl bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] p-[1px] shadow-lg">
        <div className="rounded-2xl bg-white/85 p-6 md:p-10 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] bg-clip-text text-transparent">
                {t("hero.title")}
              </h1>
              <p className="mt-4 text-slate-700">
                {t("hero.desc1")} <br />
                <span className="font-medium">Fiat ↔ Crypto ↔ Gold</span> <br />
                {t("hero.desc2")}
                <br />
                {t("hero.desc3")}
                <br />
                {t("hero.desc4")}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-black text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {t("hero.ctaPrimary")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <Link
                  href="/process"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-slate-100 text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>

            {/* Trust mini-badges */}
            <ul className="grid grid-cols-2 gap-3 w-full lg:w-80">
              {badges.map((id: BadgeId) => {
                const label = t(`hero.badges.${id}`);
                const Icon =
                  id === "b1"
                    ? ShieldCheck
                    : id === "b2"
                    ? Lock
                    : id === "b3"
                    ? Handshake
                    : Clock;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 hover:shadow-sm transition-shadow min-w-0"
                  >
                    <Icon className="h-5 w-5 text-[var(--color-crypto)] shrink-0" />
                    <span className="text-sm font-medium leading-tight break-words whitespace-normal">
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold">
          {t("value.title")}
        </h2>
        <p className="mt-2 text-slate-700">{t("value.subtitle")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueCards.map(({ Icon, key }) => (
            <div
              key={key}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-[var(--color-fiat)]/20 hover:via-[var(--color-crypto)]/20 hover:to-[var(--color-gold)]/20 transition-colors"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="h-6 w-6 text-[var(--color-gold)] shrink-0" />
                  <h3 className="text-base font-semibold leading-tight break-words whitespace-normal">
                    {t(`value.cards.${key}.title`)}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-slate-700">
                  {t(`value.cards.${key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section className="mt-12">
        <ol className="mt-4 grid gap-3 md:grid-cols-5">
          {steps.map((s: StepKey, idx) => (
            <li
              key={s}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] text-white text-xs font-semibold">
                  {idx + 1}
                </span>
              </div>
              <p className="mt-3 font-medium">{t(`process.steps.${s}`)}</p>

              {s === "s2" && (
                <p className="mt-1 text-slate-700">{t("process.notes.n2")}</p>
              )}
              {s === "s4" && (
                <p className="mt-1 text-slate-700">{t("process.notes.n4")}</p>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-4">
          <Link
            href="/process"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:opacity-80"
          >
            {t("process.seeFull")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* OFFICES */}
      <section className="mt-12">
        <h2 className="text-xl sm:text-2xl font-semibold">
          {t("offices.title")}
        </h2>
        <p className="mt-2 text-slate-700">{t("offices.subtitle")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map(({ key, map }) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex items-center gap-3 min-w-0">
                <MapPin className="h-5 w-5 text-[var(--color-crypto)] shrink-0" />
                <h3 className="text-base font-semibold leading-tight break-words whitespace-normal">
                  {t(`offices.cards.${key}.city`)}
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {t(`offices.cards.${key}.note`)}
              </p>
              <div className="mt-3">
                <a
                  href={map}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:opacity-80"
                >
                  {t(`offices.cards.${key}.mapLabel`)}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-6 md:p-8 shadow-inner">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">
              {t("cta.title")}
            </h3>
            <p className="mt-2 text-slate-700">{t("cta.text")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-black text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black"
            >
              {t("cta.buttons.contact")}
              <Phone className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/XXXXXXXXXXX"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-crypto)]"
            >
              {t("cta.buttons.whatsapp")}
              <MessageSquare className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
