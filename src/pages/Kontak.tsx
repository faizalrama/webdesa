import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Phone, Mail, Globe, Clock, Users } from 'lucide-react';
import { kontakApi, Kontak as KontakType } from '@/lib/api';

// Mock data for development
const mockKontak: KontakType = {
  id: 1,
  address: 'Jl. Desa Makmur No. 123, RT 01 RW 01, Kecamatan Sejahtera, Kabupaten Maju, Provinsi Sentosa 12345',
  phone: '+62 123 456 789',
  email: 'info@desamakmur.go.id',
  website: 'www.desamakmur.go.id',
  maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4691.7708895224905!2d122.85521131485142!3d-5.611909575547258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2da4173dd8e95545%3A0x747f049d478cf9d7!2sWabula%20Satu!5e0!3m2!1sid!2sid!4v1759142905229!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
  created_at: '2024-01-01',
  updated_at: '2024-01-01'
};

const operationalHours = [
  { day: 'Senin - Kamis', hours: '08:00 - 16:00 WIB' },
  { day: 'Jumat', hours: '08:00 - 11:30 WIB' },
  { day: 'Sabtu - Minggu', hours: 'Tutup' },
];

const services = [
  {
    title: 'Pelayanan Administrasi',
    description: 'Surat keterangan, kartu keluarga, akta kelahiran',
    icon: Users
  },
  {
    title: 'Perizinan Usaha',
    description: 'Surat izin usaha mikro dan kecil',
    icon: Globe
  },
  {
    title: 'Layanan Sosial',
    description: 'Bantuan sosial dan program kemasyarakatan',
    icon: Users
  }
];

export default function Kontak() {
  // Use React Query for API calls (with fallback to mock data)
  const { data: kontakData, isLoading, error } = useQuery({
    queryKey: ['kontak'],
    queryFn: async () => {
      try {
        const response = await kontakApi.get();
        return response.data;
      } catch (error) {
        // Fallback to mock data if API is not available
        console.log('Using mock data for development');
        return mockKontak;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Hubungi Kami" 
        description="Kami siap melayani Anda dengan sepenuh hati. Jangan ragu untuk menghubungi kami untuk berbagai keperluan dan informasi."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Skeleton className="w-5 h-5 mt-1" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Card className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h3 className="font-medium mb-1">Alamat Kantor</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {kontakData?.address}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Phone className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h3 className="font-medium mb-1">Nomor Telepon</h3>
                            <p className="text-sm text-muted-foreground">
                              {kontakData?.phone}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Mail className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h3 className="font-medium mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground">
                              {kontakData?.email}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Globe className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h3 className="font-medium mb-1">Website</h3>
                            <p className="text-sm text-muted-foreground">
                              {kontakData?.website}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Operational Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Jam Operasional
                  </CardTitle>
                  <CardDescription>
                    Waktu pelayanan kantor desa untuk masyarakat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {operationalHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm font-medium">{schedule.day}</span>
                        <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Layanan Tersedia</CardTitle>
                  <CardDescription>
                    Berbagai layanan yang dapat Anda akses di kantor desa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <service.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{service.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Lokasi Kami</h2>
              <Card className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Skeleton className="w-full h-full" />
                    </div>
                  ) : (
                    <iframe
                      src={kontakData?.maps_embed}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi Kantor Desa Makmur"
                      onError={(e) => {
                        // Fallback if embed fails
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-muted">
                              <div class="text-center space-y-2">
                                <div class="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  </svg>
                                </div>
                                <p class="text-sm text-muted-foreground">Peta tidak dapat dimuat</p>
                                <p class="text-xs text-muted-foreground">Silakan gunakan alamat di atas</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Kantor Desa Makmur terletak di lokasi yang strategis dan mudah diakses 
                    oleh seluruh warga desa maupun pengunjung dari luar daerah.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}