import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const leaders = await prisma.leadership.findMany();
  for (const leader of leaders) {
    if (leader.name.toLowerCase().includes('kashif')) {
      await prisma.leadership.update({
        where: { id: leader.id },
        data: {
          name: 'Tufail Shinwari',
          bio: leader.bio.replace(/Kashif Shinwari/gi, 'Tufail Shinwari')
        }
      });
      console.log('Leader updated to Tufail Shinwari');
    }
  }

  const blogs = await prisma.blog.findMany();
  for (const blog of blogs) {
    if (blog.author.toLowerCase().includes('kashif')) {
      await prisma.blog.update({
        where: { id: blog.id },
        data: {
          author: 'Tufail Shinwari'
        }
      });
      console.log('Blog author updated to Tufail Shinwari');
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
