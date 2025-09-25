import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Newspaper, Leaf, ArrowRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-village.jpg';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Selamat Datang di{' '}
              <span className="text-yellow-200">Desa Makmur</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Membangun masa depan yang berkelanjutan bersama masyarakat desa yang maju,
              mandiri, dan sejahtera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                <Link to="/potensi">
                  <Leaf className="w-5 h-5 mr-2" />
                  Jelajahi Potensi Desa
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/kontak">
                  Hubungi Kami
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">1,250</div>
              <div className="text-sm text-muted-foreground">Jumlah Penduduk</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Potensi Unggulan</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Program Aktif</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">25</div>
              <div className="text-sm text-muted-foreground">UMKM Berkembang</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Kenali Desa Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan berbagai informasi penting tentang desa kami mulai dari potensi,
              struktur pemerintahan, hingga berita terkini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Leaf className="w-6 h-6" />
                </div>
                <CardTitle>Potensi Desa</CardTitle>
                <CardDescription>
                  Jelajahi kekayaan alam dan budaya yang menjadi keunggulan desa kami.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/potensi">
                    Lihat Potensi
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Struktur Desa</CardTitle>
                <CardDescription>
                  Kenali perangkat desa yang melayani dan memimpin pembangunan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/struktur">
                    Lihat Struktur
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Newspaper className="w-6 h-6" />
                </div>
                <CardTitle>Berita Desa</CardTitle>
                <CardDescription>
                  Dapatkan informasi terbaru tentang kegiatan dan program desa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/berita">
                    Baca Berita
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <CardTitle>Kontak</CardTitle>
                <CardDescription>
                  Hubungi kami untuk informasi lebih lanjut atau layanan desa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/kontak">
                    Hubungi Kami
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Visi & Misi Desa</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="card-gradient">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-center">Visi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    "Mewujudkan Desa Makmur sebagai desa yang maju, mandiri, 
                    dan berkelanjutan dengan mengoptimalkan potensi lokal untuk 
                    kesejahteraan masyarakat."
                  </p>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-lg flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-center">Misi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Mengembangkan potensi ekonomi berbasis kearifan lokal</li>
                    <li>• Meningkatkan kualitas pelayanan publik</li>
                    <li>• Memperkuat gotong royong dan partisipasi masyarakat</li>
                    <li>• Melestarikan lingkungan untuk generasi mendatang</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}