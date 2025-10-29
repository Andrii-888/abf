// src/app/[locale]/process/exchange/page.tsx
import "server-only";
export const runtime = "nodejs";

import Link from "next/link";
import { Mail } from "lucide-react";

export default async function ExchangePage({ params }: { params: Promise<{ locale: string }> }) {
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
            Обмен
          </h1>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Исполняем обмен по зафиксированным условиям: ончейн-перевод, банковский платёж или
            расчёт наличными. Быстро, прозрачно и с подтверждением для отчётности.
          </p>
        </header>

        {/* Основной контент */}
        <div className="space-y-6">
          {/* Что происходит на этом шаге */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что происходит на этом шаге</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Проверяем детали сделки и активируем «окно» действия курса (rate-lock).</li>
              <li>Вы подтверждаете сумму и канал расчёта — мы исполняем обмен.</li>
              <li>Вы получаете чек/квитанцию и краткое резюме сделки на e-mail/мессенджер.</li>
            </ul>
          </section>

          {/* Способы расчёта */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Способы расчёта</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                <strong>Банк → Банк</strong>: отправка CHF/EUR/… на ваш IBAN. Сроки зависят от типа
                перевода (SEPA/Swift/внутрибанковский).
              </li>
              <li>
                <strong>Крипто → Крипто</strong>: перевод на ваш кошелёк после требуемых
                подтверждений сети.
              </li>
              <li>
                <strong>Наличные</strong>: в офисе по записи, пересчёт на счётчике при вас.
              </li>
            </ul>
          </section>

          {/* Курсы и комиссии */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Курсы и комиссии</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Курс фиксируется на время «окна» действия и указывается заранее. Комиссия зависит от
              суммы, пары и канала расчёта — мы показываем итог к получению до начала исполнения,
              без скрытых платежей.
            </p>
          </section>

          {/* Безопасность исполнения */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Безопасность исполнения</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Ончейн-платежи проводим после достижения нужного числа подтверждений сети.</li>
              <li>
                Банковские выплаты сопровождаем платёжным подтверждением/Swift MT при необходимости.
              </li>
              <li>При наличном расчёте — проверка купюр и выдача квитанции.</li>
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
                От <strong>CHF&nbsp;1&nbsp;000</strong> — требуется стандартная KYC-идентификация.
              </li>
              <li>
                Для переводов на ваш кошелёк можем попросить простое подтверждение владения адресом
                (например, небольшой тестовый перевод или скрин из приложения) — быстро и один раз.
              </li>
            </ul>
          </section>

          {/* Сроки зачисления — ориентиры */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Сроки зачисления (ориентиры)</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                <strong>Крипто</strong>: от нескольких минут (после подтверждений сети) — зависит от
                сети и нагрузки.
              </li>
              <li>
                <strong>Банк</strong>: внутрибанковские — обычно быстрее; SEPA — в пределах рабочего
                дня; SWIFT — дольше.
              </li>
              <li>
                <strong>Наличные</strong>: сразу в офисе после завершения обмена.
              </li>
            </ul>
          </section>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Что если курс изменился?</p>
              <p className="mt-1 text-sm text-slate-600">
                Если «окно» действия курса закрыто, мы предложим актуальные условия и при
                необходимости согласуем новый слот.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Можно ли разбить сумму на части?</p>
              <p className="mt-1 text-sm text-slate-600">
                Да, возможна частичная поставка/выплата по согласованию. Условия фиксируются перед
                началом.
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
            <span className="text-[#007AFF] group-hover:text-[#005FCC]">Начать обмен</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
