import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Leaf, 
  Newspaper, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  MapPin 
} from 'lucide-react';
import { useAuth } from '@/hooks/auth';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Potensi', href: '/admin/potensi', icon: Leaf },
  { name: 'Berita', href: '/admin/berita', icon: Newspaper },
  { name: 'Struktur', href: '/admin/struktur', icon: Users },
  { name: 'Kontak', href: '/admin/kontak', icon: Settings },
];

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Admin Panel</span>
              </Link>
              {title && (
                <>
                  <div className="text-muted-foreground">/</div>
                  <span className="text-muted-foreground">{title}</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden md:flex">
                {user?.username}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Menu Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {adminNavItems.map((item) => (
                  <Button
                    key={item.name}
                    asChild
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};