import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

// Import images
import robotImage from '@/assets/robot.png';
import telegramLogo from '@/assets/telegram.png';
import whatsappLogo from '@/assets/whatsapp.png';
import instagramLogo from '@/assets/instagram.png';
import tiktokLogo from '@/assets/tiktok.png';
import facebookLogo from '@/assets/facebook.png';
import youtubeLogo from '@/assets/youtube.png';

const HeroSection = () => {
  const { t } = useLanguage();

  const platforms = [
    { image: telegramLogo, label: 'Telegram' },
    { image: whatsappLogo, label: 'WhatsApp' },
    { image: instagramLogo, label: 'Instagram' },
    { image: tiktokLogo, label: 'TikTok' },
    { image: facebookLogo, label: 'Facebook' },
    { image: youtubeLogo, label: 'YouTube' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/25 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-1000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(260_85%_65%_/_0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(260_85%_65%_/_0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-8 animate-fade-in animate-glow">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">AI-Powered Automation</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in animation-delay-100">
              <span className="text-gradient">{t('hero.title')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in animation-delay-200">
              {t('hero.subtitle')}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12 animate-fade-in animation-delay-300">
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
            <div className="animate-fade-in animation-delay-400">
              <p className="text-muted-foreground text-sm mb-4">{t('hero.platforms')}</p>
              <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6">
                {platforms.map((platform, index) => (
                  <div
                    key={platform.label}
                    className="group cursor-pointer animate-bounce-subtle"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/30">
                      <img 
                        src={platform.image} 
                        alt={platform.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Robot Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Glow behind robot */}
            <div className="absolute w-80 h-80 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 rounded-full blur-[80px] animate-pulse-slow" />
            
            {/* Orbiting rings */}
            <div className="absolute w-[400px] h-[400px] border border-primary/20 rounded-full animate-spin-slow" />
            <div className="absolute w-[350px] h-[350px] border border-secondary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
            
            {/* Robot Image */}
            <div className="relative z-10 animate-float">
              <img 
                src={robotImage} 
                alt="AI Agent Robot"
                className="w-72 md:w-96 lg:w-[450px] h-auto drop-shadow-2xl"
              />
              
              {/* Floating particles */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-primary rounded-full animate-float animation-delay-100 blur-[1px]" />
              <div className="absolute top-1/4 -left-6 w-3 h-3 bg-secondary rounded-full animate-float animation-delay-300 blur-[1px]" />
              <div className="absolute bottom-1/4 -right-8 w-5 h-5 bg-accent rounded-full animate-float animation-delay-500 blur-[1px]" />
              <div className="absolute -bottom-2 left-1/4 w-3 h-3 bg-primary rounded-full animate-float-delayed blur-[1px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;