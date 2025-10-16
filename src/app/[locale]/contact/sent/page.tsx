import Link from "next/link";

export default function ContactSentPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold mb-4">
        Спасибо! Сообщение отправлено.
      </h1>
      <p className="text-gray-600 mb-8">
        Мы свяжемся с вами в ближайшее время.
      </p>
      <Link href="/" className="text-crypto underline">
        Вернуться на главную
      </Link>
    </section>
  );
}
