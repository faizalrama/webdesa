import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Calendar, User, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

// Mock data untuk berita
const mockBerita = [
  {
    id: 1,
    title: 'Program Bantuan Sosial untuk Warga Kurang Mampu',
    excerpt: 'Pemerintah desa meluncurkan program bantuan sosial berupa sembako untuk membantu warga kurang mampu menghadapi situasi ekonomi yang sulit.',
    content: 'Program bantuan sosial ini merupakan inisiatif dari pemerintah desa untuk membantu warga yang terdampak ekonomi...',
    featured_image: '/api/placeholder/400/240',
    author: 'Admin Desa',
    published_at: '2024-01-15',
    category: 'Sosial',
    status: 'published'
  },
  {
    id: 2,
    title: 'Gotong Royong Pembersihan Lingkungan Desa',
    excerpt: 'Kegiatan gotong royong pembersihan lingkungan dilaksanakan setiap minggu untuk menjaga kebersihan dan keindahan desa.',
    content: 'Dalam rangka menjaga kebersihan dan keindahan desa, warga bergotong royong membersihkan lingkungan...',
    featured_image: '/api/placeholder/400/240',
    author: 'Sekretaris Desa',
    published_at: '2024-01-12',
    category: 'Lingkungan',
    status: 'published'
  },
  {
    id: 3,
    title: 'Pelatihan Keterampilan untuk Ibu-ibu PKK',
    excerpt: 'Dinas terkait mengadakan pelatihan keterampilan membuat kerajinan tangan untuk meningkatkan ekonomi kreatif di desa.',
    content: 'Pelatihan ini bertujuan untuk meningkatkan keterampilan ibu-ibu PKK dalam bidang kerajinan tangan...',
    featured_image: '/api/placeholder/400/240',
    author: 'Ketua PKK',
    published_at: '2024-01-10',
    category: 'Pelatihan',
    status: 'published'
  }
];

export default function Berita() {
  const { data: berita, isLoading } = useQuery({
    queryKey: ['berita'],
    queryFn: async () => {
      try {
        const response = await api.get('/berita');
        return response.data;
      } catch (error) {
        // Fallback ke mock data jika API tidak tersedia
        console.log('Using mock data for berita');
        return mockBerita;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <PageHeader
          title="Berita Desa"
          description="Informasi terbaru dan kegiatan desa"
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <PageHeader
        title="Berita Desa"
        description="Informasi terbaru dan kegiatan desa"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {berita?.map((item: any) => (
            <Card key={item.id} className="card-hover overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.featured_image || '/api/placeholder/400/240'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.published_at).toLocaleDateString('id-ID')}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    {item.author}
                  </div>
                  <Button asChild size="sm" variant="ghost" className="group/btn">
                    <Link to={`/berita/${item.id}`}>
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!berita || berita.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada berita yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </div>
  );
}