// app/process/page.tsx
import {
  Phone,
  ClipboardList,
  ShieldCheck,
  Handshake,
  BadgeCheck,
  RefreshCcw,
} from "lucide-react";

export default function ProcessPage() {
  const steps = [
    {
      n: 1,
      title: "Создание заявки",
      desc: "Начните обмен в один клик — напишите в мессенджер или на email, указав направление и сумму.",
      Icon: Phone,
    },
    {
      n: 2,
      title: "Подтверждение",
      desc: "Клиент получает обратную связь для подтверждения условий обмена и параметров сделки.",
      Icon: ClipboardList,
    },
    {
      n: 3,
      title: "Верификация (KYC)",
      desc: "Если требуется, проводится краткая верификация клиента (KYC) и согласование документов.",
      Icon: ShieldCheck,
    },
    {
      n: 4,
      title: "Визит в офис",
      desc: "Сделка проходит в назначенное время, конфиденциально и с оформлением всех документов.",
      Icon: Handshake,
    },
    {
      n: 5,
      title: "Обмен",
      desc: "Клиент переводит криптовалюту на кошелёк обменника, а взамен получает наличные евро или перевод на свой банковский счёт.",
      Icon: RefreshCcw,
    },
    {
      n: 6,
      title: "Получение средств",
      desc: "После подтверждения операции осуществляется передача средств в согласованной форме.",
      Icon: BadgeCheck,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Заголовок блока */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] bg-clip-text text-transparent">
          От консультации до подтверждения — весь процесс под контролем
        </h1>
        <p className="mt-3 text-slate-700 text-sm sm:text-base max-w-2xl mx-auto">
          Полный цикл обмена под контролем профессионалов.
        </p>
      </header>

      {/* Карточки шагов */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map(({ n, title, desc, Icon }) => (
          <li key={n} className="group">
            <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] shadow-lg transition-transform duration-200 group-hover:translate-y-[1px]">
              <div className="rounded-2xl bg-white/85 backdrop-blur p-5 h-full border border-slate-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-semibold bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]">
                      {n}
                    </span>
                    <Icon className="h-5 w-5 text-[var(--color-gold)] opacity-90" />
                  </div>

                  <h3 className="mt-3 text-base font-semibold leading-tight">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-700">{desc}</p>
                </div>

                <div className="mt-4 text-xs font-medium text-slate-600 opacity-80">
                  Нажмите для деталей
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Финальная подпись */}
      <div className="mt-12 text-center text-slate-700 text-sm max-w-2xl mx-auto">
        Мы не просто выполняем обмен — мы сопровождаем сделку на каждом этапе,
        обеспечивая полную безопасность и прозрачность.
      </div>
    </div>
  );
}
