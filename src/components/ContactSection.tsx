import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

// Import social icons
import phoneIcon from '@/assets/phone-icon.png';
import whatsappIcon from '@/assets/whatsapp-icon.png';
import telegramIcon from '@/assets/telegram-icon.png';
import instagramIcon from '@/assets/instagram-icon.png';
import tiktokIcon from '@/assets/tiktok-icon.png';

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();
  const { ref: contactsRef, isRevealed: contactsRevealed } = useScrollReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    idea: '',
  });

  const contacts = [
    { icon: phoneIcon, label: '+7 706 687 31 67', link: 'tel:+77066873167' },
    { icon: whatsappIcon, label: 'WhatsApp', link: 'https://wa.me/77066873167' },
    { icon: telegramIcon, label: 'Telegram', link: 'https://t.me/+77066873167' },
    { icon: instagramIcon, label: 'Instagram @chatwise_kz', link: 'https://instagram.com/chatwise_kz' },
    { icon: tiktokIcon, label: 'TikTok @chatwise_kz', link: 'https://tiktok.com/@chatwise_kz' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t('contact.success'),
      description: '✨',
    });

    setFormData({ name: '', city: '', idea: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('contact.title')}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div 
            ref={formRef}
            className={`scroll-reveal-scale ${formRevealed ? 'revealed' : ''}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl glass-card">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.name')}
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.city')}
                  </label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="idea" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.idea')}
                  </label>
                  <Textarea
                    id="idea"
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary min-h-[120px] transition-colors"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Sparkles className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.submit')}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Links */}
          <div 
            ref={contactsRef}
            className={`scroll-reveal-right ${contactsRevealed ? 'revealed' : ''}`}
          >
            <div className="p-8 rounded-2xl glass-card h-full">
              <h3 className="text-xl font-semibold text-foreground mb-2">Контакты</h3>
              <p className="text-sm text-muted-foreground mb-6">(ассистенты без ИИ)</p>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <img src={contact.icon} alt={contact.label} className="w-8 h-8 object-contain" />
                    <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                      {contact.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;