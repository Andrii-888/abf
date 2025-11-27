// src/components/presentation-page/PresentationFaq.tsx

import React from "react";

export default function PresentationFaq() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Часто задаваемые вопросы
      </h2>

      <div className="space-y-4">
        {/* 1 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Нужно ли магазину получать какую-то криптолицензию?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Нет. Ваш магазин не становится криптобиржей и не хранит криптоактивы клиентов.
            Крипточасть операций выполняется через швейцарского партнёра, который имеет необходимый
            регуляторный статус и отвечает за AML/KYC. Вы работаете в рамках обычной коммерческой
            деятельности.
          </p>
        </details>

        {/* 2 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Какой криптовалютой можно оплачивать?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            В базовой конфигурации поддерживаются стейблкоины: USDT (сеть TRC-20) и USDC (сеть BNB
            Smart Chain / BEP-20). По запросу можно обсудить дополнительные валюты и сети, в
            зависимости от того, что допустимо политикой партнёра.
          </p>
        </details>

        {/* 3 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Как выглядит процесс оплаты для клиента?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Клиент получает безопасную ссылку или сканирует QR-код, оплачивает заказ со своего
            криптокошелька, транзакция подтверждается в блокчейне, и вы сразу получаете
            подтверждение. Для клиента это выглядит как обычный платёж, только с криптовалютой.
          </p>
        </details>

        {/* 4 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Как решается вопрос возвратов клиентам?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Процесс возврата (refund) обсуждается индивидуально. Возврат может быть выполнен обратно
            в USDT/USDC на указанный кошелёк клиента или другим способом, согласованным с партнёром.
            Условия возвратов прописываются заранее, чтобы избежать недопонимания.
          </p>
        </details>

        {/* 5 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Совместимо ли это с бухгалтерией и налогами?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Да. Важно фиксировать факт оплаты и эквивалент суммы в фиате. Партнёр может предоставить
            необходимые подтверждающие документы или транзакционные отчёты. Конкретная трактовка
            зависит от юрисдикции вашего бизнеса, поэтому вопросы налогообложения стоит уточнять у
            бухгалтера.
          </p>
        </details>

        {/* 6 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Есть ли ограничения по странам или клиентам?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Да, ограничения есть. Мы не работаем с клиентами из стран, находящихся под
            международными санкциями или относящихся к списку высокорисковых юрисдикций.
            Окончательное решение принимает комплаенс швейцарского партнёра на этапе проверки
            клиента (onboarding).
          </p>
        </details>

        {/* 7 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Какие документы могут запросить у клиента?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Для небольших сумм достаточно базовых данных профиля, подтверждённой почты и телефона.
            Для больших лимитов могут запросить паспорт/ID, подтверждение адреса, документы о
            доходах и происхождении средств, выписки с биржи или информацию об истории
            криптотранзакций.
          </p>
        </details>

        {/* 8 */}
        <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
            <span>Что делать, если клиент ошибётся сетью или адресом?</span>
            <span className="text-gray-400 group-open:rotate-90 transition">▶</span>
          </summary>
          <p className="mt-3 text-sm text-gray-600">
            Перед оплатой клиент всегда видит точную сеть и адрес. Ошибка клиента не может быть
            исправлена, так как криптотранзакции необратимы. Поэтому интерфейс оплаты построен
            максимально прозрачно: сеть, валюта и адрес указаны крупно и отдельно, а клиент
            дополнительно подтверждает платёж в своём кошельке.
          </p>
        </details>
      </div>
    </section>
  );
}
