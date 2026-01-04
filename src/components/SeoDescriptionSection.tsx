import { useLanguage } from '@/contexts/LanguageContext';

const SeoDescriptionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="sr-only">{t('seo.title')}</h2>
          <div className="prose prose-lg prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg md:text-xl">
              {t('seo.intro')}
            </p>
            <p>
              {t('seo.automation')}
            </p>
            <p>
              {t('seo.features')}
            </p>
            <p>
              {t('seo.audience')}
            </p>
            <p>
              {t('seo.useCases')}
            </p>
            <p>
              {t('seo.dataProcessing')}
            </p>
            <p>
              {t('seo.benefits')}
            </p>
            <p className="text-foreground font-medium">
              {t('seo.cta')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoDescriptionSection;
