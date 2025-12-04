import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, FileText, ShoppingBag, Users } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    experiences: 0,
    education: 0,
    blogPosts: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [experiences, education, blogPosts, products] = await Promise.all([
        supabase.from("experiences").select("id", { count: "exact", head: true }),
        supabase.from("education").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        experiences: experiences.count || 0,
        education: education.count || 0,
        blogPosts: blogPosts.count || 0,
        products: products.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Kinh nghiệm", value: stats.experiences, icon: Briefcase, color: "text-blue-500" },
    { label: "Học vấn", value: stats.education, icon: GraduationCap, color: "text-green-500" },
    { label: "Bài viết", value: stats.blogPosts, icon: FileText, color: "text-purple-500" },
    { label: "Sản phẩm", value: stats.products, icon: ShoppingBag, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Quản lý nội dung website của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Hướng dẫn nhanh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">📝 Chỉnh sửa nội dung</h3>
              <p className="text-sm text-muted-foreground">
                Vào "Nội dung trang" để chỉnh sửa thông tin Hero, About và các phần khác.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">💼 Quản lý kinh nghiệm</h3>
              <p className="text-sm text-muted-foreground">
                Thêm, sửa, xóa các mục kinh nghiệm làm việc trong phần "Kinh nghiệm".
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">📚 Viết blog</h3>
              <p className="text-sm text-muted-foreground">
                Tạo bài viết mới trong phần "Blog" để chia sẻ kiến thức.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">🛍️ Bán khóa học</h3>
              <p className="text-sm text-muted-foreground">
                Thêm sản phẩm/khóa học trong phần "Sản phẩm" để bắt đầu bán.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
