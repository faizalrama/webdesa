import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Struktur } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminStruktur() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Struktur>>({});

  // Ambil data struktur
  const { data, isLoading } = useQuery<Struktur[]>({
    queryKey: ["struktur"],
    queryFn: async () => {
      const res = await api.get("/struktur");
      return res.data;
    },
  });

  // Tambah / Update struktur
  const mutation = useMutation({
    mutationFn: async (newData: Partial<Struktur>) => {
      const formDataToSend = new FormData();
      formDataToSend.append("name", newData.name || "");
      formDataToSend.append("position", newData.position || "");
      formDataToSend.append("order", String(newData.order || 0));
      if (newData.photo instanceof File) {
        formDataToSend.append("photo", newData.photo);
      }

      if (newData.id) {
        return api.put(`/struktur/${newData.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        return api.post("/struktur", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["struktur"]);
      setOpen(false);
    },
  });

  // Hapus struktur
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/struktur/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["struktur"]),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kelola Struktur Organisasi</h1>
        <Button onClick={() => { setFormData({}); setOpen(true); }}>Tambah Struktur</Button>
      </div>

      {/* Tabel Data */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Foto</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Jabatan</th>
            <th className="p-2">Urutan</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.position}</td>
              <td className="p-2">{item.order}</td>
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
            <DialogTitle>{formData?.id ? "Edit Struktur" : "Tambah Struktur"}</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate(formData);
            }}
          >
            <Input
              placeholder="Nama"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Jabatan"
              value={formData.position || ""}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Urutan"
              value={formData.order || ""}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            />
            <Input
              type="file"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] as any })}
            />
            <Button type="submit">{formData?.id ? "Update" : "Simpan"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
