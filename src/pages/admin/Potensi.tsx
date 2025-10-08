// src/pages/admin/Potensi.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Potensi } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminPotensi() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Potensi>>({});

  // Ambil data potensi
  const { data, isLoading } = useQuery<Potensi[]>({
    queryKey: ["potensi"],
    queryFn: async () => {
      const res = await api.get("/potensi");
      return res.data;
    },
  });

  // Tambah / Update potensi
  const mutation = useMutation({
    mutationFn: async (newData: Partial<Potensi>) => {
      const formDataToSend = new FormData();
      formDataToSend.append("title", newData.title || "");
      formDataToSend.append("description", newData.description || "");
      formDataToSend.append("excerpt", newData.excerpt || "");
      formDataToSend.append("location", newData.location || "");
      if (newData.image instanceof File) {
        formDataToSend.append("image", newData.image);
      }

      if (newData.id) {
        return api.put(`/potensi/${newData.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        return api.post("/potensi", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["potensi"]);
      setOpen(false);
    },
  });

  // Hapus potensi
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/potensi/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["potensi"]),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kelola Potensi</h1>
        <Button onClick={() => { setFormData({}); setOpen(true); }}>Tambah Potensi</Button>
      </div>

      {/* Tabel Data */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Judul</th>
            <th className="p-2">Lokasi</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.location}</td>
              <td className="p-2">{new Date(item.created_at).toLocaleDateString()}</td>
              <td className="p-2 space-x-2">
                <Button size="sm" onClick={() => { setFormData(item); setOpen(true); }}>Edit</Button>
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
            <DialogTitle>{formData?.id ? "Edit Potensi" : "Tambah Potensi"}</DialogTitle>
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
            <textarea
              className="w-full border rounded p-2"
              placeholder="Deskripsi"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Input
              placeholder="Excerpt"
              value={formData.excerpt || ""}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
            <Input
              placeholder="Lokasi"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] as any })}
            />
            <Button type="submit">{formData?.id ? "Update" : "Simpan"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
