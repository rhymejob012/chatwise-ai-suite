import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Mic, Database, Bell, MessageSquare, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

interface PlatformState {
  selected: boolean;
  selectedAddons: string[];
}

const PricingSection = () => {
  const { t, language } = useLanguage();
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: addonsRef, isRevealed: addonsRevealed } = useScrollReveal();

  // Base addons for Telegram and WhatsApp
  const telegramWhatsappAddons = [
    { id: 'crm', icon: Database, key: 'pricing.addon.crm' },
    { id: 'audio', icon: Mic, key: 'pricing.addon.audio' },
    { id: 'checks', icon: MessageSquare, key: 'pricing.addon.checks' },
    { id: 'tables', icon: MessageSquare, key: 'pricing.addon.tables' },
    { id: 'notifications', icon: Bell, key: 'pricing.addon.notifications' },
  ];

  // Addons for Instagram (without checks and tables)
  const instagramAddons = [
    { id: 'crm', icon: Database, key: 'pricing.addon.crm' },
    { id: 'audio', icon: Mic, key: 'pricing.addon.audio' },
    { id: 'notifications', icon: Bell, key: 'pricing.addon.notifications' },
    { id: 'files', icon: MessageSquare, key: 'pricing.addon.files' },
    { id: 'comments', icon: MessageSquare, key: 'pricing.addon.comments' },
  ];

  // Addons for TikTok (without audio, checks, tables)
  const tiktokAddons = [
    { id: 'crm', icon: Database, key: 'pricing.addon.crm' },
    { id: 'notifications', icon: Bell, key: 'pricing.addon.notifications' },
    { id: 'files', icon: MessageSquare, key: 'pricing.addon.files' },
    { id: 'comments', icon: MessageSquare, key: 'pricing.addon.comments' },
  ];

  const plans = [
    {
      id: 'telegram',
      nameKey: 'pricing.telegram',
      baseKZT: 30000,
      baseUSD: 60,
      requirementsKey: 'pricing.telegram.requirements',
      popular: false,
      isAllPlatforms: false,
      addons: telegramWhatsappAddons,
    },
    {
      id: 'instagram',
      nameKey: 'pricing.instagram',
      baseKZT: 50000,
      baseUSD: 95,
      requirementsKey: 'pricing.instagram.requirements',
      popular: false,
      isAllPlatforms: false,
      addons: instagramAddons,
    },
    {
      id: 'tiktok',
      nameKey: 'pricing.tiktok',
      baseKZT: 50000,
      baseUSD: 95,
      requirementsKey: 'pricing.tiktok.requirements',
      popular: false,
      isAllPlatforms: false,
      addons: tiktokAddons,
    },
    {
      id: 'whatsapp',
      nameKey: 'pricing.whatsapp',
      baseKZT: 50000,
      baseUSD: 95,
      requirementsKey: 'pricing.whatsapp.requirements',
      popular: true,
      isAllPlatforms: false,
      addons: telegramWhatsappAddons,
    },
    {
      id: 'allplatforms',
      nameKey: 'pricing.allplatforms',
      baseKZT: 300000,
      baseUSD: 600,
      requirementsKey: 'pricing.allplatforms.requirements',
      popular: false,
      isAllPlatforms: true,
      addons: [],
    },
  ];

  const allPlatformsFeatures = [
    'pricing.allplatforms.feature1',
    'pricing.allplatforms.feature2',
    'pricing.allplatforms.feature3',
    'pricing.allplatforms.feature4',
    'pricing.allplatforms.feature5',
  ];

  const [platformStates, setPlatformStates] = useState<Record<string, PlatformState>>(() => {
    const initial: Record<string, PlatformState> = {};
    plans.forEach(plan => {
      initial[plan.id] = {
        selected: false,
        selectedAddons: [],
      };
    });
    return initial;
  });

  const togglePlatformSelection = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    
    if (plan?.isAllPlatforms) {
      // If selecting "All Platforms", reset all other platforms
      setPlatformStates(prev => {
        const newState: Record<string, PlatformState> = {};
        plans.forEach(p => {
          if (p.id === 'allplatforms') {
            newState[p.id] = {
              selected: !prev[p.id].selected,
              selectedAddons: [],
            };
          } else {
            newState[p.id] = {
              selected: false,
              selectedAddons: [],
            };
          }
        });
        return newState;
      });
    } else {
      // If selecting individual platform, deselect "All Platforms"
      setPlatformStates(prev => ({
        ...prev,
        allplatforms: {
          selected: false,
          selectedAddons: [],
        },
        [planId]: {
          ...prev[planId],
          selected: !prev[planId].selected,
        },
      }));
    }
  };

  const toggleAddon = (planId: string, addonId: string) => {
    setPlatformStates(prev => {
      const current = prev[planId];
      const isSelected = current.selectedAddons.includes(addonId);
      
      const newAddons = isSelected
        ? current.selectedAddons.filter(id => id !== addonId)
        : [...current.selectedAddons, addonId];
      
      return {
        ...prev,
        [planId]: {
          ...current,
          selectedAddons: newAddons,
        },
      };
    });
  };

  const calculatePlatformTotal = (planId: string) => {
    const plan = plans.find(p => p.id === planId)!;
    const state = platformStates[planId];
    const addonCount = state.selectedAddons.length;
    return {
      kzt: plan.baseKZT + (addonCount * 10000),
      usd: plan.baseUSD + (addonCount * 20),
    };
  };

  const calculateGrandTotal = () => {
    let totalKZT = 0;
    let totalUSD = 0;
    
    plans.forEach(plan => {
      const state = platformStates[plan.id];
      if (state.selected) {
        const planTotal = calculatePlatformTotal(plan.id);
        totalKZT += planTotal.kzt;
        totalUSD += planTotal.usd;
      }
    });
    
    return { kzt: totalKZT, usd: totalUSD };
  };

  const getSelectedPlatformsCount = () => {
    return plans.filter(p => platformStates[p.id].selected).length;
  };

  const handleOrder = () => {
    const selectedPlatforms = plans.filter(p => platformStates[p.id].selected);
    
    if (selectedPlatforms.length === 0) return;
    
    const orderParts = selectedPlatforms.map(plan => {
      const state = platformStates[plan.id];
      const platformName = t(plan.nameKey);
      const total = calculatePlatformTotal(plan.id);
      
      const selectedFunctionNames = state.selectedAddons.map(addonId => {
        const addon = plan.addons.find(a => a.id === addonId);
        return addon ? t(addon.key) : addonId;
      });
      
      const functionsText = selectedFunctionNames.length > 0 
        ? selectedFunctionNames.join(', ') 
        : '-';
      
      return `${platformName}: ${functionsText} (${total.kzt.toLocaleString()} ₸)`;
    });
    
    const grandTotal = calculateGrandTotal();
    const description = `${t('pricing.orderFor')} ${orderParts.join('; ')}. ${t('pricing.total')} ${grandTotal.kzt.toLocaleString()} ₸`;
    
    // Scroll to contact section and set description
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Set the description in the form
      setTimeout(() => {
        const ideaField = document.getElementById('idea') as HTMLTextAreaElement;
        if (ideaField) {
          ideaField.value = description;
          ideaField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 500);
    }
  };

  const grandTotal = calculateGrandTotal();
  const selectedCount = getSelectedPlatformsCount();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-8">
          {plans.map((plan, index) => {
            const { ref, isRevealed } = useScrollReveal(0.1);
            const state = platformStates[plan.id];
            const planTotal = calculatePlatformTotal(plan.id);

            return (
              <div
                key={plan.id}
                ref={ref}
                className={`relative p-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 scroll-reveal-scale ${isRevealed ? 'revealed' : ''} ${
                  state.selected
                    ? 'bg-gradient-to-b from-primary/30 to-card/80 border-primary ring-2 ring-primary/50'
                    : plan.popular
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

                {/* Selection Checkbox */}
                <button
                  onClick={() => togglePlatformSelection(plan.id)}
                  className={`absolute top-3 right-3 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    state.selected
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground/50 hover:border-primary'
                  }`}
                >
                  {state.selected && <Check className="w-4 h-4" />}
                </button>

                {/* Plan Name */}
                <h3 className="text-lg font-semibold text-foreground mb-3 pr-8">
                  {t(plan.nameKey)}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gradient">
                    {planTotal.kzt.toLocaleString()} ₸
                  </div>
                  <div className="text-muted-foreground text-sm">${planTotal.usd}</div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">{t('pricing.requirements.needed')}</p>
                  <ul className="space-y-1.5">
                    {t(plan.requirementsKey).split('|').map((requirement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                        <Check className="w-3 h-3 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* All Platforms Included Features */}
                {plan.isAllPlatforms && (
                  <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <p className="text-xs text-accent font-medium mb-2">{t('pricing.allplatforms.includes')}</p>
                    <ul className="space-y-1">
                      {allPlatformsFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                          <Star className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          <span>{t(feature)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add-ons for this plan */}
                {plan.addons.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-medium">
                      {t('pricing.addons')} (+10 000 ₸ / $20)
                    </p>
                    <div className="space-y-1.5">
                      {plan.addons.map((addon) => {
                        const isSelected = state.selectedAddons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(plan.id, addon.id)}
                            className={`w-full flex items-center justify-between gap-2 p-2 rounded-lg text-xs transition-all duration-200 ${
                              isSelected
                                ? 'bg-primary/20 border border-primary/50 text-primary'
                                : 'bg-background/50 border border-border/30 hover:border-primary/30 text-foreground'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <addon.icon className="w-3 h-3 flex-shrink-0" />
                              <span className="text-left">{t(addon.key)}</span>
                            </div>
                            {isSelected ? (
                              <Minus className="w-3 h-3 flex-shrink-0" />
                            ) : (
                              <Plus className="w-3 h-3 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {state.selectedAddons.length > 0 && (
                      <p className="text-xs text-primary mt-2">
                        {t('pricing.selected')}: {state.selectedAddons.length}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Order Button */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
            selectedCount > 0 
              ? 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50' 
              : 'glass-card'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                {selectedCount > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t('pricing.selected')}: {selectedCount} {selectedCount === 1 ? 'платформа' : selectedCount < 5 ? 'платформы' : 'платформ'}
                    </p>
                    <p className="text-2xl font-bold text-gradient">
                      {grandTotal.kzt.toLocaleString()} ₸ <span className="text-base text-muted-foreground font-normal">/ ${grandTotal.usd}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    {language === 'ru' ? 'Выберите платформы для заказа' : language === 'kz' ? 'Тапсырыс беру үшін платформаларды таңдаңыз' : 'Select platforms to order'}
                  </p>
                )}
              </div>
              <Button
                variant="glow"
                size="lg"
                className="min-w-[200px]"
                disabled={selectedCount === 0}
                onClick={handleOrder}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t('pricing.order')}
              </Button>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div 
          ref={addonsRef}
          className={`max-w-4xl mx-auto scroll-reveal ${addonsRevealed ? 'revealed' : ''}`}
        >
          <div className="text-center text-sm space-y-2">
            <p className="text-foreground font-medium">{t('pricing.note1')}</p>
            <p className="text-muted-foreground">{t('pricing.note2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;