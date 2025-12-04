import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";

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
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title_en: "",
    title_vn: "",
    slug: "",
    excerpt_en: "",
    excerpt_vn: "",
    content_en: "",
    content_vn: "",
    cover_image: "",
    published: false,
  });

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm({
      title_en: "",
      title_vn: "",
      slug: "",
      excerpt_en: "",
      excerpt_vn: "",
      content_en: "",
      content_vn: "",
      cover_image: "",
      published: false,
    });
    setEditingId(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openEditDialog = (post: BlogPost) => {
    setForm({
      title_en: post.title_en,
      title_vn: post.title_vn,
      slug: post.slug,
      excerpt_en: post.excerpt_en || "",
      excerpt_vn: post.excerpt_vn || "",
      content_en: post.content_en || "",
      content_vn: post.content_vn || "",
      cover_image: post.cover_image || "",
      published: post.published,
    });
    setEditingId(post.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      title_en: form.title_en,
      title_vn: form.title_vn,
      slug: form.slug || generateSlug(form.title_en),
      excerpt_en: form.excerpt_en || null,
      excerpt_vn: form.excerpt_vn || null,
      content_en: form.content_en || null,
      content_vn: form.content_vn || null,
      cover_image: form.cover_image || null,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("blog_posts").update(data).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(data));
    }

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thành công", description: editingId ? "Đã cập nhật" : "Đã thêm mới" });
      setDialogOpen(false);
      resetForm();
      fetchPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Đã xóa" });
      fetchPosts();
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ 
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null
      })
      .eq("id", post.id);

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      fetchPosts();
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Blog</h1>
          <p className="text-muted-foreground">Quản lý bài viết</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Thêm bài viết
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa" : "Thêm"} bài viết</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tiêu đề (EN)</Label>
                  <Input 
                    value={form.title_en} 
                    onChange={(e) => {
                      setForm({ 
                        ...form, 
                        title_en: e.target.value,
                        slug: !editingId ? generateSlug(e.target.value) : form.slug
                      });
                    }} 
                  />
                </div>
                <div>
                  <Label>Tiêu đề (VN)</Label>
                  <Input value={form.title_vn} onChange={(e) => setForm({ ...form, title_vn: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-blog-post" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tóm tắt (EN)</Label>
                  <Textarea value={form.excerpt_en} onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })} rows={2} />
                </div>
                <div>
                  <Label>Tóm tắt (VN)</Label>
                  <Textarea value={form.excerpt_vn} onChange={(e) => setForm({ ...form, excerpt_vn: e.target.value })} rows={2} />
                </div>
              </div>
              <div>
                <Label>Nội dung (EN)</Label>
                <Textarea value={form.content_en} onChange={(e) => setForm({ ...form, content_en: e.target.value })} rows={6} />
              </div>
              <div>
                <Label>Nội dung (VN)</Label>
                <Textarea value={form.content_vn} onChange={(e) => setForm({ ...form, content_vn: e.target.value })} rows={6} />
              </div>
              <div>
                <Label>Ảnh bìa (URL)</Label>
                <Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={form.published} onCheckedChange={(checked) => setForm({ ...form, published: checked })} />
                <Label>Xuất bản ngay</Label>
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full btn-gold">
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Chưa có bài viết nào. Hãy thêm mới!
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{post.title_vn}</CardTitle>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Đã xuất bản" : "Bản nháp"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">/{post.slug}</p>
                  {post.excerpt_vn && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt_vn}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(post)}>
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(post)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
