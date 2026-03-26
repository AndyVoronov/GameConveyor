import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';

// GET /api/games — list all games
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const q = searchParams.get('q');

  const where: any = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }

  const games = await prisma.game.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      platforms: {
        include: { platform: true },
      },
    },
  });

  return NextResponse.json(games);
}

// POST /api/games — create game
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, shortDesc, techStack, genre, repoUrl, status } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Название обязательно' }, { status: 400 });
    }

    // Generate unique slug
    let slug = slugify(title);
    const existing = await prisma.game.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const game = await prisma.game.create({
      data: {
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        shortDesc: shortDesc?.trim() || null,
        techStack: techStack?.trim() || null,
        genre: genre?.trim() || null,
        repoUrl: repoUrl?.trim() || null,
        status: status || 'DRAFT',
      },
      include: {
        platforms: {
          include: { platform: true },
        },
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Игра с таким названием уже существует' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Ошибка создания игры' }, { status: 500 });
  }
}
