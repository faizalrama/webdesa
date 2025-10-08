import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api, { Berita, Potensi, Struktur, PaginatedResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Users, Newspaper, Leaf, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-village.jpg";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center mb-12 space-y-3">
    <h2 className="text-3xl md:text-4xl font-bold">{children}</h2>
    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
  </div>
);

export default function Home() {
  const { data: beritaData, isLoading: isBeritaLoading } = useQuery<
    PaginatedResponse<Berita>
  >({
    queryKey: ["berita-home"],
    queryFn: () => api.get("/berita?page=1&limit=3"),
  });

  const { data: potensiData, isLoading: isPotensiLoading } = useQuery<
    PaginatedResponse<Potensi>
  >({
    queryKey: ["potensi-home"],
    queryFn: () => api.get("/potensi?page=1&limit=3"),
  });

  const { data: strukturData, isLoading: isStrukturLoading } = useQuery<
    PaginatedResponse<Struktur>
  >({
    queryKey: ["struktur-home"],
    queryFn: () => api.get("/struktur?page=1&limit=4"),
  });

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
              Selamat Datang di <span className="text-yellow-200">Desa Makmur</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Membangun masa depan yang berkelanjutan bersama masyarakat desa yang
              maju, mandiri, dan sejahtera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                <Link to="/potensi">
                  <Leaf className="w-5 h-5 mr-2" />
                  Jelajahi Potensi Desa
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/kontak">
                  Hubungi Kami
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>Berita Terbaru</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isBeritaLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-40 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full mt-1" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-32" />
                    </CardFooter>
                  </Card>
                ))
              : beritaData?.data.map((berita) => (
                  <Card key={berita.id} className="card-hover">
                    <CardHeader className="p-0">
                      <img
                        src={berita.image_url}
                        alt={berita.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="pt-6">
                      <CardTitle className="line-clamp-2">
                        {berita.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {berita.summary}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="secondary" className="w-full">
                        <Link to={`/berita/${berita.id}`}>
                          Baca Selengkapnya
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Potensi Unggulan Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <SectionTitle>Potensi Unggulan</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isPotensiLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-40 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-6 w-3/4" />
                    </CardContent>
                  </Card>
                ))
              : potensiData?.data.map((potensi) => (
                  <Card key={potensi.id} className="card-hover">
                    <CardHeader className="p-0 relative">
                      <img
                        src={potensi.image_url}
                        alt={potensi.title}
                        className="w-full h-56 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
                      <CardTitle className="absolute bottom-4 left-4 text-white text-2xl">
                        {potensi.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Aparatur Desa Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>Aparatur Desa</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {isStrukturLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-3">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))
              : strukturData?.data.map((anggota) => (
                  <div
                    key={anggota.id}
                    className="text-center flex flex-col items-center space-y-2"
                  >
                    <Avatar className="w-24 h-24 border-4 border-primary/20">
                      <AvatarImage src={anggota.photo_url} alt={anggota.name} />
                      <AvatarFallback>{anggota.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{anggota.name}</h3>
                    <p className="text-sm text-primary">{anggota.position}</p>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}