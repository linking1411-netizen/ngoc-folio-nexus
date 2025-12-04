import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface ContentItem {
  id: string;
  key: string;
  value_en: string | null;
  value_vn: string | null;
}

const contentKeys = [
  { key: "hero_tagline", label: "Hero - Tagline", multiline: false },
  { key: "hero_subtitle", label: "Hero - Phụ đề", multiline: false },
  { key: "hero_intro", label: "Hero - Giới thiệu", multiline: true },
  { key: "about_title", label: "About - Tiêu đề", multiline: false },
  { key: "about_content", label: "About - Nội dung", multiline: true },
  { key: "contact_title", label: "Contact - Tiêu đề", multiline: false },
  { key: "contact_subtitle", label: "Contact - Phụ đề", multiline: false },
  { key: "contact_email", label: "Contact - Email", multiline: false },
  { key: "contact_phone", label: "Contact - Điện thoại", multiline: false },
  { key: "contact_linkedin", label: "Contact - LinkedIn URL", multiline: false },
];

export default function Content() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*");

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      const contentMap: Record<string, ContentItem> = {};
      (data || []).forEach((item) => {
        contentMap[item.key] = item;
      });
      setContent(contentMap);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleChange = (key: string, lang: "en" | "vn", value: string) => {
    setContent((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        key,
        id: prev[key]?.id || "",
        [`value_${lang}`]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    for (const item of contentKeys) {
      const contentItem = content[item.key];
      if (!contentItem) continue;

      if (contentItem.id) {
        await supabase
          .from("site_content")
          .update({
            value_en: contentItem.value_en,
            value_vn: contentItem.value_vn,
          })
          .eq("id", contentItem.id);
      } else {
        await supabase
          .from("site_content")
          .insert({
            key: item.key,
            value_en: contentItem.value_en,
            value_vn: contentItem.value_vn,
          });
      }
    }

    toast({ title: "Đã lưu thành công!" });
    fetchContent();
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Nội dung trang</h1>
          <p className="text-muted-foreground">Chỉnh sửa nội dung hiển thị trên trang chủ</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="btn-gold">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Lưu tất cả
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phần Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentKeys
                .filter((k) => k.key.startsWith("hero_"))
                .map((item) => (
                  <div key={item.key} className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{item.label} (EN)</Label>
                      {item.multiline ? (
                        <Textarea
                          value={content[item.key]?.value_en || ""}
                          onChange={(e) => handleChange(item.key, "en", e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          value={content[item.key]?.value_en || ""}
                          onChange={(e) => handleChange(item.key, "en", e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <Label>{item.label} (VN)</Label>
                      {item.multiline ? (
                        <Textarea
                          value={content[item.key]?.value_vn || ""}
                          onChange={(e) => handleChange(item.key, "vn", e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          value={content[item.key]?.value_vn || ""}
                          onChange={(e) => handleChange(item.key, "vn", e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phần About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentKeys
                .filter((k) => k.key.startsWith("about_"))
                .map((item) => (
                  <div key={item.key} className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{item.label} (EN)</Label>
                      {item.multiline ? (
                        <Textarea
                          value={content[item.key]?.value_en || ""}
                          onChange={(e) => handleChange(item.key, "en", e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          value={content[item.key]?.value_en || ""}
                          onChange={(e) => handleChange(item.key, "en", e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <Label>{item.label} (VN)</Label>
                      {item.multiline ? (
                        <Textarea
                          value={content[item.key]?.value_vn || ""}
                          onChange={(e) => handleChange(item.key, "vn", e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          value={content[item.key]?.value_vn || ""}
                          onChange={(e) => handleChange(item.key, "vn", e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phần Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentKeys
                .filter((k) => k.key.startsWith("contact_"))
                .map((item) => (
                  <div key={item.key} className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{item.label} (EN)</Label>
                      <Input
                        value={content[item.key]?.value_en || ""}
                        onChange={(e) => handleChange(item.key, "en", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{item.label} (VN)</Label>
                      <Input
                        value={content[item.key]?.value_vn || ""}
                        onChange={(e) => handleChange(item.key, "vn", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
