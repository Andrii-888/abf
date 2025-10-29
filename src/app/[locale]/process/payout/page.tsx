// src/app/[locale]/process/payout/page.tsx
import "server-only";
export const runtime = "nodejs";

import Link from "next/link";
import { Mail } from "lucide-react";

export default async function PayoutPage({ params }: { params: Promise<{ locale: string }> }) {
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
            Получение средств
          </h1>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Завершаем сделку и переводим средства удобным для вас способом — на счёт в банке,
            наличными в офисе или на криптокошелёк.
          </p>
        </header>

        {/* Основной контент */}
        <div className="space-y-6">
          {/* Что происходит на этом шаге */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что происходит на этом шаге</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Проверяем итоговую сумму к получению и подтверждаем реквизиты.</li>
              <li>Исполняем выплату выбранным способом и отправляем подтверждение.</li>
              <li>Выдаём чек/квитанцию и финальную сводку по сделке.</li>
            </ul>
          </section>

          {/* Способы получения */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Способы получения</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                <strong>Банковский перевод</strong> (CHF/EUR/… на ваш IBAN). Сроки зависят от типа
                перевода (SEPA/SWIFT/внутрибанковский).
              </li>
              <li>
                <strong>Наличные</strong> — в офисе по записи, пересчёт на счётчике при вас.
              </li>
              <li>
                <strong>Крипто</strong> — на ваш кошелёк после необходимых подтверждений сети.
              </li>
            </ul>
          </section>

          {/* Сроки — ориентиры */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Сроки (ориентиры)</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                <strong>Банк</strong>: внутрибанковские — быстрее всего; SEPA — обычно в течение
                рабочего дня; SWIFT — дольше.
              </li>
              <li>
                <strong>Наличные</strong>: сразу после завершения обмена в офисе.
              </li>
              <li>
                <strong>Крипто</strong>: от нескольких минут после подтверждений сети (зависит от
                сети и нагрузки).
              </li>
            </ul>
          </section>

          {/* Лимиты и правила (кратко) */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Лимиты и правила (кратко)</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                До <strong>≈ CHF&nbsp;1&nbsp;000</strong> — упрощённая процедура.
              </li>
              <li>
                От <strong>CHF&nbsp;1&nbsp;000</strong> — стандартная KYC-идентификация по
                швейцарским правилам.
              </li>
              <li>
                Для выплат на кошелёк иногда просим простое подтверждение владения адресом (тестовый
                перевод/скрин) — быстро и один раз.
              </li>
            </ul>
          </section>

          {/* Документы и отчётность */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Документы и отчётность</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              По итогам сделки вы получаете чек/квитанцию и сводку условий. По запросу подготовим
              платёжное подтверждение (банковское/ончейн) для вашей отчётности.
            </p>
          </section>

          {/* Безопасность и конфиденциальность */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">
              Безопасность и конфиденциальность
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Выплаты проводим в строгом соответствии с требованиями безопасности. Персональные
              данные защищены и используются только для исполнения сделки.
            </p>
          </section>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">
                Можно получить часть на банк, часть наличными?
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Да, разбивка суммы возможна по согласованию. Условия фиксируем до исполнения.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Нужен ли KYC для получения средств?</p>
              <p className="mt-1 text-sm text-slate-600">
                Для сумм от CHF 1&nbsp;000 — да. Для меньших сумм, как правило, действует упрощённая
                процедура.
              </p>
            </li>
          </ul>
        </div>

        {/* CTA — единый стиль кнопки */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-black/10 bg-white text-sm sm:text-base font-medium text-black shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-[1px] active:translate-y-0 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
          >
            <Mail className="h-4 w-4 text-[#007AFF] transition group-hover:scale-110" />
            <span className="text-[#007AFF] group-hover:text-[#005FCC]">Получить средства</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
