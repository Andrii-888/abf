import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LanguagePage({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations("header.lang");

  const languages = [
    { code: "en", label: "English" },
    { code: "it", label: "Italiano" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "ru", label: "Русский" },
    { code: "zh", label: "中文" },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <ul className="space-y-2">
        {languages.map((lang) => (
          <li key={lang.code}>
            {params.locale === lang.code ? (
              <span className="font-bold text-gray-800">{lang.label} — ✓</span>
            ) : (
              <Link
                href={`/${lang.code}`}
                className="text-blue-600 hover:underline"
              >
                {lang.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
