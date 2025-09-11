import { GraduationCap, Award, BookOpen } from "lucide-react";

interface EducationProps {
  lang: 'en' | 'vn';
}

export const Education = ({ lang }: EducationProps) => {
  const content = {
    en: {
      title: "Education & Achievements",
      education: {
        degree: "Bachelor of International Economics",
        school: "Foreign Trade University",
        period: "2020 – 2025",
        description: "Specialized in international trade, economic relations, and cross-cultural business practices."
      },
      awards: [
        "Academic Excellence Award - VinUni",
        "Outstanding Student Recognition - RMIT",
        "Leadership Achievement - Ministry of Public Security",
        "Excellence in International Relations - FTU",
        "Innovation Award - HUST",
        "Youth Leadership Recognition - UNDP"
      ],
      publications: [
        {
          title: "Vietnam-UAE Economic Relations: Opportunities and Challenges",
          journal: "VIID International Journal",
          year: "2024"
        }
      ]
    },
    vn: {
      title: "Học vấn & Thành tích",
      education: {
        degree: "Cử nhân Kinh tế Quốc tế",
        school: "Đại học Ngoại thương",
        period: "2020 – 2025",
        description: "Chuyên ngành thương mại quốc tế, quan hệ kinh tế, và thực tiễn kinh doanh đa văn hóa."
      },
      awards: [
        "Giải thưởng Xuất sắc Học tập - VinUni",
        "Công nhận Sinh viên Tiêu biểu - RMIT", 
        "Thành tích Lãnh đạo - Bộ Công an",
        "Xuất sắc Quan hệ Quốc tế - ĐH Ngoại thương",
        "Giải thưởng Sáng tạo - ĐHBK Hà Nội",
        "Công nhận Lãnh đạo Thanh niên - UNDP"
      ],
      publications: [
        {
          title: "Quan hệ Kinh tế Việt Nam-UAE: Cơ hội và Thách thức",
          journal: "Tạp chí Quốc tế VIID",
          year: "2024"
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16">
            {t.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div className="bg-card rounded-2xl p-8 shadow-medium border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold">{t.education.degree}</h3>
                  <p className="text-muted-foreground">{t.education.school}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t.education.period}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {t.education.description}
              </p>
            </div>
            
            {/* Publications */}
            <div className="bg-card rounded-2xl p-8 shadow-medium border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold">
                  {lang === 'en' ? 'Publications' : 'Xuất bản'}
                </h3>
              </div>
              
              {t.publications.map((pub, index) => (
                <div key={index} className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-foreground mb-1">{pub.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{pub.journal}</p>
                  <p className="text-sm text-accent font-medium">{pub.year}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Awards Grid */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-playfair font-semibold">
                {lang === 'en' ? 'Awards & Recognition' : 'Giải thưởng & Ghi nhận'}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.awards.map((award, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-medium transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-700 font-medium group-hover:text-accent transition-colors">
                      {award}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};