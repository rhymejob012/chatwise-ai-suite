import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Mic, Receipt, Database, Table, Bell, MessageSquare, Star } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const PricingSection = () => {
  const { t } = useLanguage();
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: addonsRef, isRevealed: addonsRevealed } = useScrollReveal();

  const plans = [
    {
      nameKey: 'pricing.telegram',
      priceKZT: '20 000 ₸',
      priceUSD: '$40',
      requirementsKey: 'pricing.telegram.requirements',
      popular: false,
    },
    {
      nameKey: 'pricing.instagram',
      priceKZT: '30 000 ₸',
      priceUSD: '$60',
      requirementsKey: 'pricing.instagram.requirements',
      popular: false,
    },
    {
      nameKey: 'pricing.whatsapp',
      priceKZT: '40 000 ₸',
      priceUSD: '$85',
      requirementsKey: 'pricing.whatsapp.requirements',
      popular: true,
    },
    {
      nameKey: 'pricing.fullpack',
      priceKZT: '100 000 ₸',
      priceUSD: '$200',
      requirementsKey: 'pricing.fullpack.requirements',
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
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('pricing.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t('pricing.requirements.title')}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => {
            const { ref, isRevealed } = useScrollReveal(0.1);
            return (
              <div
                key={plan.nameKey}
                ref={ref}
                className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 scroll-reveal-scale ${isRevealed ? 'revealed' : ''} ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary/20 to-card/80 border-primary/50 lg:scale-105'
                    : 'glass-card hover:border-primary/30'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-primary-foreground text-xs font-medium animate-glow">
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
                  <div className="text-3xl font-bold text-gradient">{plan.priceKZT}</div>
                  <div className="text-muted-foreground text-sm">{plan.priceUSD}</div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-3 font-medium">{t('pricing.requirements.needed')}</p>
                  <ul className="space-y-2">
                    {t(plan.requirementsKey).split('|').map((requirement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  variant={plan.popular ? 'glow' : 'outline'}
                  className="w-full"
                >
                  {t('pricing.order')}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div 
          ref={addonsRef}
          className={`max-w-4xl mx-auto scroll-reveal ${addonsRevealed ? 'revealed' : ''}`}
        >
          <div className="p-6 md:p-8 rounded-2xl glass-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2 md:mb-0">
                {t('pricing.addons')}
              </h3>
              <div className="text-secondary font-semibold">
                +5 000 ₸ / $10 {t('pricing.each')}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {addons.map((addon) => (
                <div
                  key={addon.key}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <addon.icon className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{t(addon.key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="text-center text-sm mt-6 space-y-2">
            <p className="text-foreground font-medium">{t('pricing.note1')}</p>
            <p className="text-muted-foreground">{t('pricing.note2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;