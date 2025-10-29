// src/app/[locale]/process/confirmation/page.tsx
import "server-only";
export const runtime = "nodejs";

import Link from "next/link";
import { Mail } from "lucide-react";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
            Подтверждение
          </h1>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Мы фиксируем курс и условия, резервируем ликвидность и отправляем вам короткое
            подтверждение с&nbsp;временным окном на исполнение.
          </p>
        </header>

        {/* Основной контент */}
        <div className="space-y-6">
          {/* Что происходит */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что происходит на этом шаге</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Фиксируем направление (например, BTC → CHF), сумму и способ расчёта.</li>
              <li>Даём «окно» действия по курсу (обычно 10–30 минут) — защита от волатильности.</li>
              <li>Резервируем актив/фиат под вашу операцию и присылаем краткое подтверждение.</li>
            </ul>
          </section>

          {/* Лимиты и простые правила */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">
              Лимиты и простые правила (Швейцария)
            </h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                Суммы до <strong>≈ CHF 1&nbsp;000</strong> обычно проходят по упрощённой процедуре.
              </li>
              <li>
                Начиная с <strong>CHF 1&nbsp;000</strong>, по закону потребуется стандартная
                KYC-идентификация.
              </li>
              <li>
                Если перевод идёт на ваш криптокошелёк, иногда мы можем попросить короткое
                подтверждение, что кошелёк принадлежит вам (например, небольшой тестовый перевод или
                скрин в приложении). Это быстро и просто.
              </li>
            </ul>
          </section>

          {/* Что мы делаем */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что мы делаем</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Проверяем соответствие сумм требованиям, подтверждаем курс и детали, резервируем
              ликвидность. При необходимости отправляем удобную ссылку на онлайн-KYC. Все данные
              защищены и используются только для исполнения сделки.
            </p>
          </section>

          {/* Что нужно от вас */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что нужно от вас</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Коротко подтвердить сумму, курс и способ получения (банк/наличные/крипто).</li>
              <li>Оперативно ответить в течение «окна» действия курса.</li>
              <li>Если сумма ≥ CHF 1&nbsp;000 — пройти быструю KYC-идентификацию по ссылке.</li>
            </ul>
          </section>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Сколько длится подтверждение?</p>
              <p className="mt-1 text-sm text-slate-600">
                Обычно 10–15 минут. Для крупных сумм или если требуется доп.проверка — до 1 рабочего
                дня.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Зачем KYC с CHF 1&nbsp;000?</p>
              <p className="mt-1 text-sm text-slate-600">
                Это стандартное требование швейцарского регулирования для безопасных и законных
                операций. Процедура простая и проходит онлайн.
              </p>
            </li>
          </ul>
        </div>

        {/* CTA — та же стильная кнопка */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-black/10 bg-white text-sm sm:text-base font-medium text-black shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-[1px] active:translate-y-0 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
          >
            <Mail className="h-4 w-4 text-[#007AFF] transition group-hover:scale-110" />
            <span className="text-[#007AFF] group-hover:text-[#005FCC]">
              Связаться для подтверждения
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
