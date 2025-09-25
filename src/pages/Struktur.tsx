import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail } from 'lucide-react';
import { strukturApi, Struktur as StrukturType } from '@/lib/api';

// Mock data for development
const mockStruktur: StrukturType[] = [
  {
    id: 1,
    name: 'H. Ahmad Sudirman',
    position: 'Kepala Desa',
    photo: '/images/kepala-desa.jpg',
    order: 1,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 2,
    name: 'Siti Aminah, S.Sos',
    position: 'Sekretaris Desa',
    photo: '/images/sekretaris.jpg',
    order: 2,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 3,
    name: 'Budi Santoso',
    position: 'Bendahara Desa',
    photo: '/images/bendahara.jpg',
    order: 3,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 4,
    name: 'Dewi Sartika',
    position: 'Kaur Pemerintahan',
    photo: '/images/kaur-pemerintahan.jpg',
    order: 4,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 5,
    name: 'Muhammad Rizki',
    position: 'Kaur Pembangunan',
    photo: '/images/kaur-pembangunan.jpg',
    order: 5,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 6,
    name: 'Fatimah Zahra',
    position: 'Kaur Kesejahteraan',
    photo: '/images/kaur-kesejahteraan.jpg',
    order: 6,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

function StrukturCard({ struktur }: { struktur: StrukturType }) {
  return (
    <Card className="card-hover text-center">
      <CardHeader>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
          <img 
            src={struktur.photo} 
            alt={struktur.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#f3f4f6"/>
                  <circle cx="48" cy="35" r="12" fill="#d1d5db"/>
                  <path d="M20 80 Q20 65 48 65 Q76 65 76 80" fill="#d1d5db"/>
                </svg>
              `)}`;
            }}
          />
        </div>
        <CardTitle className="text-lg">{struktur.name}</CardTitle>
        <CardDescription>
          <Badge variant="secondary" className="mt-2">
            {struktur.position}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            <Phone className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            <Mail className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StrukturSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Struktur() {
  // Use React Query for API calls (with fallback to mock data)
  const { data: strukturData, isLoading, error } = useQuery({
    queryKey: ['struktur'],
    queryFn: async () => {
      try {
        const response = await strukturApi.getAll();
        return response.data;
      } catch (error) {
        // Fallback to mock data if API is not available
        console.log('Using mock data for development');
        return mockStruktur;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  if (error && !strukturData) {
    return (
      <div className="min-h-screen">
        <PageHeader 
          title="Struktur Organisasi Desa" 
          description="Mengenal perangkat desa yang berkomitmen melayani masyarakat"
        />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Gagal memuat data struktur desa.</p>
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
        title="Struktur Organisasi Desa" 
        description="Mengenal perangkat desa yang berkomitmen melayani masyarakat dengan dedikasi tinggi untuk kemajuan dan kesejahteraan bersama"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <StrukturSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strukturData?.map((struktur) => (
                <StrukturCard key={struktur.id} struktur={struktur} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Organization Chart Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bagan Organisasi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Struktur organisasi pemerintahan Desa Makmur yang solid dan professional 
              dalam menjalankan tugas pelayanan kepada masyarakat.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="text-center space-y-8">
                {/* Kepala Desa */}
                <div className="space-y-2">
                  <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold">Kepala Desa</h3>
                  <p className="text-sm text-muted-foreground">H. Ahmad Sudirman</p>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-border mx-auto"></div>

                {/* Level 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h4 className="font-medium">Sekretaris Desa</h4>
                    <p className="text-sm text-muted-foreground">Siti Aminah, S.Sos</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h4 className="font-medium">Bendahara Desa</h4>
                    <p className="text-sm text-muted-foreground">Budi Santoso</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-border mx-auto"></div>

                {/* Level 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <h5 className="text-sm font-medium">Kaur Pemerintahan</h5>
                    <p className="text-xs text-muted-foreground">Dewi Sartika</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <h5 className="text-sm font-medium">Kaur Pembangunan</h5>
                    <p className="text-xs text-muted-foreground">Muhammad Rizki</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <h5 className="text-sm font-medium">Kaur Kesejahteraan</h5>
                    <p className="text-xs text-muted-foreground">Fatimah Zahra</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}