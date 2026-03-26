import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/game-platforms — add game to platform
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, platformId } = body;

    if (!gameId || !platformId) {
      return NextResponse.json(
        { error: 'gameId and platformId required' },
        { status: 400 }
      );
    }

    const gamePlatform = await prisma.gamePlatform.create({
      data: { gameId, platformId },
      include: { game: true, platform: true },
    });

    return NextResponse.json(gamePlatform, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Игра уже добавлена на эту площадку' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Ошибка добавления' },
      { status: 500 }
    );
  }
}

// PATCH /api/game-platforms — update placement status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, externalId, externalUrl, adEnabled, adConfig, complianceChecked, complianceNotes } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (externalId !== undefined) updateData.externalId = externalId;
    if (externalUrl !== undefined) updateData.externalUrl = externalUrl;
    if (adEnabled !== undefined) updateData.adEnabled = adEnabled;
    if (adConfig !== undefined) updateData.adConfig = adConfig;
    if (complianceChecked !== undefined) {
      updateData.complianceChecked = complianceChecked;
      if (complianceChecked) updateData.complianceCheckedAt = new Date();
    }
    if (complianceNotes !== undefined) updateData.complianceNotes = complianceNotes;

    // Auto-set timestamps based on status
    if (status === 'PENDING_REVIEW') updateData.submittedAt = new Date();
    if (status === 'PUBLISHED') updateData.publishedAt = new Date();

    const gamePlatform = await prisma.gamePlatform.update({
      where: { id },
      data: updateData,
      include: { game: true, platform: true },
    });

    return NextResponse.json(gamePlatform);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Запись не найдена' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 });
  }
}
