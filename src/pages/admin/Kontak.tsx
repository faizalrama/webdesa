import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Kontak {
  id: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  maps_embed: string;
}

export default function AdminKontak() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Kontak>>({});

  // Ambil data kontak
  const { data, isLoading } = useQuery<Kontak>({
    queryKey: ["kontak"],
    queryFn: async () => {
      const res = await api.get("/kontak");
      return res.data;
    },
  });

  // Update / Tambah kontak
  const mutation = useMutation({
    mutationFn: async (newData: Partial<Kontak>) => {
      if (newData.id) {
        return api.put(`/kontak/${newData.id}`, newData);
      } else {
        return api.post("/kontak", newData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["kontak"]);
      setOpen(false);
    },
  });

  // Auto set formData kalau data sudah ada
  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kelola Kontak</h1>
        <Button onClick={() => setOpen(true)}>
          {data ? "Edit Kontak" : "Tambah Kontak"}
        </Button>
      </div>

      {/* Tampilkan Kontak */}
      {data ? (
        <div className="border rounded p-4 space-y-2">
          <p><strong>Alamat:</strong> {data.address}</p>
          <p><strong>Telepon:</strong> {data.phone}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Website:</strong> {data.website}</p>
          <p><strong>Maps Embed:</strong></p>
          <div
            className="border rounded overflow-hidden"
            dangerouslySetInnerHTML={{ __html: data.maps_embed }}
          />
        </div>
      ) : (
        <p>Belum ada data kontak.</p>
      )}

      {/* Modal Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData?.id ? "Edit Kontak" : "Tambah Kontak"}</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate(formData);
            }}
          >
            <Input
              placeholder="Alamat"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Input
              placeholder="Telepon"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              placeholder="Email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              placeholder="Website"
              value={formData.website || ""}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <textarea
              className="w-full border rounded p-2"
              placeholder="Embed Google Maps (iframe)"
              value={formData.maps_embed || ""}
              onChange={(e) => setFormData({ ...formData, maps_embed: e.target.value })}
            />
            <Button type="submit">{formData?.id ? "Update" : "Simpan"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
