import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  currentLang: 'en' | 'vn';
  onLanguageChange: (lang: 'en' | 'vn') => void;
}

export const LanguageToggle = ({ currentLang, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex border rounded-lg overflow-hidden">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-sm font-medium transition-all ${
            currentLang === 'en' 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange('vn')}
          className={`px-3 py-1 text-sm font-medium transition-all ${
            currentLang === 'vn' 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary'
          }`}
        >
          VN
        </button>
      </div>
    </div>
  );
};