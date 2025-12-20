import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-16 border-t border-border/50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA */}
          <Button
            variant="glow"
            size="lg"
            className="mb-8"
            onClick={() => window.open('https://t.me/ChatWiseBot', '_blank')}
          >
            <Send className="w-5 h-5 mr-2" />
            {t('footer.telegram')}
          </Button>

          {/* Note */}
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-8">
            {t('footer.note')}
          </p>

          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">ChatWise</span>
            </div>
            <p className="text-muted-foreground text-xs">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
