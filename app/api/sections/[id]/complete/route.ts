import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const sectionId = params.id;
    const { completed } = await request.json();

    const completedAt = completed ? new Date().toISOString() : null;

    db.prepare(
      `
      UPDATE completion_status
      SET completed = ?, completed_at = ?
      WHERE section_id = ?
    `
    ).run(completed ? 1 : 0, completedAt, sectionId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}
