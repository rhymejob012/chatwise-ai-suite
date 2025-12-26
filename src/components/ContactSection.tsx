import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

// Import social icons
import phoneIcon from '@/assets/phone-icon.png';
import whatsappIcon from '@/assets/whatsapp-icon.png';
import telegramIcon from '@/assets/telegram-icon.png';
import instagramIcon from '@/assets/instagram-icon.png';
import tiktokIcon from '@/assets/tiktok-icon.png';

const ContactSection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();
  const { ref: contactsRef, isRevealed: contactsRevealed } = useScrollReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    idea: '',
  });

  // Listen for external updates to the idea field
  useEffect(() => {
    const ideaField = document.getElementById('idea') as HTMLTextAreaElement;
    if (ideaField) {
      const handleInput = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        setFormData(prev => ({ ...prev, idea: target.value }));
      };
      ideaField.addEventListener('input', handleInput);
      return () => ideaField.removeEventListener('input', handleInput);
    }
  }, []);

  const contacts = [
    { icon: phoneIcon, label: '+7 706 687 31 67', link: 'tel:+77066873167' },
    { icon: whatsappIcon, label: 'WhatsApp', link: 'https://wa.me/77066873167' },
    { icon: telegramIcon, label: 'Telegram', link: 'https://t.me/+77066873167' },
    { icon: instagramIcon, label: t('contact.instagram'), link: 'https://www.instagram.com/chatwise_kz' },
    { icon: tiktokIcon, label: t('contact.tiktok'), link: 'https://www.tiktok.com/@chatwise_kz' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      description: formData.idea,
    };

    // Format message for Telegram
    const telegramMessage = `📬 Новая заявка с сайта ChatWise\n\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n🏙 Город: ${formData.city}\n📝 Описание заказа:\n${formData.idea}`;

    try {
      // Send to Google Sheets and Telegram simultaneously
      await Promise.all([
        // Google Sheets
        fetch(
          'https://script.google.com/macros/s/AKfycbwZUOyO9DKFavOeicGwNkJRKQvLHbVsmG47QTRrW9dLjBqLnE2qDj6oXcbtUDk_rz9wfw/exec',
          {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        ),
        // Direct Telegram notification
        fetch(
          'https://api.telegram.org/bot7551239223:AAFmsPqFafxMxjYgoQxWNo482gG-7XhI4RI/sendMessage',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: 494228161,
              text: telegramMessage,
            }),
          }
        ),
      ]);

      // Success
      setIsSubmitted(true);
      toast({
        title: t('contact.success'),
      });

      setFormData({ name: '', phone: '', city: '', idea: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {isSubmitted ? (
              <div className="p-8 rounded-2xl glass-card flex flex-col items-center justify-center min-h-[400px] text-center">
                <Sparkles className="w-16 h-16 text-primary mb-4" />
                <p className="text-xl font-semibold text-foreground">
                  {t('contact.success')}
                </p>
              </div>
            ) : (
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
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.phone')}
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                      placeholder="+7 (___) ___-__-__"
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
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('contact.submit')}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Links */}
          <div 
            ref={contactsRef}
            className={`scroll-reveal-right ${contactsRevealed ? 'revealed' : ''}`}
          >
            <div className="p-8 rounded-2xl glass-card h-full">
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('contact.contacts')}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t('contact.assistants')}</p>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <img src={contact.icon} alt="" className="w-8 h-8 object-contain" />
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