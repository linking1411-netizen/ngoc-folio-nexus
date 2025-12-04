import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, ShoppingBag } from "lucide-react";

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
  file_url: string | null;
  product_type: string;
  published: boolean;
  created_at: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name_en: "",
    name_vn: "",
    slug: "",
    description_en: "",
    description_vn: "",
    price: 0,
    currency: "VND",
    image: "",
    file_url: "",
    product_type: "course",
    published: false,
  });

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm({
      name_en: "",
      name_vn: "",
      slug: "",
      description_en: "",
      description_vn: "",
      price: 0,
      currency: "VND",
      image: "",
      file_url: "",
      product_type: "course",
      published: false,
    });
    setEditingId(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openEditDialog = (product: Product) => {
    setForm({
      name_en: product.name_en,
      name_vn: product.name_vn,
      slug: product.slug,
      description_en: product.description_en || "",
      description_vn: product.description_vn || "",
      price: product.price,
      currency: product.currency,
      image: product.image || "",
      file_url: product.file_url || "",
      product_type: product.product_type,
      published: product.published,
    });
    setEditingId(product.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      name_en: form.name_en,
      name_vn: form.name_vn,
      slug: form.slug || generateSlug(form.name_en),
      description_en: form.description_en || null,
      description_vn: form.description_vn || null,
      price: form.price,
      currency: form.currency,
      image: form.image || null,
      file_url: form.file_url || null,
      product_type: form.product_type,
      published: form.published,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("products").update(data).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("products").insert(data));
    }

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thành công", description: editingId ? "Đã cập nhật" : "Đã thêm mới" });
      setDialogOpen(false);
      resetForm();
      fetchProducts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Đã xóa" });
      fetchProducts();
    }
  };

  const togglePublish = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({ published: !product.published })
      .eq("id", product.id);

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      fetchProducts();
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const productTypes: Record<string, string> = {
    course: "Khóa học",
    ebook: "Ebook",
    template: "Template",
    other: "Khác",
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Sản phẩm</h1>
          <p className="text-muted-foreground">Quản lý khóa học và tài liệu</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa" : "Thêm"} sản phẩm</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tên sản phẩm (EN)</Label>
                  <Input 
                    value={form.name_en} 
                    onChange={(e) => {
                      setForm({ 
                        ...form, 
                        name_en: e.target.value,
                        slug: !editingId ? generateSlug(e.target.value) : form.slug
                      });
                    }} 
                  />
                </div>
                <div>
                  <Label>Tên sản phẩm (VN)</Label>
                  <Input value={form.name_vn} onChange={(e) => setForm({ ...form, name_vn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Slug (URL)</Label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                </div>
                <div>
                  <Label>Loại sản phẩm</Label>
                  <Select value={form.product_type} onValueChange={(value) => setForm({ ...form, product_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course">Khóa học</SelectItem>
                      <SelectItem value="ebook">Ebook</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giá</Label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label>Loại tiền</Label>
                  <Select value={form.currency} onValueChange={(value) => setForm({ ...form, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VND">VND</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Mô tả (EN)</Label>
                <Textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={3} />
              </div>
              <div>
                <Label>Mô tả (VN)</Label>
                <Textarea value={form.description_vn} onChange={(e) => setForm({ ...form, description_vn: e.target.value })} rows={3} />
              </div>
              <div>
                <Label>Ảnh sản phẩm (URL)</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <Label>Link tải file (URL)</Label>
                <Input value={form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={form.published} onCheckedChange={(checked) => setForm({ ...form, published: checked })} />
                <Label>Hiển thị trên cửa hàng</Label>
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
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              Chưa có sản phẩm nào. Hãy thêm mới!
            </CardContent>
          </Card>
        ) : (
          products.map((product) => (
            <Card key={product.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex gap-4">
                  {product.image && (
                    <img src={product.image} alt={product.name_vn} className="w-16 h-16 object-cover rounded-lg" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{product.name_vn}</CardTitle>
                      <Badge variant={product.published ? "default" : "secondary"}>
                        {product.published ? "Đang bán" : "Ẩn"}
                      </Badge>
                      <Badge variant="outline">{productTypes[product.product_type]}</Badge>
                    </div>
                    <p className="text-lg font-semibold text-accent">{formatPrice(product.price, product.currency)}</p>
                    {product.description_vn && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.description_vn}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(product)}>
                    {product.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-destructive">
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
