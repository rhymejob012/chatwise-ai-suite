import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Mic, Receipt, Database, Table, Bell, MessageSquare, Star } from 'lucide-react';

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      nameKey: 'pricing.telegram',
      priceKZT: '20 000 ₸',
      priceUSD: '$40',
      features: ['Telegram Bot', 'AI Assistant', '24/7 Support'],
      popular: false,
    },
    {
      nameKey: 'pricing.instagram',
      priceKZT: '30 000 ₸',
      priceUSD: '$60',
      features: ['Instagram/TikTok', 'AI Assistant', 'Auto DM', 'Stories Reply'],
      popular: false,
    },
    {
      nameKey: 'pricing.whatsapp',
      priceKZT: '40 000 ₸',
      priceUSD: '$85',
      features: ['WhatsApp Business', 'AI Assistant', 'Voice Messages', 'Payment Check'],
      popular: true,
    },
    {
      nameKey: 'pricing.fullpack',
      priceKZT: '100 000 ₸',
      priceUSD: '$200',
      features: ['All Platforms', 'AI Assistant', 'Priority Support', 'All Add-ons'],
      popular: false,
    },
  ];

  const addons = [
    { icon: Mic, key: 'pricing.addon.audio' },
    { icon: Receipt, key: 'pricing.addon.checks' },
    { icon: Database, key: 'pricing.addon.crm' },
    { icon: Table, key: 'pricing.addon.tables' },
    { icon: Bell, key: 'pricing.addon.notifications' },
    { icon: MessageSquare, key: 'pricing.addon.direct' },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('pricing.title')}</span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.nameKey}
              className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 animate-fade-in ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/20 to-card/80 border-primary/50 scale-105'
                  : 'bg-card/50 border-border/50 hover:border-primary/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-primary rounded-full text-primary-foreground text-xs font-medium">
                    <Star className="w-3 h-3" />
                    {t('pricing.popular')}
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t(plan.nameKey)}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-foreground">{plan.priceKZT}</div>
                <div className="text-muted-foreground text-sm">{plan.priceUSD}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? 'glow' : 'outline'}
                className="w-full"
              >
                {t('pricing.order')}
              </Button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2 md:mb-0">
                {t('pricing.addons')}
              </h3>
              <div className="text-primary font-semibold">
                +5 000 ₸ / $10 {t('pricing.each')}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {addons.map((addon) => (
                <div
                  key={addon.key}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <addon.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{t(addon.key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            {t('pricing.note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
