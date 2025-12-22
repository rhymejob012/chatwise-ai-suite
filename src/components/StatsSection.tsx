import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, TrendingUp, FileText, ShieldCheck, Wallet } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const StatsSection = () => {
  const { t } = useLanguage();
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();

  const stats = [
    { icon: Clock, metric: 'response' },
    { icon: TrendingUp, metric: 'conversion' },
    { icon: FileText, metric: 'reports' },
    { icon: ShieldCheck, metric: 'errors' },
    { icon: Wallet, metric: 'costs' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('stats.title')}</span>
          </h2>
        </div>

        {/* Stats Table */}
        <div className="max-w-5xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 mb-4 px-4">
            <div className="col-span-1" />
            <div className="text-center text-sm md:text-base font-medium text-muted-foreground">
              {t('stats.before')}
            </div>
            <div className="text-center text-sm md:text-base font-medium text-secondary">
              {t('stats.after')}
            </div>
            <div className="text-center text-sm md:text-base font-medium text-accent">
              {t('stats.result')}
            </div>
          </div>

          {/* Stats Rows */}
          <div className="space-y-3">
            {stats.map((stat, index) => {
              const { ref, isRevealed } = useScrollReveal(0.1);
              return (
                <div
                  key={stat.metric}
                  ref={ref}
                  className={`grid grid-cols-4 gap-4 p-4 md:p-6 rounded-xl glass-card hover:border-primary/50 transition-all duration-500 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Metric Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-lg animate-glow">
                      <stat.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-sm md:text-base font-medium text-foreground hidden sm:block">
                      {t(`stats.${stat.metric}`)}
                    </span>
                  </div>

                  {/* Before */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm md:text-base text-muted-foreground text-center">
                      {t(`stats.${stat.metric}.before`)}
                    </span>
                  </div>

                  {/* After */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm md:text-base font-semibold text-secondary text-center">
                      {t(`stats.${stat.metric}.after`)}
                    </span>
                  </div>

                  {/* Result */}
                  <div className="flex items-center justify-center">
                    <span className="text-sm md:text-base font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full text-center shadow-lg">
                      {t(`stats.${stat.metric}.result`)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;