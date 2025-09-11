import { Download, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  lang: 'en' | 'vn';
}

export const Hero = ({ lang }: HeroProps) => {
  const content = {
    en: {
      name: "Trần Bảo Ngọc",
      tagline: "At the right hand of leadership",
      subtitle: "Executive Assistant | International Relations | Interpreter",
      intro: "Supporting boards, coordinating international partners, and leading youth empowerment projects.",
      downloadCV: "Download CV",
      downloadVCard: "Download vCard",
      contact: "Get In Touch"
    },
    vn: {
      name: "Trần Bảo Ngọc",
      tagline: "Tại vị trí phụ tá lãnh đạo",
      subtitle: "Trợ lý Ban Điều hành | Quan hệ Quốc tế | Phiên dịch viên",
      intro: "Hỗ trợ BOD, điều phối đối tác quốc tế, và dẫn dắt dự án thanh niên.",
      downloadCV: "Tải CV",
      downloadVCard: "Tải vCard",
      contact: "Liên hệ"
    }
  };

  const t = content[lang];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="container mx-auto section-padding text-center">
        <div className="max-w-4xl mx-auto">
          {/* Professional Photo */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-gold border-2 border-accent">
            <img 
              src="/lovable-uploads/34b0bef7-70d1-4775-9f06-52cf09a07515.png" 
              alt="Trần Bảo Ngọc - Executive Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 tracking-tight">
            {t.name}
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-accent font-playfair italic mb-3">
            {t.tagline}
          </p>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 font-medium">
            {t.subtitle}
          </p>
          
          {/* Introduction */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.intro}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-gold group">
              <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {t.downloadCV}
            </Button>
            <Button variant="outline" className="btn-executive-outline">
              <Download className="w-5 h-5 mr-2" />
              {t.downloadVCard}
            </Button>
            <Button variant="ghost" className="animated-underline font-medium">
              {t.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};