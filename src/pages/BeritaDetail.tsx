import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import api from '@/lib/api';

// Mock data untuk detail berita
const mockBeritaDetail = {
  1: {
    id: 1,
    title: 'Program Bantuan Sosial untuk Warga Kurang Mampu',
    content: `
      <p>Program bantuan sosial ini merupakan inisiatif dari pemerintah desa untuk membantu warga yang terdampak ekonomi. Program ini diluncurkan sebagai bentuk kepedulian terhadap kondisi sosial ekonomi masyarakat desa.</p>
      
      <h3>Kriteria Penerima Bantuan</h3>
      <ul>
        <li>Keluarga dengan penghasilan di bawah garis kemiskinan</li>
        <li>Lansia yang tidak memiliki keluarga</li>
        <li>Penyandang disabilitas</li>
        <li>Janda/duda dengan anak</li>
      </ul>
      
      <h3>Bentuk Bantuan</h3>
      <p>Bantuan yang diberikan berupa:</p>
      <ul>
        <li>Sembako bulanan (beras, minyak, gula, dll)</li>
        <li>Bantuan tunai untuk kebutuhan mendesak</li>
        <li>Akses kesehatan gratis</li>
        <li>Bantuan pendidikan untuk anak</li>
      </ul>
      
      <p>Diharapkan program ini dapat meringankan beban ekonomi warga dan meningkatkan kesejahteraan masyarakat desa secara keseluruhan.</p>
    `,
    featured_image: '/api/placeholder/800/400',
    author: 'Admin Desa',
    published_at: '2024-01-15',
    category: 'Sosial',
    status: 'published'
  },
  2: {
    id: 2,
    title: 'Gotong Royong Pembersihan Lingkungan Desa',
    content: `
      <p>Dalam rangka menjaga kebersihan dan keindahan desa, warga bergotong royong membersihkan lingkungan setiap minggu. Kegiatan ini melibatkan seluruh lapisan masyarakat dari berbagai usia.</p>
      
      <h3>Jadwal Kegiatan</h3>
      <p>Gotong royong dilaksanakan setiap hari Minggu pagi mulai pukul 07.00 WIB di berbagai titik desa:</p>
      <ul>
        <li>Area pasar dan pusat desa</li>
        <li>Jalan-jalan utama</li>
        <li>Area sekitar balai desa</li>
        <li>Tempat ibadah</li>
      </ul>
      
      <h3>Manfaat</h3>
      <p>Kegiatan gotong royong ini memberikan manfaat:</p>
      <ul>
        <li>Lingkungan desa menjadi bersih dan sehat</li>
        <li>Mempererat tali silaturahmi warga</li>
        <li>Meningkatkan kesadaran menjaga lingkungan</li>
        <li>Menciptakan suasana desa yang nyaman</li>
      </ul>
    `,
    featured_image: '/api/placeholder/800/400',
    author: 'Sekretaris Desa',
    published_at: '2024-01-12',
    category: 'Lingkungan',
    status: 'published'
  },
  3: {
    id: 3,
    title: 'Pelatihan Keterampilan untuk Ibu-ibu PKK',
    content: `
      <p>Pelatihan ini bertujuan untuk meningkatkan keterampilan ibu-ibu PKK dalam bidang kerajinan tangan dan wirausaha. Program ini diharapkan dapat membuka peluang usaha baru bagi para peserta.</p>
      
      <h3>Materi Pelatihan</h3>
      <p>Pelatihan mencakup berbagai keterampilan praktis:</p>
      <ul>
        <li>Membuat kerajinan dari bambu</li>
        <li>Pengolahan makanan tradisional</li>
        <li>Menjahit dan bordir</li>
        <li>Manajemen usaha kecil</li>
      </ul>
      
      <h3>Target dan Tujuan</h3>
      <p>Program pelatihan ini memiliki beberapa target:</p>
      <ul>
        <li>Meningkatkan keterampilan praktis ibu-ibu</li>
        <li>Membuka peluang usaha rumahan</li>
        <li>Meningkatkan pendapatan keluarga</li>
        <li>Melestarikan budaya lokal</li>
      </ul>
      
      <p>Peserta yang menyelesaikan pelatihan akan mendapat sertifikat dan bantuan modal usaha untuk memulai bisnis mereka.</p>
    `,
    featured_image: '/api/placeholder/800/400',
    author: 'Ketua PKK',
    published_at: '2024-01-10',
    category: 'Pelatihan',
    status: 'published'
  }
};

export default function BeritaDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: berita, isLoading } = useQuery({
    queryKey: ['berita', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/berita/${id}`);
        return response.data;
      } catch (error) {
        // Fallback ke mock data jika API tidak tersedia
        console.log('Using mock data for berita detail');
        const numericId = parseInt(id || '0');
        return mockBeritaDetail[numericId as keyof typeof mockBeritaDetail];
      }
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Card className="max-w-4xl mx-auto">
            <Skeleton className="h-64 w-full" />
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Berita Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-6">Berita yang Anda cari tidak tersedia.</p>
            <Button asChild>
              <Link to="/berita">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Daftar Berita
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/berita">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Link>
        </Button>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          {/* Featured Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={berita.featured_image || '/api/placeholder/800/400'}
              alt={berita.title}
              className="w-full h-full object-cover"
            />
          </div>

          <CardHeader>
            {/* Category and Date */}
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{berita.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(berita.published_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-1" />
                {berita.author}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight mb-4">{berita.title}</h1>
            
            <Separator />
          </CardHeader>

          <CardContent>
            {/* Content */}
            <div 
              className="prose prose-gray max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: berita.content }}
            />

            <Separator className="my-8" />

            {/* Share and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Bagikan:</span>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>
              </div>
              
              <Button asChild variant="outline">
                <Link to="/berita">
                  Lihat Berita Lainnya
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}