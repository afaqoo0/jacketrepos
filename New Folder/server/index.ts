import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'tssports_secret_jwt_key_2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Auth Middleware
export interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'TS Sports Express API', timestamp: new Date().toISOString() });
});

// ==========================================
// AUTH ROUTE
// ==========================================
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// ==========================================
// PRODUCTS ROUTES
// ==========================================
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', authenticateToken, async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        SKU: productData.SKU,
        description: productData.description || '',
        shortDescription: productData.shortDescription || '',
        price: productData.price ? parseFloat(productData.price) : null,
        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
        status: productData.status || 'active',
        featured: Boolean(productData.featured),
        category: productData.category || 'Full Length',
        colors: productData.colors || [],
        sizes: productData.sizes || [],
        materialSpecs: productData.materialSpecs || [],
        gripPattern: productData.gripPattern || '',
        images: productData.images || [],
      },
    });
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/products/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: productData.name,
        slug: productData.slug,
        SKU: productData.SKU,
        description: productData.description,
        shortDescription: productData.shortDescription,
        price: productData.price ? parseFloat(productData.price) : null,
        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
        status: productData.status,
        featured: Boolean(productData.featured),
        category: productData.category,
        colors: productData.colors,
        sizes: productData.sizes,
        materialSpecs: productData.materialSpecs,
        gripPattern: productData.gripPattern,
        images: productData.images,
      },
    });
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// BLOGS ROUTES
// ==========================================
app.get('/api/blogs', async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { publishedAt: 'desc' } });
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blogs', authenticateToken, async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.create({ data: req.body });
    res.status(201).json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/blogs/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/blogs/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// SHOWROOMS ROUTES
// ==========================================
app.get('/api/showrooms', async (req: Request, res: Response) => {
  try {
    const showrooms = await prisma.showroom.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(showrooms);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/showrooms', authenticateToken, async (req: Request, res: Response) => {
  try {
    const showroom = await prisma.showroom.create({ data: req.body });
    res.status(201).json(showroom);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/showrooms/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const showroom = await prisma.showroom.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(showroom);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/showrooms/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.showroom.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// LEADERSHIP ROUTES
// ==========================================
app.get('/api/leadership', async (req: Request, res: Response) => {
  try {
    const leaders = await prisma.leadership.findMany({ orderBy: { displayOrder: 'asc' } });
    res.json(leaders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/leadership', authenticateToken, async (req: Request, res: Response) => {
  try {
    const leader = await prisma.leadership.create({ data: req.body });
    res.status(201).json(leader);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/leadership/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const leader = await prisma.leadership.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(leader);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/leadership/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.leadership.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// SUPPLIERS ROUTES
// ==========================================
app.get('/api/suppliers', async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany({ orderBy: { name: 'asc' } });
    res.json(suppliers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/suppliers', authenticateToken, async (req: Request, res: Response) => {
  try {
    const supplier = await prisma.supplier.create({ data: req.body });
    res.status(201).json(supplier);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/suppliers/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const supplier = await prisma.supplier.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(supplier);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/suppliers/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.supplier.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// INQUIRIES ROUTES
// ==========================================
app.get('/api/inquiries', authenticateToken, async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const inquiry = await prisma.inquiry.create({ data: req.body });
    res.status(201).json(inquiry);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/inquiries/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(inquiry);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/inquiries/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.inquiry.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// SITE SETTINGS ROUTES
// ==========================================
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsObj: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings', authenticateToken, async (req: Request, res: Response) => {
  try {
    const settingsData = req.body;
    for (const [key, value] of Object.entries(settingsData)) {
      if (typeof value === 'string') {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    const updatedSettings = await prisma.siteSetting.findMany();
    const settingsObj: Record<string, string> = {};
    updatedSettings.forEach((s) => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// FILE UPLOAD ROUTE (Cloudinary Integration)
// ==========================================
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post('/api/upload', async (req: Request, res: Response) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 payload is required' });
    }
    
    // Upload base64 image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: 'tssports',
      public_id: filename ? filename.split('.')[0] : undefined,
    });
    
    res.json({ url: uploadResponse.secure_url, publicUrl: uploadResponse.secure_url });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: error.message || 'Image upload failed' });
  }
});

// Start Express Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 TS Sports Express Backend running on http://localhost:${PORT}`);
  });
}

export default app;
