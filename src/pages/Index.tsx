import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'vn'>('en');

  return (
    <div className="min-h-screen bg-background">
      <Header lang={language} onLanguageChange={setLanguage} />

      <div id="hero">
        <Hero lang={language} />
      </div>
      <div id="about">
        <About lang={language} />
      </div>
      <div id="experience">
        <ExperienceTimeline lang={language} />
      </div>
      <div id="education">
        <Education lang={language} />
      </div>
      <div id="contact">
        <Contact lang={language} />
      </div>
      
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
