import { useState } from "react";
import { Phone, Mail, Linkedin, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactProps {
  lang: 'en' | 'vn';
}

export const Contact = ({ lang }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const content = {
    en: {
      title: "Get In Touch",
      subtitle: "Ready to collaborate? Let's discuss how we can work together.",
      form: {
        name: "Your Name",
        email: "Email Address", 
        subject: "Subject",
        message: "Your Message",
        send: "Send Message"
      },
      contact: {
        phone: "Phone",
        email: "Email", 
        linkedin: "LinkedIn",
        location: "Location"
      }
    },
    vn: {
      title: "Liên hệ",
      subtitle: "Sẵn sàng hợp tác? Hãy thảo luận về cách chúng ta có thể làm việc cùng nhau.",
      form: {
        name: "Tên của bạn",
        email: "Địa chỉ Email",
        subject: "Chủ đề", 
        message: "Tin nhắn của bạn",
        send: "Gửi tin nhắn"
      },
      contact: {
        phone: "Điện thoại",
        email: "Email",
        linkedin: "LinkedIn", 
        location: "Địa điểm"
      }
    }
  };

  const t = content[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-medium border border-border">
                <h3 className="text-lg sm:text-xl font-playfair font-semibold mb-6">
                  {lang === 'en' ? 'Contact Information' : 'Thông tin Liên hệ'}
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">{t.contact.phone}</p>
                      <p className="text-sm sm:text-base font-medium">0972-862-432</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">{t.contact.email}</p>
                      <p className="text-sm sm:text-base font-medium break-all">tbn842003@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">{t.contact.linkedin}</p>
                      <p className="text-sm sm:text-base font-medium break-all">linkedin.com/in/tranbaongoc</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">{t.contact.location}</p>
                      <p className="text-sm sm:text-base font-medium">Hanoi, Vietnam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="order-1 lg:order-2 bg-card rounded-2xl p-6 sm:p-8 shadow-medium border border-border">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder={t.form.name}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t.form.email}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <Input
                    name="subject"
                    placeholder={t.form.subject}
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-background text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder={t.form.message}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-background resize-none text-sm sm:text-base"
                  />
                </div>
                
                <Button type="submit" className="btn-gold w-full group">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t.form.send}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};