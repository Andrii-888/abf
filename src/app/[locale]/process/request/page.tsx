import "server-only";
export const runtime = "nodejs";

import Link from "next/link";
import { Mail } from "lucide-react";

export default async function RequestPage({ params }: { params: Promise<{ locale: string }> }) {
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
            Создание заявки
          </h1>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Начните обмен за один шаг — укажите направление, сумму и удобный способ получения. Мы
            свяжемся с вами, подтвердим курс и детали сделки.
          </p>
        </header>

        {/* Основной контент */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что вы получаете</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Быстрое подтверждение условий и персональное сопровождение. Мы фиксируем курс,
              согласовываем сумму и подбираем оптимальный способ получения средств: наличными, на
              банковский счёт или на ваш криптокошелёк.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Лимиты и суммы</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Минимальная сумма обмена — около <strong>CHF 1 000</strong>. Сделки ниже этого порога
              обрабатываются быстро и не требуют полной верификации личности.
            </p>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              При суммах от <strong>CHF 1 000</strong> и выше требуется стандартная идентификация
              (KYC) по швейцарскому законодательству и, при необходимости, подтверждение источника
              средств. Это стандартное требование FINMA для всех регулируемых обменных операций.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что мы делаем</h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Проверяем доступность ликвидности и резервируем вашу сделку. Уточняем курс, сумму и
              способ получения. При необходимости отправляем ссылку для KYC-верификации. Все данные
              обрабатываются строго конфиденциально и в соответствии с законами Швейцарии.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Что нужно от вас</h2>
            <ul className="mt-2 text-slate-600 text-sm space-y-2 list-disc list-inside">
              <li>Укажите валюту, сумму и направление обмена (например BTC → CHF).</li>
              <li>Сообщите желаемый способ получения средств (банк, наличные, крипто).</li>
              <li>Оставьте контакт — Telegram, WhatsApp или e-mail.</li>
            </ul>
          </section>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Сколько занимает подтверждение заявки?</p>
              <p className="mt-1 text-sm text-slate-600">
                Обычно 10–15 минут. При крупных суммах или дополнительной проверке — до 1 рабочего
                дня.
              </p>
            </li>
            <li className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="font-medium text-slate-800">Нужны ли документы сразу?</p>
              <p className="mt-1 text-sm text-slate-600">
                Для сумм до CHF 1 000 — нет. Для более крупных сделок мы заранее уведомляем и
                помогаем пройти идентификацию онлайн.
              </p>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link href={`/${locale}/contact`} className="btn-main">
            <Mail className="btn-main-icon" />
            <span className="btn-main-text">Связаться для обмена</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
