import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Instagram, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  const platforms = [
    { icon: Send, label: 'Telegram', color: 'from-[#0088cc] to-[#00b4d8]' },
    { icon: MessageCircle, label: 'WhatsApp', color: 'from-[#25d366] to-[#128c7e]' },
    { icon: Instagram, label: 'Instagram', color: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]' },
    { icon: Sparkles, label: 'TikTok', color: 'from-[#00f2ea] to-[#ff0050]' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Automation</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-fade-in animation-delay-100">
            <span className="text-gradient">{t('hero.title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in animation-delay-200">
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in animation-delay-300">
            <Button
              variant="glow"
              size="lg"
              className="text-base px-8 py-6 group"
              onClick={() => window.open('https://t.me/ChatWiseBot', '_blank')}
            >
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              {t('hero.cta')}
            </Button>
          </div>

          {/* Platform Icons */}
          <div className="flex items-center justify-center gap-6 md:gap-8 animate-fade-in animation-delay-400">
            {platforms.map((platform, index) => (
              <div
                key={platform.label}
                className="group flex flex-col items-center gap-2 cursor-pointer"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${platform.color} p-[1px] group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-background/90 flex items-center justify-center">
                    <platform.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {platform.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
