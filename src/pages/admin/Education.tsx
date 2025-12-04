import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface EducationItem {
  id: string;
  degree_en: string;
  degree_vn: string;
  school: string;
  period: string;
  description_en: string | null;
  description_vn: string | null;
  sort_order: number;
}

export default function Education() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    degree_en: "",
    degree_vn: "",
    school: "",
    period: "",
    description_en: "",
    description_vn: "",
    sort_order: 0,
  });

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm({
      degree_en: "",
      degree_vn: "",
      school: "",
      period: "",
      description_en: "",
      description_vn: "",
      sort_order: 0,
    });
    setEditingId(null);
  };

  const openEditDialog = (item: EducationItem) => {
    setForm({
      degree_en: item.degree_en,
      degree_vn: item.degree_vn,
      school: item.school,
      period: item.period,
      description_en: item.description_en || "",
      description_vn: item.description_vn || "",
      sort_order: item.sort_order,
    });
    setEditingId(item.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      degree_en: form.degree_en,
      degree_vn: form.degree_vn,
      school: form.school,
      period: form.period,
      description_en: form.description_en || null,
      description_vn: form.description_vn || null,
      sort_order: form.sort_order,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("education").update(data).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("education").insert(data));
    }

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thành công", description: editingId ? "Đã cập nhật" : "Đã thêm mới" });
      setDialogOpen(false);
      resetForm();
      fetchItems();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;

    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Đã xóa" });
      fetchItems();
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Học vấn</h1>
          <p className="text-muted-foreground">Quản lý thông tin học vấn</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa" : "Thêm mới"} học vấn</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Bằng cấp (EN)</Label>
                  <Input value={form.degree_en} onChange={(e) => setForm({ ...form, degree_en: e.target.value })} />
                </div>
                <div>
                  <Label>Bằng cấp (VN)</Label>
                  <Input value={form.degree_vn} onChange={(e) => setForm({ ...form, degree_vn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Trường</Label>
                  <Input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
                </div>
                <div>
                  <Label>Thời gian</Label>
                  <Input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="2020 - 2025" />
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
                <Label>Thứ tự sắp xếp</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
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
        {items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Chưa có thông tin học vấn nào. Hãy thêm mới!
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.degree_vn}</CardTitle>
                  <p className="text-muted-foreground">{item.school} • {item.period}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {item.description_vn && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description_vn}</p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
