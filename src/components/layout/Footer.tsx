import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Desa Makmur</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Membangun desa yang maju, mandiri, dan berkesinambungan untuk kesejahteraan 
              masyarakat dan pelestarian lingkungan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigasi</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Beranda
              </Link>
              <Link to="/potensi" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Potensi Desa
              </Link>
              <Link to="/struktur" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Struktur Desa
              </Link>
              <Link to="/berita" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Berita
              </Link>
              <Link to="/kontak" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Kontak
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  Jl. Desa Makmur No. 123, Kecamatan Sejahtera
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  +62 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  info@desamakmur.go.id
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Globe className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  www.desamakmur.go.id
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Desa Makmur. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};