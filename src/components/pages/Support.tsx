import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Package, Users, CreditCard, Settings, HelpCircle, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

const Support = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

    const categories = [
        { icon: Package, title: t('ordersHelp'), description: t('ordersHelpDesc'), color: 'bg-blue-500/10 text-blue-500' },
        { icon: Users, title: t('accountHelp'), description: t('accountHelpDesc'), color: 'bg-green-500/10 text-green-500' },
        { icon: CreditCard, title: t('paymentsHelp'), description: t('paymentsHelpDesc'), color: 'bg-purple-500/10 text-purple-500' },
        { icon: Settings, title: t('technicalHelp'), description: t('technicalHelpDesc'), color: 'bg-orange-500/10 text-orange-500' },
    ];

    const faqs = [
        { question: t('faq1Question'), answer: t('faq1Answer') },
        { question: t('faq2Question'), answer: t('faq2Answer') },
        { question: t('faq3Question'), answer: t('faq3Answer') },
        { question: t('faq4Question'), answer: t('faq4Answer') },
        { question: t('faq5Question'), answer: t('faq5Answer') },
    ];

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) {
            toast.error(t('fillRequiredFields'));
            return;
        }
        toast.success(t('messageSent'));
        setContactForm({ name: '', email: '', subject: '', message: '' });
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/inventoryDz', label: 'Facebook', color: 'hover:text-blue-600' },
        { icon: Twitter, href: 'https://twitter.com/inventoryDz', label: 'Twitter', color: 'hover:text-sky-500' },
        { icon: Instagram, href: 'https://instagram.com/inventoryDz', label: 'Instagram', color: 'hover:text-pink-500' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">{t('supportCenter')}</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">{t('supportDescription')}</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder={t('searchHelp')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-10 h-12 text-lg"
                    />
                </div>
            </div>

            {/* Help Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center space-y-3">
                            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                                <category.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">{category.title}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* FAQ Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        {t('frequentlyAsked')}
                    </CardTitle>
                    <CardDescription>{t('faqDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredFaqs.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                            {filteredFaqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-start">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">{t('noFaqsFound')}</p>
                    )}
                </CardContent>
            </Card>

            {/* Contact Form & Social Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('contactUs')}</CardTitle>
                        <CardDescription>{t('contactDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('name')} *</Label>
                                    <Input
                                        id="name"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        placeholder={t('enterName')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('email')} *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        placeholder={t('enterEmail')}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">{t('subject')}</Label>
                                <Input
                                    id="subject"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                    placeholder={t('enterSubject')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">{t('message')} *</Label>
                                <Textarea
                                    id="message"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    placeholder={t('enterMessage')}
                                    rows={5}
                                />
                            </div>
                            <Button type="submit" className="w-full sm:w-auto">
                                <Send className="h-4 w-4 me-2" />
                                {t('sendMessage')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('connectWithUs')}</CardTitle>
                        <CardDescription>{t('socialDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors ${social.color}`}
                            >
                                <social.icon className="h-5 w-5" />
                                <span className="font-medium">{social.label}</span>
                            </a>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Support;
