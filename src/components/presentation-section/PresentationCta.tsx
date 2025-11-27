// src/components/presentation-page/PresentationCta.tsx

import React from "react";
import Link from "next/link";

export default function PresentationCta() {
  return (
    <section className="mt-16 border-t border-gray-200 pt-8 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Хотите рассмотреть это решение для своего магазина?
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-gray-600">
        Если вы хотите обсудить конкретный вариант для вашего бизнеса, мы можем пройтись по вашему
        кейсу, посмотреть возможные сценарии и согласовать интеграцию совместно со швейцарским
        партнёром.
      </p>

      <Link
        href="/en/contact"
        className="mt-6 inline-flex rounded-full bg-black px-7 py-3 text-sm font-medium text-white shadow hover:bg-gray-900"
      >
        Связаться по поводу интеграции
      </Link>

      <p className="mt-3 text-xs text-gray-500">
        Настройка и координация интеграции выполняются совместно со швейцарским лицензированным
        партнёром. Информация на сайте носит ознакомительный характер и не является финансовой или
        юридической рекомендацией.
      </p>
    </section>
  );
}
