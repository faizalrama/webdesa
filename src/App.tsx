import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/hooks/auth";

// Import pages
import Home from "./pages/Home";
import Potensi from "./pages/Potensi";
import Struktur from "./pages/Struktur";
import Kontak from "./pages/Kontak";
import Berita from "./pages/Berita";
import BeritaDetail from "./pages/BeritaDetail";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AdminBerita from "./pages/admin/Berita";
import AdminPotensi from "./pages/admin/Potensi";
import AdminStruktur from "./pages/admin/Struktur";
import AdminKontak from "./pages/admin/Kontak";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/potensi" element={<Potensi />} />
                <Route path="/struktur" element={<Struktur />} />
                <Route path="/kontak" element={<Kontak />} />
                <Route path="/berita" element={<Berita />} />
                <Route path="/berita/:id" element={<BeritaDetail />} />
                <Route path="/potensi/:id" element={<BeritaDetail />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route
  path="/admin/berita"
  element={
    <ProtectedRoute>
      <AdminBerita />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/potensi"
  element={
    <ProtectedRoute>
      <AdminPotensi />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/struktur"
  element={
    <ProtectedRoute>
      <AdminStruktur />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/kontak"
  element={
    <ProtectedRoute>
      <AdminKontak />
    </ProtectedRoute>
  }
/>
               
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
