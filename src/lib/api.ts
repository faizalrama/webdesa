import axios from 'axios';

// API Base URL - set this in your .env file as VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.11.154:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Potensi {
  id: number;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  location: string;
  created_at: string;
  updated_at: string;
}



export interface Berita {
  id: number;
  title: string;
  content: string;
  summary: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface BeritaInput {
  title: string;
  content: string;
  summary: string;
  id:number;
  image_url?: string; // File saat upload, atau string jika edit
}

export interface Struktur {
  id: number;
  name: string;
  position: string;
  photo: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Kontak {
  id: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  maps_embed: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role?: string;
    created_at?: string; // tambahkan ini
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}



// API Functions
export const potensiApi = {
  getAll: (page = 1, limit = 10) => 
    api.get<PaginatedResponse<Potensi>>(`/potensi?page=${page}&limit=${limit}`),
  getById: (id: number) => 
    api.get<Potensi>(`/potensi/${id}`),
  create: (data: Omit<Potensi, 'id' | 'created_at' | 'updated_at'>) => 
    api.post<Potensi>('/potensi', data),
  update: (id: number, data: Partial<Potensi>) => 
    api.put<Potensi>(`/potensi/${id}`, data),
  delete: (id: number) => 
    api.delete(`/potensi/${id}`),
};

export const beritaApi = {
  getAll: (page = 1, limit = 10) =>
    api.get<PaginatedResponse<Berita>>(`/berita/?page=${page}&limit=${limit}`),

  getById: (id: number) =>
    api.get<Berita>(`/berita/${id}/`),

  create: (data: BeritaInput) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("excerpt", data.summary);
    formData.append("content", data.content);
    formData.append("image_url", data.image_url);
    
    // if (data.featured_image instanceof File) {
      //   formData.append("featured_image", data.featured_image);
      // }
      
      return api.post<Berita>("/berita/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    
    update: (id: number, data: BeritaInput) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("excerpt", data.summary);
      formData.append("content", data.content);
      formData.append("image_url", data.image_url);

    // if (data.featured_image instanceof File) {
    //   formData.append("featured_image", data.featured_image);
    // } else if (typeof data.featured_image === "string") {
    //   formData.append("featured_image", data.featured_image);
    // }

    return api.put<Berita>(`/berita/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  delete: (id: number) =>
    api.delete(`/berita/${id}/`),
};

export const strukturApi = {
  getAll: () => 
    api.get<Struktur[]>('/struktur'),
  create: (data: Omit<Struktur, 'id' | 'created_at' | 'updated_at'>) => 
    api.post<Struktur>('/struktur', data),
  update: (id: number, data: Partial<Struktur>) => 
    api.put<Struktur>(`/struktur/${id}`, data),
  delete: (id: number) => 
    api.delete(`/struktur/${id}`),
};

export const kontakApi = {
  get: () => 
    api.get<Kontak>('/kontak'),
  update: (data: Partial<Kontak>) => 
    api.put<Kontak>('/kontak', data),
};

export const authApi = {
  login: (username: string, password: string) => 
    api.post<AuthResponse>('/auth/login', { username, password }),
  logout: () => 
    api.post('/auth/logout'),
};

export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;