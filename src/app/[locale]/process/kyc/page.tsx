// src/app/[locale]/process/kyc/page.tsx
import "server-only";
export const runtime = "nodejs";

import Link from "next/link";
import { Mail } from "lucide-react";

export default async function KycPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="w-full bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Навигация */}
        <nav className="mb-6 text-sm">
          <Link href={`/${locale}/process`} className="text-[var(--color-crypto)] hover:underline">
            ← Вернуться к процессу
          </Link>
        </nav>

        {/* Заголовок */}
        <header className="mb-8 text-center">
          <p className="mx-auto mt-2 mb-6 w-full text-center text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
            In development
          </p>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] bg-clip-text text-transparent">
            Верификация (KYC)
          </h1>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Короткая онлайн-проверка личности помогает защитить клиентов и соответствует швейцарским
            правилам. Всё проходит быстро и безопасно.
          </p>
        </header>

        {/* Основной контент */}
        <div className="space-y-6">
          {/* Зачем это нужно */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Зачем это нужно</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Верификация предотвращает злоупотребления и обязательна для сделок от{" "}
              <strong>≈ CHF&nbsp;1&nbsp;000</strong>. Это стандарт для швейцарских провайдеров и
              нормальная часть безопасного обмена.
            </p>
          </section>

          {/* Что потребуется */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что потребуется</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Документ: паспорт или ID-карта.</li>
              <li>Короткая селфи-проверка (живость/совпадение).</li>
              <li>Иногда — подтверждение адреса или источника средств (для крупных сумм).</li>
            </ul>
          </section>

          {/* Как проходит */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Как проходит</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Мы отправляем удобную ссылку — проверка занимает 5–8 минут.</li>
              <li>Скан документа + короткая селфи-проверка прямо с телефона.</li>
              <li>Результат — обычно в течение 10–15 минут.</li>
            </ul>
          </section>

          {/* Кошельки — максимально просто */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">
              Если вы используете свой кошелёк
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Чтобы убедиться, что адрес действительно ваш, мы можем попросить простое подтверждение
              — например, небольшой тестовый перевод или скрин из приложения. Это быстро и делается
              один раз для «белого списка» адресов.
            </p>
          </section>

          {/* Конфиденциальность */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Защита данных</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Мы обрабатываем данные строго по швейцарским правилам и используем их только для
              исполнения вашей сделки. Шифрование и ограниченный доступ — по умолчанию.
            </p>
          </section>

          {/* Короткие правила/лимиты */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Лимиты и правила (кратко)</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                До <strong>≈ CHF&nbsp;1&nbsp;000</strong> — упрощённая процедура без полной
                идентификации.
              </li>
              <li>
                От <strong>CHF&nbsp;1&nbsp;000</strong> — стандартная KYC-идентификация и обмен
                данными по правилу <em>Travel Rule</em> для безопасных переводов.
              </li>
            </ul>
          </section>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Это надолго и сложно?</p>
              <p className="mt-1 text-sm text-slate-600">
                Нет — 5–8 минут с телефона. Мы помогаем на каждом шаге.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Почему KYC с CHF&nbsp;1&nbsp;000?</p>
              <p className="mt-1 text-sm text-slate-600">
                Такой порог установлен швейцарскими правилами FINMA для безопасных операций. Это
                стандарт рынка и защита клиентов.
              </p>
            </li>
          </ul>
        </div>

        {/* Дополнительная информация — официальные источники */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Дополнительная информация</h2>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
            <li>
              <a
                href="https://www.finma.ch/en/documentation/dossier/dossier-geldwaeschereibekaempfung/geldwaeschereiaufsicht-2022/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline"
              >
                FINMA — Money Laundering Supervision 2022
              </a>{" "}
              — описание правил идентификации и Travel Rule.
            </li>
            <li>
              <a
                href="https://www.21analytics.ch/travel-rule-regulations/switzerland-travel-rule-regulation/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline"
              >
                21 Analytics — Travel Rule Switzerland Overview (2025)
              </a>{" "}
              — актуальные требования и примеры.
            </li>
            <li>
              <a
                href="https://www.finma.ch/en/documentation/dossier/dossier-geldwaeschereibekaempfung/geldwaescherei-schwerpunkte-der-verhaltensaufsicht-2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline"
              >
                FINMA — Money Laundering Focus 2021
              </a>{" "}
              — официальный документ, подтверждающий порог CHF 1 000 для идентификации.
            </li>
          </ul>
        </div>

        {/* CTA — единый стиль кнопки */}
        <div className="mt-12 flex justify-center">
          <Link href={`/${locale}/contact`} className="btn-main">
            <Mail className="btn-main-icon" />
            <span className="btn-main-text">Пройти быструю проверку</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
