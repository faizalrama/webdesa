import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Leaf, 
  Newspaper, 
  Users, 
  MapPin, 
  TrendingUp, 
  Eye, 
  Plus 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for dashboard statistics
const mockStats = {
  potensi_count: 15,
  berita_count: 8,
  struktur_count: 12,
  monthly_visitors: 1250,
  recent_activities: [
    { type: 'potensi', title: 'Wisata Alam Puncak Hijau', action: 'ditambahkan', date: '2024-01-15' },
    { type: 'berita', title: 'Program Bantuan Sosial', action: 'diterbitkan', date: '2024-01-14' },
    { type: 'struktur', title: 'Data Sekretaris Desa', action: 'diperbarui', date: '2024-01-13' },
  ]
};

const mockChartData = [
  { name: 'Jan', visitors: 800 },
  { name: 'Feb', visitors: 950 },
  { name: 'Mar', visitors: 1100 },
  { name: 'Apr', visitors: 1250 },
  { name: 'May', visitors: 1400 },
  { name: 'Jun', visitors: 1600 },
];

function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  href 
}: {
  title: string;
  value: number;
  description: string;
  icon: any;
  trend?: string;
  href?: string;
}) {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <Badge variant="secondary" className="mt-2">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </Badge>
        )}
        {href && (
          <Button asChild variant="outline" size="sm" className="mt-3 w-full">
            <Link to={href}>
              <Eye className="w-4 h-4 mr-2" />
              Lihat Detail
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'potensi': return <Leaf className="w-4 h-4 text-green-500" />;
      case 'berita': return <Newspaper className="w-4 h-4 text-blue-500" />;
      case 'struktur': return <Users className="w-4 h-4 text-purple-500" />;
      default: return <MapPin className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="mt-1">{getIcon(activity.type)}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{activity.title}</p>
        <p className="text-xs text-muted-foreground">
          {activity.action} • {new Date(activity.date).toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // In real app, fetch dashboard data from API
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockStats;
    },
  });

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Selamat datang di panel administrasi Desa Makmur
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Potensi"
          value={stats?.potensi_count || 0}
          description="Potensi desa terdaftar"
          icon={Leaf}
          trend="+12% bulan ini"
          href="/admin/potensi"
        />
        <StatCard
          title="Total Berita"
          value={stats?.berita_count || 0}
          description="Artikel berita aktif"
          icon={Newspaper}
          trend="+8% bulan ini"
          href="/admin/berita"
        />
        <StatCard
          title="Struktur Desa"
          value={stats?.struktur_count || 0}
          description="Perangkat desa aktif"
          icon={Users}
          href="/admin/struktur"
        />
        <StatCard
          title="Pengunjung Bulanan"
          value={stats?.monthly_visitors || 0}
          description="Kunjungan website"
          icon={TrendingUp}
          trend="+15% bulan ini"
        />
      </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Pengunjung</CardTitle>
            <CardDescription>
              Jumlah pengunjung website dalam 6 bulan terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Perubahan dan penambahan data terbaru
              </CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Tambah
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {stats?.recent_activities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
            <div className="pt-2">
              <Button variant="ghost" size="sm" className="w-full">
                Lihat Semua Aktivitas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-500" />
              Kelola Potensi
            </CardTitle>
            <CardDescription>
              Tambah, edit, atau hapus data potensi desa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/potensi">
                Kelola Potensi
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Newspaper className="w-5 h-5 mr-2 text-blue-500" />
              Kelola Berita
            </CardTitle>
            <CardDescription>
              Tulis dan publikasikan berita desa terbaru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/berita">
                Kelola Berita
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-500" />
              Kelola Struktur
            </CardTitle>
            <CardDescription>
              Update data perangkat dan struktur desa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/admin/struktur">
                Kelola Struktur
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      </AdminLayout>
    );
  }