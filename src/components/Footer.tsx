import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const { ref, isRevealed } = useScrollReveal();

  const getWhatsAppLink = () => {
    const greeting = t('whatsapp.greeting');
    return `https://wa.me/77066873167?text=${encodeURIComponent(greeting)}`;
  };

  return (
    <footer className="py-16 border-t border-border/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />

      <div 
        ref={ref}
        className={`container mx-auto px-4 relative z-10 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
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
              <img src={logo} alt="ChatWise Logo" className="w-10 h-10" />
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
