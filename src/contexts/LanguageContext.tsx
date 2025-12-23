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
    'hero.cta': 'Протестировать бота в Telegram',
    'hero.platforms': 'Можем подключить бота на эти сервисы',
    
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
    'pricing.requirements.title': 'Что нужно для подключения',
    'pricing.requirements.needed': 'Требования:',
    'pricing.telegram': 'Telegram AI',
    'pricing.telegram.requirements': 'API токен бота|Описание задач для ИИ|Токен GPT или Gemini|Facebook логин и пароль|Gmail аккаунт',
    'pricing.instagram': 'Instagram/TikTok AI',
    'pricing.instagram.requirements': 'Логин и пароль аккаунта|Facebook логин и пароль|Описание задач для ИИ|Токен GPT или Gemini|Gmail аккаунт',
    'pricing.whatsapp': 'WhatsApp AI',
    'pricing.whatsapp.requirements': 'Facebook логин и пароль|Описание задач для ИИ|Токен GPT или Gemini|Документ ИП/ТОО или сайт|Gmail аккаунт',
    'pricing.fullpack': 'Full Pack',
    'pricing.fullpack.requirements': 'Facebook аккаунт|Токен GPT или Gemini|Документ ИП/ТОО|Токен бота Telegram|Gmail аккаунт',
    'pricing.fullpack.includes': 'Подключаемые функции',
    'pricing.fullpack.feature1': 'Расшифровка аудио сообщений',
    'pricing.fullpack.feature2': 'Проверка чека',
    'pricing.fullpack.feature3': 'Уведомления админа',
    'pricing.fullpack.feature4': 'CRM система',
    'pricing.fullpack.feature5': '+2 бесплатных тех. обслуживания',
    'pricing.popular': 'Популярный',
    'pricing.addons': 'Дополнительные функции',
    'pricing.addon.audio': 'Распознавание аудио',
    'pricing.addon.checks': 'Проверка чеков',
    'pricing.addon.crm': 'Интеграция CRM',
    'pricing.addon.tables': 'Сбор таблиц',
    'pricing.addon.notifications': 'Уведомления',
    'pricing.addon.direct': 'Автоответы в Direct',
    'pricing.addons.social': 'Для соц. сетей отдельно',
    'pricing.addon.comments': 'Ответ на комменты по горячим словам',
    'pricing.addon.files': 'Отправка файлов по горячим словам (с условием на подписку)',
    'pricing.note1': 'Первое техническое обслуживание бесплатно, далее 10 000 ₸',
    'pricing.note2': 'Ежемесячная услуга AI: $25–55/мес (списывается с карты клиента, не входит в тариф)',
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
    'faq.q5': 'Как будет списываться оплата с карты?',
    'faq.a5': 'При создании бота мы предоставим вам ссылку, по которой клиент сам добавит свою карту вручную. После завершения работы он может сменить пароли при желании, чтобы закрыть доступ.',
    
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
    'hero.cta': 'Telegram-да ботты тексеру',
    'hero.platforms': 'Ботты осы сервистерге қосуға болады',
    
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
    'pricing.requirements.title': 'Қосылу үшін не қажет',
    'pricing.requirements.needed': 'Талаптар:',
    'pricing.telegram': 'Telegram AI',
    'pricing.telegram.requirements': 'Бот API токені|AI үшін тапсырмалар сипаттамасы|GPT немесе Gemini токені|Facebook логин және пароль|Gmail аккаунты',
    'pricing.instagram': 'Instagram/TikTok AI',
    'pricing.instagram.requirements': 'Аккаунт логин және пароль|Facebook логин және пароль|AI үшін тапсырмалар сипаттамасы|GPT немесе Gemini токені|Gmail аккаунты',
    'pricing.whatsapp': 'WhatsApp AI',
    'pricing.whatsapp.requirements': 'Facebook логин және пароль|AI үшін тапсырмалар сипаттамасы|GPT немесе Gemini токені|ЖК/ЖШС құжаты немесе сайт|Gmail аккаунты',
    'pricing.fullpack': 'Full Pack',
    'pricing.fullpack.requirements': 'Facebook аккаунты|GPT немесе Gemini токені|ЖК/ЖШС құжаты|Telegram бот токені|Gmail аккаунты',
    'pricing.fullpack.includes': 'Қосылатын функциялар',
    'pricing.fullpack.feature1': 'Аудио хабарламаларды шешу',
    'pricing.fullpack.feature2': 'Чекті тексеру',
    'pricing.fullpack.feature3': 'Әкімшіге хабарландыру',
    'pricing.fullpack.feature4': 'CRM жүйесі',
    'pricing.fullpack.feature5': '+2 тегін тех. қызмет',
    'pricing.popular': 'Танымал',
    'pricing.addons': 'Қосымша функциялар',
    'pricing.addon.audio': 'Аудио тану',
    'pricing.addon.checks': 'Чектерді тексеру',
    'pricing.addon.crm': 'CRM интеграциясы',
    'pricing.addon.tables': 'Кестелер жинау',
    'pricing.addon.notifications': 'Хабарландырулар',
    'pricing.addon.direct': 'Direct автожауаптар',
    'pricing.addons.social': 'Әлеуметтік желілер үшін бөлек',
    'pricing.addon.comments': 'Ыстық сөздер бойынша пікірлерге жауап',
    'pricing.addon.files': 'Ыстық сөздер бойынша файлдар жіберу (жазылу шартымен)',
    'pricing.note1': 'Бірінші техникалық қызмет тегін, содан кейін 10 000 ₸',
    'pricing.note2': 'AI ай сайынғы қызметі: $25–55/ай (клиент картасынан шегеріледі, тарифке кірмейді)',
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
    'faq.q5': 'Картадан төлем қалай алынады?',
    'faq.a5': 'Бот жасау кезінде сізге сілтеме береміз, оны клиент өз картасын қолмен қосады. Жұмыс аяқталғаннан кейін ол қаласа құпия сөздерді өзгерте алады.',
    
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
    'hero.cta': 'Test Bot in Telegram',
    'hero.platforms': 'We can connect a bot to these services',
    
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
    'pricing.requirements.title': 'What you need to connect',
    'pricing.requirements.needed': 'Requirements:',
    'pricing.telegram': 'Telegram AI',
    'pricing.telegram.requirements': 'Bot API token|AI task description|GPT or Gemini token|Facebook login & password|Gmail account',
    'pricing.instagram': 'Instagram/TikTok AI',
    'pricing.instagram.requirements': 'Account login & password|Facebook login & password|AI task description|GPT or Gemini token|Gmail account',
    'pricing.whatsapp': 'WhatsApp AI',
    'pricing.whatsapp.requirements': 'Facebook login & password|AI task description|GPT or Gemini token|IE/LLP document or website|Gmail account',
    'pricing.fullpack': 'Full Pack',
    'pricing.fullpack.requirements': 'Facebook account|GPT or Gemini token|IE/LLP document|Telegram bot token|Gmail account',
    'pricing.fullpack.includes': 'Included Features',
    'pricing.fullpack.feature1': 'Audio message transcription',
    'pricing.fullpack.feature2': 'Receipt verification',
    'pricing.fullpack.feature3': 'Admin notifications',
    'pricing.fullpack.feature4': 'CRM system',
    'pricing.fullpack.feature5': '+2 free maintenance services',
    'pricing.popular': 'Popular',
    'pricing.addons': 'Additional Features',
    'pricing.addon.audio': 'Audio Recognition',
    'pricing.addon.checks': 'Receipt Verification',
    'pricing.addon.crm': 'CRM Integration',
    'pricing.addon.tables': 'Data Collection',
    'pricing.addon.notifications': 'Notifications',
    'pricing.addon.direct': 'Direct Auto-replies',
    'pricing.addons.social': 'For social media separately',
    'pricing.addon.comments': 'Reply to comments by hot words',
    'pricing.addon.files': 'Send files by hot words (with subscription condition)',
    'pricing.note1': 'First technical service is free, then 10,000 ₸',
    'pricing.note2': 'Monthly AI service: $25–55/month (charged to client\'s card, not included in tariff)',
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
    'faq.q5': 'How will payment be charged from the card?',
    'faq.a5': 'When creating a bot, we will provide you with a link where the client adds their card manually. After work is completed, they can change passwords if desired to close access.',
    
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
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
