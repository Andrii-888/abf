// src/seo/meta.ts
import type { Locale } from "./helpers";
import { normalizeLocale } from "./helpers";

/** --- Главная --- */
const HOME_META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Crypto & Fiat Exchange in Switzerland | Alpine Bridge Finance",
    description:
      "Compliant crypto ↔ fiat & gold exchange in Switzerland. Secure deals, bank or cash, KYC/AML, Swiss partners. Book a consultation.",
  },
  de: {
    title: "Krypto- & Fiat-Wechsel in der Schweiz | Alpine Bridge Finance",
    description:
      "Konformer Umtausch Krypto ↔ Fiat & Gold in der Schweiz. Sichere Abwicklung, Bank oder Bargeld, KYC/AML, Schweizer Partner. Beratung buchen.",
  },
  fr: {
    title: "Échange crypto & fiat en Suisse | Alpine Bridge Finance",
    description:
      "Échange conforme crypto ↔ fiat & or en Suisse. Transactions sécurisées, banque ou espèces, KYC/AML, partenaires suisses. Réservez une consultation.",
  },
  it: {
    title: "Cambio crypto & fiat in Svizzera | Alpine Bridge Finance",
    description:
      "Cambio conforme crypto ↔ fiat & oro in Svizzera. Operazioni sicure, banca o contanti, KYC/AML, partner svizzeri. Prenota una consulenza.",
  },
  ru: {
    title: "Обмен криптовалюты и фиата в Швейцарии | Alpine Bridge Finance",
    description:
      "Легальный обмен крипто ↔ фиат и золота в Швейцарии. Безопасные сделки, банк или наличные, KYC/AML, швейцарские партнёры. Запишитесь на консультацию.",
  },
  zh: {
    title: "瑞士加密货币与法币兑换 | Alpine Bridge Finance",
    description:
      "在瑞士合规兑换加密货币↔法币与黄金。安全交易，银行或现金，KYC/AML，瑞士本地合作伙伴。预约咨询。",
  },
};

export function getHomeMeta(locale?: string) {
  const loc = normalizeLocale(locale);
  return HOME_META[loc];
}

/** --- Terms --- */
const TERMS_META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Terms of Use | Alpine Bridge Finance",
    description:
      "By using this website, you agree to the Terms of Use. We strive to keep information accurate and up to date but disclaim liability for possible errors.",
  },
  de: {
    title: "Nutzungsbedingungen | Alpine Bridge Finance",
    description:
      "Durch die Nutzung dieser Website stimmen Sie den Nutzungsbedingungen zu. Wir bemühen uns um aktuelle und korrekte Informationen, haften jedoch nicht für mögliche Fehler.",
  },
  fr: {
    title: "Conditions d’utilisation | Alpine Bridge Finance",
    description:
      "En utilisant ce site, vous acceptez les conditions d’utilisation. Nous nous efforçons de fournir des informations exactes et à jour, sans responsabilité en cas d’erreurs.",
  },
  it: {
    title: "Termini di utilizzo | Alpine Bridge Finance",
    description:
      "Utilizzando questo sito accetti i Termini di utilizzo. Ci impegniamo per informazioni accurate e aggiornate, senza responsabilità per eventuali errori.",
  },
  ru: {
    title: "Условия использования | Alpine Bridge Finance",
    description:
      "Используя этот сайт, вы принимаете условия использования. Мы стараемся поддерживать информацию актуальной, не несем ответственности за возможные ошибки.",
  },
  zh: {
    title: "使用条款 | Alpine Bridge Finance",
    description:
      "使用本网站即表示您同意使用条款。我们致力于提供准确、及时的信息，但不对可能出现的错误承担责任。",
  },
};

export function getTermsMeta(locale?: string) {
  const loc = normalizeLocale(locale);
  return TERMS_META[loc];
}

/** --- Privacy --- */
const PRIVACY_META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Privacy Policy | Alpine Bridge Finance",
    description:
      "We respect your privacy. Data submitted via the contact form is used solely to respond to your request and handled under Swiss (FADP) and EU (GDPR) law.",
  },
  de: {
    title: "Datenschutzerklärung | Alpine Bridge Finance",
    description:
      "Wir respektieren Ihre Privatsphäre. Daten aus dem Kontaktformular werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet und gemäß FADP/GDPR verarbeitet.",
  },
  fr: {
    title: "Politique de confidentialité | Alpine Bridge Finance",
    description:
      "Nous respectons votre vie privée. Les données envoyées via le formulaire de contact servent uniquement à répondre à votre demande et sont traitées selon FADP/GDPR.",
  },
  it: {
    title: "Informativa sulla privacy | Alpine Bridge Finance",
    description:
      "Rispettiamo la tua privacy. I dati inviati tramite il form sono usati solo per rispondere alla tua richiesta e trattati secondo FADP/GDPR.",
  },
  ru: {
    title: "Политика конфиденциальности | Alpine Bridge Finance",
    description:
      "Мы уважаем вашу конфиденциальность. Данные формы используются только для ответа и обрабатываются по законам Швейцарии (FADP) и ЕС (GDPR).",
  },
  zh: {
    title: "隐私政策 | Alpine Bridge Finance",
    description:
      "我们尊重您的隐私。通过联系表单提交的数据仅用于回复您的请求，并依据瑞士（FADP）与欧盟（GDPR）法律处理。",
  },
};

export function getPrivacyMeta(locale?: string) {
  const loc = normalizeLocale(locale);
  return PRIVACY_META[loc];
}

// ...внизу meta.ts, рядом с getHomeMeta/getTermsMeta/getPrivacyMeta:

const SERVICES_META = {
  en: {
    title: "Our Services | Alpine Bridge Finance",
    description:
      "Crypto ↔ fiat & gold exchange, OTC deals, bank/cash settlements, KYC/AML, Swiss partners.",
  },
  de: {
    title: "Leistungen | Alpine Bridge Finance",
    description:
      "Krypto ↔ Fiat & Gold, OTC, Bank/Bar, KYC/AML, Schweizer Partner.",
  },
  fr: {
    title: "Services | Alpine Bridge Finance",
    description:
      "Échange crypto ↔ fiat & or, OTC, banque/espèces, KYC/AML, partenaires suisses.",
  },
  it: {
    title: "Servizi | Alpine Bridge Finance",
    description:
      "Cambio crypto ↔ fiat & oro, OTC, banca/contanti, KYC/AML, partner svizzeri.",
  },
  ru: {
    title: "Услуги | Alpine Bridge Finance",
    description:
      "Обмен crypto ↔ фиат и золото, OTC, банк/наличные, KYC/AML, швейцарские партнёры.",
  },
  zh: {
    title: "服务 | Alpine Bridge Finance",
    description: "加密↔法币与黄金兑换，OTC，银行/现金，KYC/AML，瑞士合作伙伴。",
  },
} as const;

const PROCESS_META = {
  en: {
    title: "How It Works | Alpine Bridge Finance",
    description:
      "Step-by-step process: inquiry, KYC/AML, quote, settlement (bank/cash), closing.",
  },
  de: {
    title: "Ablauf | Alpine Bridge Finance",
    description:
      "Schritt für Schritt: Anfrage, KYC/AML, Quote, Abwicklung (Bank/Bar), Closing.",
  },
  fr: {
    title: "Processus | Alpine Bridge Finance",
    description:
      "Étapes: demande, KYC/AML, devis, règlement (banque/espèces), clôture.",
  },
  it: {
    title: "Processo | Alpine Bridge Finance",
    description:
      "Passi: richiesta, KYC/AML, quotazione, regolamento (banca/contanti), chiusura.",
  },
  ru: {
    title: "Как это работает | Alpine Bridge Finance",
    description:
      "Шаги: запрос, KYC/AML, оффер, расчёт (банк/наличные), закрытие.",
  },
  zh: {
    title: "流程 | Alpine Bridge Finance",
    description: "流程：咨询，KYC/AML，报价，结算（银行/现金），完成。",
  },
} as const;

const PARTNERS_META = {
  en: {
    title: "Partners | Alpine Bridge Finance",
    description:
      "Swiss-regulated partners: banks, fiduciaries, notaries. Become a partner.",
  },
  de: {
    title: "Partner | Alpine Bridge Finance",
    description:
      "Schweizer Partner: Banken, Treuhänder, Notare. Werden Sie Partner.",
  },
  fr: {
    title: "Partenaires | Alpine Bridge Finance",
    description:
      "Partenaires en Suisse: banques, fiduciaires, notaires. Devenez partenaire.",
  },
  it: {
    title: "Partner | Alpine Bridge Finance",
    description: "Partner svizzeri: banche, fiduciari, notai. Diventa partner.",
  },
  ru: {
    title: "Партнёры | Alpine Bridge Finance",
    description:
      "Швейцарские партнёры: банки, фидуциарии, нотариусы. Станьте партнёром.",
  },
  zh: {
    title: "合作伙伴 | Alpine Bridge Finance",
    description: "瑞士合作伙伴：银行、信托、 公证。加入合作。",
  },
} as const;

export function getServicesMeta(locale?: string) {
  const loc = normalizeLocale(locale);
  return SERVICES_META[loc];
}
export function getProcessMeta(locale?: string) {
  const loc = normalizeLocale(locale);
  return PROCESS_META[loc];
}
export function getPartnersMeta(locale?: string) {
  const loc = normalizeLocale(locale);
  return PARTNERS_META[loc];
}
