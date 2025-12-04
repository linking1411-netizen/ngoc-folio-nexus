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

interface Experience {
  id: string;
  role_en: string;
  role_vn: string;
  company: string;
  period: string;
  description_en: string[];
  description_vn: string[];
  sort_order: number;
}

export default function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    role_en: "",
    role_vn: "",
    company: "",
    period: "",
    description_en: "",
    description_vn: "",
    sort_order: 0,
  });

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      setExperiences(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const resetForm = () => {
    setForm({
      role_en: "",
      role_vn: "",
      company: "",
      period: "",
      description_en: "",
      description_vn: "",
      sort_order: 0,
    });
    setEditingId(null);
  };

  const openEditDialog = (exp: Experience) => {
    setForm({
      role_en: exp.role_en,
      role_vn: exp.role_vn,
      company: exp.company,
      period: exp.period,
      description_en: exp.description_en?.join("\n") || "",
      description_vn: exp.description_vn?.join("\n") || "",
      sort_order: exp.sort_order,
    });
    setEditingId(exp.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      role_en: form.role_en,
      role_vn: form.role_vn,
      company: form.company,
      period: form.period,
      description_en: form.description_en.split("\n").filter(Boolean),
      description_vn: form.description_vn.split("\n").filter(Boolean),
      sort_order: form.sort_order,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("experiences").update(data).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("experiences").insert(data));
    }

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thành công", description: editingId ? "Đã cập nhật" : "Đã thêm mới" });
      setDialogOpen(false);
      resetForm();
      fetchExperiences();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;

    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Đã xóa" });
      fetchExperiences();
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Kinh nghiệm</h1>
          <p className="text-muted-foreground">Quản lý các mục kinh nghiệm làm việc</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa" : "Thêm mới"} kinh nghiệm</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vị trí (EN)</Label>
                  <Input value={form.role_en} onChange={(e) => setForm({ ...form, role_en: e.target.value })} />
                </div>
                <div>
                  <Label>Vị trí (VN)</Label>
                  <Input value={form.role_vn} onChange={(e) => setForm({ ...form, role_vn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Công ty</Label>
                  <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <Label>Thời gian</Label>
                  <Input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="07/2025 - Present" />
                </div>
              </div>
              <div>
                <Label>Mô tả (EN) - mỗi dòng là 1 điểm</Label>
                <Textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={4} />
              </div>
              <div>
                <Label>Mô tả (VN) - mỗi dòng là 1 điểm</Label>
                <Textarea value={form.description_vn} onChange={(e) => setForm({ ...form, description_vn: e.target.value })} rows={4} />
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
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Chưa có kinh nghiệm nào. Hãy thêm mới!
            </CardContent>
          </Card>
        ) : (
          experiences.map((exp) => (
            <Card key={exp.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{exp.role_vn}</CardTitle>
                  <p className="text-muted-foreground">{exp.company} • {exp.period}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(exp)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {exp.description_vn && exp.description_vn.length > 0 && (
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {exp.description_vn.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
