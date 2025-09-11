import { useState } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'vn'>('en');

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-6">
        <LanguageToggle 
          currentLang={language} 
          onLanguageChange={setLanguage}
        />
      </nav>

      {/* Page Sections */}
      <Hero lang={language} />
      <About lang={language} />
      <ExperienceTimeline lang={language} />
      <Education lang={language} />
      <Contact lang={language} />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            {language === 'en' 
              ? "© 2025 Trần Bảo Ngọc. All rights reserved." 
              : "© 2025 Trần Bảo Ngọc. Tất cả quyền được bảo lưu."
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
