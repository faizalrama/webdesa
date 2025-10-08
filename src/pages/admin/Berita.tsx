import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Berita, BeritaInput, PaginatedResponse  } from "@/lib/api"; // pastikan import dari api.ts
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "@/components/ui/dialog";

export default function AdminBerita() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Berita>>({});

 // tipe hasil query
const { data, isLoading } = useQuery<PaginatedResponse<Berita>>({
  queryKey: ["berita"],
  queryFn: async () => {
    const res = await api.get("/berita?page=1&limit=10");
    return res.data; // ini object { data, total, page, pages }
  },
});

  // Tambah / Update
const mutation = useMutation({
  mutationFn: async (newData: Partial<BeritaInput>) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", newData.title || "");
    formDataToSend.append("summary", newData.summary || "");
    formDataToSend.append("content", newData.content || "");

    // kalau hanya URL string
    formDataToSend.append("image_url", newData.image_url || "");

    if (newData.id) {
      return api.put(`/berita/${newData.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      return api.post("/berita", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["berita"] }),
});


  // Hapus
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/berita/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["berita"] }), // ✅ v4
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kelola Berita</h1>
        <Button onClick={() => { setFormData({}); setOpen(true); }}>Tambah Berita</Button>
      </div>

      {/* Tabel Data */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Judul</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
  {data?.data?.map((item) => (
    <tr key={item.id} className="border-b">
      <td className="p-2">{item.title}</td>
      <td className="p-2">
        {item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "-"}
      </td>
      <td className="p-2 space-x-2">
        <Button
          size="sm"
          onClick={() => {
            setFormData(item);
            setOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => deleteMutation.mutate(item.id)}
        >
          Hapus
        </Button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

     {/* Modal Form */}
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {formData?.id ? "Edit Berita" : "Tambah Berita"}
      </DialogTitle>
      <DialogDescription>
        {formData?.id
          ? "Ubah data berita sesuai kebutuhan."
          : "Isi form berikut untuk menambahkan berita baru."}
      </DialogDescription>
    </DialogHeader>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate(formData);
            }}
          >
            <Input
              placeholder="Judul"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="Excerpt"
              value={formData.summary || ""}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
            <textarea
              className="w-full border rounded p-2"
              placeholder="Konten berita"
              value={formData.content || ""}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
<Input
  placeholder="Link Gambar"
  value={formData.image_url || ""}
  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
/>

            <Button type="submit">{formData?.id ? "Update" : "Simpan"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
