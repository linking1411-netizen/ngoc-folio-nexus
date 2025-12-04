import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, BookOpen, FileText, Package } from "lucide-react";

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
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "vn">("en");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name_en, name_vn, slug, description_en, description_vn, price, currency, image, product_type")
        .eq("published", true)
        .order("created_at", { ascending: false });

      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      <Header lang={language} onLanguageChange={setLanguage} />

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">
            {language === "en" ? "Store" : "Cửa hàng"}
          </h1>
          <p className="text-muted-foreground mb-12">
            {language === "en" 
              ? "Courses, ebooks, and resources to help you grow" 
              : "Khóa học, ebook và tài liệu giúp bạn phát triển"
            }
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                {language === "en" 
                  ? "No products available yet. Check back soon!" 
                  : "Chưa có sản phẩm. Hãy quay lại sau!"
                }
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-large transition-all hover:-translate-y-1 overflow-hidden group">
                  {product.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={language === "vn" ? product.name_vn : product.name_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {productTypeIcons[product.product_type]}
                        {productTypeLabels[product.product_type]?.[language] || product.product_type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-playfair">
                      {language === "vn" ? product.name_vn : product.name_en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {language === "vn" ? product.description_vn : product.description_en}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-accent">
                        {formatPrice(product.price, product.currency)}
                      </span>
                      <Link to={`/store/${product.slug}`}>
                        <Button className="btn-gold">
                          {language === "en" ? "View" : "Xem"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
