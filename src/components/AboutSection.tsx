import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Mic, CreditCard, Database } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

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
    <section id="about" className="py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
