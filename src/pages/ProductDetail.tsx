import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, ShoppingCart, BookOpen, FileText, Package, ShoppingBag, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name_en: string;
  name_vn: string;
  slug: string;
  description_en: string | null;
  description_vn: string | null;
  price: number;
  currency: string;
  image: string | null;
  product_type: string;
  file_url: string | null;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "vn">("vn");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat(language === "vn" ? "vi-VN" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const productTypeIcons: Record<string, React.ReactNode> = {
    course: <BookOpen className="w-4 h-4" />,
    ebook: <FileText className="w-4 h-4" />,
    template: <Package className="w-4 h-4" />,
    other: <ShoppingBag className="w-4 h-4" />,
  };

  const productTypeLabels: Record<string, Record<string, string>> = {
    course: { en: "Course", vn: "Khóa học" },
    ebook: { en: "Ebook", vn: "Ebook" },
    template: { en: "Template", vn: "Template" },
    other: { en: "Other", vn: "Khác" },
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header lang={language} onLanguageChange={setLanguage} />
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-playfair font-bold mb-4">
              {language === "en" ? "Product not found" : "Không tìm thấy sản phẩm"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === "en" 
                ? "The product you're looking for doesn't exist or has been removed." 
                : "Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa."
              }
            </p>
            <Link to="/store">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to Store" : "Quay lại Cửa hàng"}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const name = language === "vn" ? product.name_vn : product.name_en;
  const description = language === "vn" ? product.description_vn : product.description_en;

  return (
    <div className="min-h-screen bg-background">
      <Header lang={language} onLanguageChange={setLanguage} />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <Link to="/store" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en" ? "Back to Store" : "Quay lại Cửa hàng"}
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-video lg:aspect-square rounded-lg overflow-hidden bg-muted">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <Badge variant="outline" className="w-fit flex items-center gap-1 mb-4">
                {productTypeIcons[product.product_type]}
                {productTypeLabels[product.product_type]?.[language] || product.product_type}
              </Badge>

              <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-4">
                {name}
              </h1>

              <div className="text-3xl font-bold text-accent mb-6">
                {formatPrice(product.price, product.currency)}
              </div>

              <div className="prose dark:prose-invert mb-8 flex-grow">
                {description ? (
                  <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                    {description}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    {language === "en" ? "No description available." : "Chưa có mô tả."}
                  </p>
                )}
              </div>

              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6">
                  {product.file_url ? (
                    <a href={product.file_url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full btn-gold" size="lg">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        {language === "en" ? "Access Product" : "Truy cập sản phẩm"}
                      </Button>
                    </a>
                  ) : (
                    <Button className="w-full btn-gold" size="lg">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {language === "en" ? "Buy Now" : "Mua ngay"}
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    {language === "en" 
                      ? "Secure payment • Instant access" 
                      : "Thanh toán an toàn • Truy cập ngay"
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
