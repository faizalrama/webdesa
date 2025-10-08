import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Struktur, PaginatedResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminStruktur() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Struktur>>({});

  const { data, isLoading } = useQuery<PaginatedResponse<Struktur>>({
    queryKey: ["struktur"],
    queryFn: async () => {
      const res = await api.get("/struktur?page=1&limit=10");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newData: Partial<Struktur>) => {
      if (newData.id) {
        return api.put(`/struktur/${newData.id}`, newData);
      } else {
        return api.post("/struktur", newData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["struktur"] });
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/struktur/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["struktur"] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Kelola Struktur Organisasi</CardTitle>
            <CardDescription>
              Tambah, edit, atau hapus data anggota.
            </CardDescription>
          </div>
          <Button onClick={() => { setFormData({}); setOpen(true); }}>
            Tambah Anggota
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={item.photo_url} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setFormData(item); setOpen(true); }}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {formData?.id ? "Edit Anggota" : "Tambah Anggota"}
            </DialogTitle>
            <DialogDescription>
              Isi detail anggota di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama
              </Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Jabatan
              </Label>
              <Input
                id="position"
                value={formData.position || ""}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="photo_url" className="text-right">
                URL Foto
              </Label>
              <Input
                id="photo_url"
                value={formData.photo_url || ""}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {formData?.id ? "Simpan Perubahan" : "Buat Anggota"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
