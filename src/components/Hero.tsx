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
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero px-4 sm:px-6">
      <div className="container mx-auto py-8 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Professional Photo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden shadow-gold border-2 border-accent">
            <img 
              src="/lovable-uploads/34b0bef7-70d1-4775-9f06-52cf09a07515.png" 
              alt="Trần Bảo Ngọc - Executive Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Name */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-playfair font-bold mb-3 sm:mb-4 tracking-tight leading-tight">
            {t.name}
          </h1>
          
          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-accent font-playfair italic mb-2 sm:mb-3 px-2">
            {t.tagline}
          </p>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 font-medium px-2">
            {t.subtitle}
          </p>
          
          {/* Introduction */}
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            {t.intro}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button className="btn-gold group w-full sm:w-auto">
              <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              {t.downloadCV}
            </Button>
            <Button variant="outline" className="btn-executive-outline w-full sm:w-auto">
              <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              {t.downloadVCard}
            </Button>
            <Button variant="ghost" className="animated-underline font-medium w-full sm:w-auto">
              {t.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};