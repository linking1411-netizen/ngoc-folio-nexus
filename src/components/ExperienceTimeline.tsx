import { Calendar, MapPin, Building } from "lucide-react";

interface ExperienceTimelineProps {
  lang: 'en' | 'vn';
}

export const ExperienceTimeline = ({ lang }: ExperienceTimelineProps) => {
  const content = {
    en: {
      title: "Professional Experience",
      experiences: [
        {
          role: "International Relationship Manager",
          company: "Vietnam Industrial Zone",
          location: "Vietnam",
          period: "07/2025 – Present",
          highlights: [
            "Interpreter for 10+ international clients", 
            "Scheduled 30+ site visits",
            "Monthly leadership reports",
            "Cross-cultural communication facilitation"
          ]
        },
        {
          role: "BOD Assistant", 
          company: "HOEI VN",
          location: "Vietnam",
          period: "03/2025 – 06/2025",
          highlights: [
            "Organized daily meetings for executive team",
            "Accompanied BOD on 20+ business trips", 
            "Proposed management templates and systems",
            "Supported 20+ strategic partnerships"
          ]
        },
        {
          role: "Economics Research Intern",
          company: "UAE Embassy",
          location: "Vietnam", 
          period: "08/2024 – 12/2024",
          highlights: [
            "Conducted 20+ research studies on VN–UAE relations",
            "Translated 10+ diplomatic documents",
            "Organized key B2B networking events",
            "Economic analysis and reporting"
          ]
        },
        {
          role: "Youth Empowerment Project Leader",
          company: "UNDP",
          location: "Vietnam",
          period: "01/2024 – 03/2025", 
          highlights: [
            "Led 3 educational webinars",
            "Connected 100+ youth to internship opportunities",
            "Developed leadership training curricula",
            "Built sustainable mentorship networks"
          ]
        }
      ]
    },
    vn: {
      title: "Kinh nghiệm Nghề nghiệp",
      experiences: [
        {
          role: "Quản lý Quan hệ Quốc tế",
          company: "Khu Công nghiệp Việt Nam", 
          location: "Việt Nam",
          period: "07/2025 – Hiện tại",
          highlights: [
            "Phiên dịch cho 10+ khách hàng quốc tế",
            "Lên lịch 30+ chuyến thăm thực địa", 
            "Báo cáo hàng tháng cho lãnh đạo",
            "Hỗ trợ giao tiếp đa văn hóa"
          ]
        },
        {
          role: "Trợ lý Ban Điều hành",
          company: "HOEI VN",
          location: "Việt Nam", 
          period: "03/2025 – 06/2025",
          highlights: [
            "Tổ chức họp hàng ngày cho đội ngũ điều hành",
            "Tháp tùng BOD trong 20+ chuyến công tác",
            "Đề xuất mẫu và hệ thống quản lý",
            "Hỗ trợ 20+ quan hệ đối tác chiến lược"
          ]
        },
        {
          role: "Thực tập sinh Nghiên cứu Kinh tế", 
          company: "Đại sứ quán UAE",
          location: "Việt Nam",
          period: "08/2024 – 12/2024",
          highlights: [
            "Thực hiện 20+ nghiên cứu quan hệ VN–UAE",
            "Dịch 10+ tài liệu ngoại giao",
            "Tổ chức sự kiện B2B quan trọng", 
            "Phân tích và báo cáo kinh tế"
          ]
        },
        {
          role: "Trưởng dự án Phát triển Thanh niên",
          company: "UNDP",
          location: "Việt Nam",
          period: "01/2024 – 03/2025",
          highlights: [
            "Dẫn dắt 3 hội thảo giáo dục",
            "Kết nối 100+ thanh niên với cơ hội thực tập",
            "Phát triển chương trình đào tạo lãnh đạo",
            "Xây dựng mạng lưới cố vấn bền vững"
          ]
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16">
            {t.title}
          </h2>
          
          <div className="space-y-8">
            {t.experiences.map((exp, index) => (
              <div key={index} className="timeline-item group hover:bg-gray-50/50 rounded-xl p-6 transition-all duration-300">
                <div className="timeline-dot group-hover:scale-125 transition-transform"></div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Left Column - Role & Company */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-playfair font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>{exp.location}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Right Column - Period */}
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="font-medium">{exp.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};