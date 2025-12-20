import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ru' | 'kz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О ботах',
    'nav.pricing': 'Прайс',
    'nav.faq': 'Вопросы',
    'nav.contact': 'Контакты',
    'nav.propose': 'Предложить идею',
    
    // Hero
    'hero.title': 'Интеллектуальные AI-агенты для вашего бизнеса',
    'hero.subtitle': 'Автоматизируем продажи и поддержку 24/7. Бот, который понимает голос, проверяет оплату и говорит на языке клиента.',
    'hero.cta': 'Попробовать демо-бота в Telegram',
    
    // Stats
    'stats.title': 'Эффективность автоматизации',
    'stats.before': 'До автоматизации',
    'stats.after': 'С ChatWise AI',
    'stats.result': 'Результат',
    'stats.response': 'Скорость ответа',
    'stats.response.before': '5-30 минут',
    'stats.response.after': '<1 минута',
    'stats.response.result': 'Мгновенно',
    'stats.conversion': 'Конверсия',
    'stats.conversion.before': 'Базовая',
    'stats.conversion.after': '+60%',
    'stats.conversion.result': 'Рост продаж',
    'stats.reports': 'Отчёты',
    'stats.reports.before': 'Вручную',
    'stats.reports.after': 'Автоматически',
    'stats.reports.result': 'Экономия времени',
    'stats.errors': 'Ошибки',
    'stats.errors.before': 'Человеческий фактор',
    'stats.errors.after': '0%',
    'stats.errors.result': 'Точность 100%',
    'stats.costs': 'Расходы',
    'stats.costs.before': '100%',
    'stats.costs.after': '-90%',
    'stats.costs.result': 'Снижение затрат',
    
    // About
    'about.title': 'Почему выбирают ChatWise',
    'about.feature1.title': 'Мультиязычность',
    'about.feature1.desc': 'Бот общается на русском, казахском и английском языках',
    'about.feature2.title': 'Голосовые сообщения',
    'about.feature2.desc': 'Распознавание и обработка голосовых сообщений клиентов',
    'about.feature3.title': 'Проверка оплаты',
    'about.feature3.desc': 'Автоматическая проверка чеков и подтверждение платежей',
    'about.feature4.title': 'CRM интеграция',
    'about.feature4.desc': 'Синхронизация с вашей CRM-системой в реальном времени',
    
    // Pricing
    'pricing.title': 'Тарифы',
    'pricing.telegram': 'Telegram AI',
    'pricing.instagram': 'Instagram/TikTok AI',
    'pricing.whatsapp': 'WhatsApp AI',
    'pricing.fullpack': 'Full Pack',
    'pricing.popular': 'Популярный',
    'pricing.addons': 'Дополнительные функции',
    'pricing.addon.audio': 'Распознавание аудио',
    'pricing.addon.checks': 'Проверка чеков',
    'pricing.addon.crm': 'Интеграция CRM',
    'pricing.addon.tables': 'Сбор таблиц',
    'pricing.addon.notifications': 'Уведомления',
    'pricing.addon.direct': 'Автоответы в Direct',
    'pricing.note': 'Первый месяц обслуживания бесплатно, далее $25–40/мес',
    'pricing.each': 'каждая',
    'pricing.order': 'Заказать',
    
    // FAQ
    'faq.title': 'Частые вопросы',
    'faq.q1': 'Какие требования для подключения бота?',
    'faq.a1': 'Для подключения необходимы: Gmail аккаунт, Facebook (для Instagram/WhatsApp), токен бота Telegram, ИП/ТОО для официального использования.',
    'faq.q2': 'Сколько времени занимает настройка?',
    'faq.a2': 'Настройка и запуск бота занимает от 1 до 3 рабочих дней в зависимости от сложности интеграции.',
    'faq.q3': 'Может ли бот ошибаться?',
    'faq.a3': 'AI минимизирует ошибки до 0%. В сложных случаях бот автоматически передаёт запрос живому оператору.',
    'faq.q4': 'Какие платформы поддерживаются?',
    'faq.a4': 'ChatWise работает с WhatsApp, Telegram, Instagram и TikTok. Возможна интеграция с другими платформами по запросу.',
    
    // Contact
    'contact.title': 'Предложить идею',
    'contact.name': 'Имя',
    'contact.city': 'Город',
    'contact.idea': 'Описание идеи',
    'contact.submit': 'Отправить',
    'contact.success': 'Спасибо! Мы свяжемся с вами.',
    
    // Footer
    'footer.telegram': 'Написать в Telegram',
    'footer.note': 'Наш бот — это живой пример AI-автоматизации: трёхъязычный, с расчётом стоимости и приёмом чеков.',
    'footer.rights': '© 2024 ChatWise. Все права защищены.',
  },
  kz: {
    // Navigation
    'nav.home': 'Басты бет',
    'nav.about': 'Боттар туралы',
    'nav.pricing': 'Бағалар',
    'nav.faq': 'Сұрақтар',
    'nav.contact': 'Байланыс',
    'nav.propose': 'Идея ұсыну',
    
    // Hero
    'hero.title': 'Сіздің бизнесіңіз үшін интеллектуалды AI-агенттер',
    'hero.subtitle': 'Сатылымды және қолдауды 24/7 автоматтандырамыз. Дауысты түсінетін, төлемді тексеретін және клиент тілінде сөйлейтін бот.',
    'hero.cta': 'Telegram-да демо-ботты сынап көру',
    
    // Stats
    'stats.title': 'Автоматтандыру тиімділігі',
    'stats.before': 'Автоматтандыруға дейін',
    'stats.after': 'ChatWise AI-мен',
    'stats.result': 'Нәтиже',
    'stats.response': 'Жауап жылдамдығы',
    'stats.response.before': '5-30 минут',
    'stats.response.after': '<1 минут',
    'stats.response.result': 'Лезде',
    'stats.conversion': 'Конверсия',
    'stats.conversion.before': 'Базалық',
    'stats.conversion.after': '+60%',
    'stats.conversion.result': 'Сатылым өсімі',
    'stats.reports': 'Есептер',
    'stats.reports.before': 'Қолмен',
    'stats.reports.after': 'Автоматты',
    'stats.reports.result': 'Уақытты үнемдеу',
    'stats.errors': 'Қателер',
    'stats.errors.before': 'Адам факторы',
    'stats.errors.after': '0%',
    'stats.errors.result': '100% дәлдік',
    'stats.costs': 'Шығындар',
    'stats.costs.before': '100%',
    'stats.costs.after': '-90%',
    'stats.costs.result': 'Шығын азайту',
    
    // About
    'about.title': 'Неге ChatWise таңдайды',
    'about.feature1.title': 'Көптілділік',
    'about.feature1.desc': 'Бот орыс, қазақ және ағылшын тілдерінде сөйлеседі',
    'about.feature2.title': 'Дауыстық хабарламалар',
    'about.feature2.desc': 'Клиенттердің дауыстық хабарламаларын тану және өңдеу',
    'about.feature3.title': 'Төлемді тексеру',
    'about.feature3.desc': 'Чектерді автоматты тексеру және төлемдерді растау',
    'about.feature4.title': 'CRM интеграциясы',
    'about.feature4.desc': 'CRM жүйесімен нақты уақытта синхрондау',
    
    // Pricing
    'pricing.title': 'Тарифтер',
    'pricing.telegram': 'Telegram AI',
    'pricing.instagram': 'Instagram/TikTok AI',
    'pricing.whatsapp': 'WhatsApp AI',
    'pricing.fullpack': 'Full Pack',
    'pricing.popular': 'Танымал',
    'pricing.addons': 'Қосымша функциялар',
    'pricing.addon.audio': 'Аудио тану',
    'pricing.addon.checks': 'Чектерді тексеру',
    'pricing.addon.crm': 'CRM интеграциясы',
    'pricing.addon.tables': 'Кестелер жинау',
    'pricing.addon.notifications': 'Хабарландырулар',
    'pricing.addon.direct': 'Direct автожауаптар',
    'pricing.note': 'Бірінші ай қызмет көрсету тегін, содан кейін $25–40/ай',
    'pricing.each': 'әрқайсысы',
    'pricing.order': 'Тапсырыс беру',
    
    // FAQ
    'faq.title': 'Жиі қойылатын сұрақтар',
    'faq.q1': 'Ботты қосу үшін қандай талаптар бар?',
    'faq.a1': 'Қосылу үшін қажет: Gmail аккаунты, Facebook (Instagram/WhatsApp үшін), Telegram бот токені, ресми пайдалану үшін ЖК/ЖШС.',
    'faq.q2': 'Орнату қанша уақыт алады?',
    'faq.a2': 'Ботты орнату және іске қосу интеграция күрделілігіне байланысты 1-ден 3 жұмыс күніне дейін созылады.',
    'faq.q3': 'Бот қателесуі мүмкін бе?',
    'faq.a3': 'AI қателерді 0%-ға дейін азайтады. Күрделі жағдайларда бот сұрауды автоматты түрде тірі операторға жібереді.',
    'faq.q4': 'Қандай платформалар қолдау көрсетіледі?',
    'faq.a4': 'ChatWise WhatsApp, Telegram, Instagram және TikTok-пен жұмыс істейді. Сұраныс бойынша басқа платформалармен интеграция мүмкін.',
    
    // Contact
    'contact.title': 'Идея ұсыну',
    'contact.name': 'Аты',
    'contact.city': 'Қала',
    'contact.idea': 'Идея сипаттамасы',
    'contact.submit': 'Жіберу',
    'contact.success': 'Рахмет! Біз сізбен хабарласамыз.',
    
    // Footer
    'footer.telegram': 'Telegram-ға жазу',
    'footer.note': 'Біздің бот — AI-автоматтандырудың тірі мысалы: үш тілді, құны есептелген және чектерді қабылдайды.',
    'footer.rights': '© 2024 ChatWise. Барлық құқықтар қорғалған.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Bots',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.propose': 'Propose an Idea',
    
    // Hero
    'hero.title': 'Intelligent AI Agents for Your Business',
    'hero.subtitle': 'Automate sales and support 24/7. A bot that understands voice, verifies payments, and speaks your customer\'s language.',
    'hero.cta': 'Try Demo Bot in Telegram',
    
    // Stats
    'stats.title': 'Automation Efficiency',
    'stats.before': 'Before Automation',
    'stats.after': 'With ChatWise AI',
    'stats.result': 'Result',
    'stats.response': 'Response Time',
    'stats.response.before': '5-30 minutes',
    'stats.response.after': '<1 minute',
    'stats.response.result': 'Instant',
    'stats.conversion': 'Conversion',
    'stats.conversion.before': 'Baseline',
    'stats.conversion.after': '+60%',
    'stats.conversion.result': 'Sales Growth',
    'stats.reports': 'Reports',
    'stats.reports.before': 'Manual',
    'stats.reports.after': 'Automatic',
    'stats.reports.result': 'Time Saved',
    'stats.errors': 'Errors',
    'stats.errors.before': 'Human Factor',
    'stats.errors.after': '0%',
    'stats.errors.result': '100% Accuracy',
    'stats.costs': 'Costs',
    'stats.costs.before': '100%',
    'stats.costs.after': '-90%',
    'stats.costs.result': 'Cost Reduction',
    
    // About
    'about.title': 'Why Choose ChatWise',
    'about.feature1.title': 'Multilingual',
    'about.feature1.desc': 'Bot communicates in Russian, Kazakh, and English',
    'about.feature2.title': 'Voice Messages',
    'about.feature2.desc': 'Recognition and processing of customer voice messages',
    'about.feature3.title': 'Payment Verification',
    'about.feature3.desc': 'Automatic receipt verification and payment confirmation',
    'about.feature4.title': 'CRM Integration',
    'about.feature4.desc': 'Real-time synchronization with your CRM system',
    
    // Pricing
    'pricing.title': 'Pricing',
    'pricing.telegram': 'Telegram AI',
    'pricing.instagram': 'Instagram/TikTok AI',
    'pricing.whatsapp': 'WhatsApp AI',
    'pricing.fullpack': 'Full Pack',
    'pricing.popular': 'Popular',
    'pricing.addons': 'Additional Features',
    'pricing.addon.audio': 'Audio Recognition',
    'pricing.addon.checks': 'Receipt Verification',
    'pricing.addon.crm': 'CRM Integration',
    'pricing.addon.tables': 'Data Collection',
    'pricing.addon.notifications': 'Notifications',
    'pricing.addon.direct': 'Direct Auto-replies',
    'pricing.note': 'First month of service is free, then $25–40/month',
    'pricing.each': 'each',
    'pricing.order': 'Order Now',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What are the requirements to connect a bot?',
    'faq.a1': 'To connect you need: Gmail account, Facebook (for Instagram/WhatsApp), Telegram bot token, IE/LLP for official use.',
    'faq.q2': 'How long does setup take?',
    'faq.a2': 'Bot setup and launch takes 1 to 3 business days depending on integration complexity.',
    'faq.q3': 'Can the bot make mistakes?',
    'faq.a3': 'AI minimizes errors to 0%. In complex cases, the bot automatically transfers the request to a live operator.',
    'faq.q4': 'What platforms are supported?',
    'faq.a4': 'ChatWise works with WhatsApp, Telegram, Instagram, and TikTok. Integration with other platforms is available upon request.',
    
    // Contact
    'contact.title': 'Propose an Idea',
    'contact.name': 'Name',
    'contact.city': 'City',
    'contact.idea': 'Idea Description',
    'contact.submit': 'Submit',
    'contact.success': 'Thank you! We will contact you.',
    
    // Footer
    'footer.telegram': 'Message on Telegram',
    'footer.note': 'Our bot is a living example of AI automation: trilingual, with cost calculation and receipt processing.',
    'footer.rights': '© 2024 ChatWise. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
