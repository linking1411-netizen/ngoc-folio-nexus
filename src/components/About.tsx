interface AboutProps {
  lang: 'en' | 'vn';
}

export const About = ({ lang }: AboutProps) => {
  const content = {
    en: {
      title: "About Me",
      text: "With experience supporting Boards, running international initiatives, and interpreting for partners, I focus on operational excellence and building lasting collaborations. My expertise spans executive assistance, international relations, and youth empowerment, bringing efficiency and strategic thinking to complex organizational challenges.",
      highlights: [
        "Executive Support & Strategic Planning",
        "International Partnership Development", 
        "Professional Interpretation Services",
        "Youth Leadership & Project Management"
      ]
    },
    vn: {
      title: "Về Tôi",
      text: "Với kinh nghiệm hỗ trợ Ban Lãnh đạo, tổ chức dự án quốc tế và phiên dịch cho các đối tác, tôi tập trung vào hiệu quả vận hành và tạo kết nối bền vững. Chuyên môn của tôi bao gồm hỗ trợ điều hành, quan hệ quốc tế, và phát triển thanh niên, mang lại hiệu quả và tư duy chiến lược cho các thách thức tổ chức phức tạp.",
      highlights: [
        "Hỗ trợ Điều hành & Lập kế hoạch Chiến lược",
        "Phát triển Đối tác Quốc tế",
        "Dịch vụ Phiên dịch Chuyên nghiệp", 
        "Lãnh đạo Thanh niên & Quản lý Dự án"
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
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t.text}
              </p>
              
              {/* Key Highlights */}
              <div className="space-y-4">
                {t.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-2 h-2 bg-accent rounded-full mr-4 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-700 font-medium group-hover:text-accent transition-colors">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-card rounded-2xl p-8 shadow-medium border border-border">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-playfair font-bold text-accent mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">
                    {lang === 'en' ? 'Partnerships' : 'Đối tác'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-playfair font-bold text-accent mb-2">30+</div>
                  <div className="text-sm text-muted-foreground">
                    {lang === 'en' ? 'International Meetings' : 'Cuộc họp Quốc tế'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-playfair font-bold text-accent mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">
                    {lang === 'en' ? 'Youth Connected' : 'Thanh niên Kết nối'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-playfair font-bold text-accent mb-2">5</div>
                  <div className="text-sm text-muted-foreground">
                    {lang === 'en' ? 'Years Experience' : 'Năm Kinh nghiệm'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};