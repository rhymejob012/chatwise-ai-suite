import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, TrendingUp, FileText, ShieldCheck, Wallet } from 'lucide-react';

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Clock,
      metric: 'response',
    },
    {
      icon: TrendingUp,
      metric: 'conversion',
    },
    {
      icon: FileText,
      metric: 'reports',
    },
    {
      icon: ShieldCheck,
      metric: 'errors',
    },
    {
      icon: Wallet,
      metric: 'costs',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            <div className="text-center text-sm md:text-base font-medium text-primary">
              {t('stats.after')}
            </div>
            <div className="text-center text-sm md:text-base font-medium text-accent-foreground">
              {t('stats.result')}
            </div>
          </div>

          {/* Stats Rows */}
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div
                key={stat.metric}
                className="grid grid-cols-4 gap-4 p-4 md:p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Metric Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
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
                  <span className="text-sm md:text-base font-semibold text-primary text-center">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
