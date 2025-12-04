import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title_en: string;
  title_vn: string;
  slug: string;
  excerpt_en: string | null;
  excerpt_vn: string | null;
  cover_image: string | null;
  published_at: string | null;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "vn">("en");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title_en, title_vn, slug, excerpt_en, excerpt_vn, cover_image, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(language === "vn" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header lang={language} onLanguageChange={setLanguage} />

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">
            {language === "en" ? "Blog" : "Bài viết"}
          </h1>
          <p className="text-muted-foreground mb-12">
            {language === "en" 
              ? "Insights, experiences, and knowledge sharing" 
              : "Chia sẻ kiến thức và kinh nghiệm"
            }
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {language === "en" 
                  ? "No posts yet. Check back soon!" 
                  : "Chưa có bài viết. Hãy quay lại sau!"
                }
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-large transition-all hover:-translate-y-1 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {post.cover_image && (
                        <div className="md:w-1/3">
                          <img 
                            src={post.cover_image} 
                            alt={language === "vn" ? post.title_vn : post.title_en}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={post.cover_image ? "md:w-2/3" : "w-full"}>
                        <CardHeader>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(post.published_at)}
                          </div>
                          <CardTitle className="text-xl sm:text-2xl font-playfair hover:text-accent transition-colors">
                            {language === "vn" ? post.title_vn : post.title_en}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-2 mb-4">
                            {language === "vn" ? post.excerpt_vn : post.excerpt_en}
                          </p>
                          <span className="text-accent font-medium inline-flex items-center group">
                            {language === "en" ? "Read more" : "Đọc thêm"}
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
