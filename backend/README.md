# Backend - Website Profil Desa (Flask)

## Setup lokal

1. Buat venv & install:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

2. Copy .env.example ke .env dan atur variabel.
3. Inisialisasi DB & migrasi:

```bash
flask db init
flask db migrate -m "init"
flask db upgrade
```

4. Jalankan server:

```bash
python app.py
```

## Catatan

* Auth: server mengeluarkan JWT. Untuk production, gunakan httpOnly cookie (set-cookie) agar token tidak diakses via JS.
* Upload: development menyimpan di folder `uploads/`. Untuk production, gunakan S3/Cloudinary.