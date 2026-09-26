import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.siteSetting.upsert({
    where: { key: 'tiktokUrl' },
    update: { value: 'https://www.tiktok.com/@tssports10?_r=1&_t=ZS-99y6lu5Ngs1' },
    create: { key: 'tiktokUrl', value: 'https://www.tiktok.com/@tssports10?_r=1&_t=ZS-99y6lu5Ngs1' }
  });

  await prisma.siteSetting.upsert({
    where: { key: 'instagramUrl' },
    update: { value: 'http://instagram.com/tssports1018?utm_source=qr' },
    create: { key: 'instagramUrl', value: 'http://instagram.com/tssports1018?utm_source=qr' }
  });

  console.log('Settings updated.');

  const leaders = await prisma.leadership.findMany();
  for (const leader of leaders) {
    if (leader.name.toLowerCase().includes('tufail') || leader.name.toLowerCase().includes('kashif')) {
      await prisma.leadership.update({
        where: { id: leader.id },
        data: {
          name: 'Kashif Shinwari',
          bio: leader.bio.replace(/Tufail Shinwari/gi, 'Kashif Shinwari').replace(/Kashif Tufail/gi, 'Kashif Shinwari').replace(/Tufail Kashif/gi, 'Kashif Shinwari')
        }
      });
      console.log('Leader updated:', leader.name);
    }
  }

  const blogs = await prisma.blog.findMany();
  for (const blog of blogs) {
    if (blog.author.toLowerCase().includes('tufail') || blog.author.toLowerCase().includes('kashif')) {
      await prisma.blog.update({
        where: { id: blog.id },
        data: {
          author: 'Kashif Shinwari'
        }
      });
      console.log('Blog author updated:', blog.title);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
