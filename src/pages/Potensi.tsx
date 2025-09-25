import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, ArrowRight, Leaf } from 'lucide-react';
import { potensiApi, Potensi as PotensiType } from '@/lib/api';

// Mock data for development
const mockPotensi: PotensiType[] = [
  {
    id: 1,
    title: 'Wisata Alam Puncak Hijau',
    description: 'Destinasi wisata alam dengan pemandangan pegunungan yang menakjubkan dan udara segar. Tempat yang sempurna untuk trekking dan fotografi.',
    excerpt: 'Wisata alam dengan pemandangan pegunungan yang menakjubkan',
    image: '/images/wisata-alam.jpg',
    location: 'Dusun Puncak, RT 02 RW 01',
    created_at: '2024-01-15',
    updated_at: '2024-01-15'
  },
  {
    id: 2,
    title: 'Pertanian Organik Sayuran',
    description: 'Lahan pertanian organik yang menghasilkan berbagai jenis sayuran segar tanpa pestisida. Mendukung program ketahanan pangan desa.',
    excerpt: 'Pertanian organik penghasil sayuran segar dan sehat',
    image: '/images/pertanian-organik.jpg',
    location: 'Dusun Sawah, RT 01 RW 02',
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  },
  {
    id: 3,
    title: 'Kerajinan Bambu Tradisional',
    description: 'Industri rumahan kerajinan bambu yang memproduksi berbagai produk unik seperti tas, hiasan, dan peralatan rumah tangga.',
    excerpt: 'Kerajinan bambu tradisional dengan nilai seni tinggi',
    image: '/images/kerajinan-bambu.jpg',
    location: 'Dusun Kreatif, RT 03 RW 01',
    created_at: '2024-01-05',
    updated_at: '2024-01-05'
  },
  {
    id: 4,
    title: 'Peternakan Ayam Kampung',
    description: 'Peternakan ayam kampung yang menghasilkan telur dan daging berkualitas tinggi dengan sistem pemeliharaan alami.',
    excerpt: 'Peternakan ayam kampung dengan sistem pemeliharaan alami',
    image: '/images/peternakan-ayam.jpg',
    location: 'Dusun Ternak, RT 04 RW 02',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

function PotensiCard({ potensi }: { potensi: PotensiType }) {
  return (
    <Card className="card-hover">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img 
          src={potensi.image} 
          alt={potensi.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <rect x="160" y="85" width="80" height="80" rx="8" fill="#d1d5db"/>
                <text x="200" y="185" text-anchor="middle" fill="#6b7280" font-family="system-ui" font-size="12">${potensi.title}</text>
              </svg>
            `)}`;
          }}
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{potensi.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            <Leaf className="w-3 h-3 mr-1" />
            Potensi
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {potensi.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          {potensi.location}
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/potensi/${potensi.id}`}>
            Lihat Detail
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function PotensiSkeleton() {
  return (
    <Card>
      <Skeleton className="aspect-video rounded-t-lg" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export default function Potensi() {
  const [page, setPage] = useState(1);
  
  // Use React Query for API calls (with fallback to mock data)
  const { data, isLoading, error } = useQuery({
    queryKey: ['potensi', page],
    queryFn: async () => {
      try {
        const response = await potensiApi.getAll(page, 8);
        return response.data;
      } catch (error) {
        // Fallback to mock data if API is not available
        console.log('Using mock data for development');
        return {
          data: mockPotensi,
          total: mockPotensi.length,
          page: 1,
          per_page: 8,
          total_pages: 1
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error && !data) {
    return (
      <div className="min-h-screen">
        <PageHeader 
          title="Potensi Desa" 
          description="Jelajahi berbagai potensi unggulan yang dimiliki desa kami"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Gagal memuat data potensi desa.</p>
            <Button onClick={() => window.location.reload()}>
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Potensi Desa" 
        description="Jelajahi berbagai potensi unggulan yang dimiliki desa kami mulai dari wisata alam, pertanian, kerajinan, hingga peternakan"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PotensiSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.data.map((potensi) => (
                  <PotensiCard key={potensi.id} potensi={potensi} />
                ))}
              </div>

              {/* Pagination (if needed) */}
              {data && data.total_pages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    {Array.from({ length: data.total_pages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={page === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}