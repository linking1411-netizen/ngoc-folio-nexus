import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title_en: string;
  title_vn: string;
  slug: string;
  excerpt_en: string | null;
  excerpt_vn: string | null;
  content_en: string | null;
  content_vn: string | null;
  cover_image: string | null;
  published_at: string | null;
}

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "vn">("vn");

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (date: string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(language === "vn" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header lang={language} onLanguageChange={setLanguage} />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header lang={language} onLanguageChange={setLanguage} />
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-playfair font-bold mb-4">
              {language === "en" ? "Post not found" : "Không tìm thấy bài viết"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === "en" 
                ? "The article you're looking for doesn't exist or has been removed." 
                : "Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa."
              }
            </p>
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to Blog" : "Quay lại Blog"}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const title = language === "vn" ? post.title_vn : post.title_en;
  const content = language === "vn" ? post.content_vn : post.content_en;

  return (
    <div className="min-h-screen bg-background">
      <Header lang={language} onLanguageChange={setLanguage} />
      
      <main className="pt-24 pb-16">
        {post.cover_image && (
          <div className="w-full h-64 sm:h-96 overflow-hidden">
            <img 
              src={post.cover_image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <article className="container mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en" ? "Back to Blog" : "Quay lại Blog"}
          </Link>

          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(post.published_at)}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-8 leading-tight">
            {title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content ? (
              <div 
                className="whitespace-pre-wrap leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <p className="text-muted-foreground italic">
                {language === "en" ? "No content available." : "Chưa có nội dung."}
              </p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
