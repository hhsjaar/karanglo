import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://desa-karanglo.vercel.app';

    // Fetch dynamic slugs
    const potencies = await prisma.potency.findMany({ select: { slug: true, updatedAt: true } });
    const activities = await prisma.activity.findMany({ select: { slug: true, updatedAt: true } });

    const staticPages = [
        '',
        '/profil',
        '/potensi',
        '/kegiatan',
        '/data-penduduk',
        '/idm',
        '/apb-desa',
        '/layanan',
        '/ppdid',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const potencyPages = potencies.map((p) => ({
        url: `${baseUrl}/potensi/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const activityPages = activities.map((a) => ({
        url: `${baseUrl}/kegiatan/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...potencyPages, ...activityPages];
}
