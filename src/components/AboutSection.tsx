import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Mic, CreditCard, Database } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const AboutSection = () => {
  const { t } = useLanguage();
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();

  const features = [
    {
      icon: Globe,
      titleKey: 'about.feature1.title',
      descKey: 'about.feature1.desc',
    },
    {
      icon: Mic,
      titleKey: 'about.feature2.title',
      descKey: 'about.feature2.desc',
    },
    {
      icon: CreditCard,
      titleKey: 'about.feature3.title',
      descKey: 'about.feature3.desc',
    },
    {
      icon: Database,
      titleKey: 'about.feature4.title',
      descKey: 'about.feature4.desc',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const { ref, isRevealed } = useScrollReveal(0.1);
            return (
              <div
                key={feature.titleKey}
                ref={ref}
                className={`group p-6 rounded-2xl glass-card hover:border-primary/50 transition-all duration-500 scroll-reveal-scale ${isRevealed ? 'revealed' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(feature.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;