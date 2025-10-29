// src/app/[locale]/process/office-visit/page.tsx
import "server-only";
export const runtime = "nodejs";

import Link from "next/link";
import { Mail } from "lucide-react";

export default async function OfficeVisitPage({ params }: { params: Promise<{ locale: string }> }) {
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
            Визит в офис
          </h1>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Встречаемся по записи. Проверяем документы, подтверждаем условия, исполняем обмен и
            выдаём чек/квитанцию. Всё быстро, прозрачно и по-швейцарски аккуратно.
          </p>
        </header>

        {/* Основной контент */}
        <div className="space-y-6">
          {/* Что происходит на этом шаге */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что происходит на этом шаге</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Встреча в согласованное время (по записи).</li>
              <li>Короткая проверка личности и подтверждение условий сделки.</li>
              <li>Исполнение обмена: ончейн-перевод, банковский платёж или расчёт наличными.</li>
              <li>Выдаём чек/квитанцию и итоговый лист условий (для отчётности).</li>
            </ul>
          </section>

          {/* Что взять с собой */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что взять с собой</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                Паспорт или ID-карту. Для сумм от <strong>≈ CHF 1 000</strong> — это обязательное
                требование.
              </li>
              <li>Телефон с доступом к вашему банковскому приложению или криптокошельку.</li>
              <li>
                Для крупных сумм могут потребоваться документы по адресу и/или источнику средств
                (сообщим заранее).
              </li>
            </ul>
          </section>

          {/* Как проходит визит */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Как проходит визит</h2>
            <ol className="mt-2 text-slate-600 text-sm space-y-2 list-decimal list-inside">
              <li>Вы приходите в назначенное время. Адрес и инструкция — в подтверждении.</li>
              <li>
                Проверяем документ, сверяем сумму, курс и способ расчёта (rate-lock действует
                ограниченное время).
              </li>
              <li>
                Исполняем обмен. При расчёте наличными — пересчёт на счётчике при вас; при
                банковском платеже — подтверждение через банк; при крипто — проверка
                входящих/исходящих транзакций.
              </li>
              <li>Вы получаете чек/квитанцию и финальную сводку по сделке.</li>
            </ol>
          </section>

          {/* Лимиты и правила — кратко и по делу */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Лимиты и правила (кратко)</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>
                До <strong>≈ CHF 1 000</strong> обычно достаточно упрощённой процедуры.
              </li>
              <li>
                От <strong>CHF 1 000</strong> требуется стандартная идентификация (KYC) по
                швейцарским правилам.
              </li>
              <li>
                При переводе на ваш кошелёк иногда просим простое подтверждение владения адресом
                (например, небольшой тестовый перевод или скрин в приложении) — это быстро и
                делается один раз.
              </li>
              <li>
                Для крупных сумм возможен запрос документов по адресу/источнику средств — сообщаем
                заранее, чтобы вы пришли подготовленными.
              </li>
            </ul>
          </section>

          {/* Безопасность и конфиденциальность */}
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">
              Безопасность и конфиденциальность
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              В офисе действуют стандартные меры безопасности. Данные обрабатываются строго в рамках
              швейцарского законодательства и используются только для исполнения сделки. Мы
              стараемся сделать визит максимально быстрым и комфортным.
            </p>
          </section>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Сколько времени занимает визит?</p>
              <p className="mt-1 text-sm text-slate-600">
                Обычно 15–30 минут. Для крупных сумм или при высокой загрузке — дольше по ситуации.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Можно прийти без записи?</p>
              <p className="mt-1 text-sm text-slate-600">
                Рекомендуем предварительную запись, чтобы мы зарезервировали ликвидность и время под
                вашу сделку.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Что если я опоздаю?</p>
              <p className="mt-1 text-sm text-slate-600">
                Сообщите нам как можно раньше — при необходимости обновим курс и перенесём слот.
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
            <span className="text-[#007AFF] group-hover:text-[#005FCC]">Записаться в офис</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
