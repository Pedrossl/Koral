import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

// Inicializar e fazer seed do banco de dados
seedDatabase();

export async function GET() {
  try {
    const shrines = db
      .prepare(
        `
      SELECT
        s.id,
        s.name,
        s.description,
        s.color,
        COUNT(DISTINCT sec.id) as total_sections,
        COUNT(DISTINCT CASE WHEN cs.completed = 1 THEN sec.id END) as completed_sections
      FROM shrines s
      LEFT JOIN sections sec ON s.id = sec.shrine_id
      LEFT JOIN completion_status cs ON sec.id = cs.section_id
      GROUP BY s.id
      ORDER BY s.id
    `
      )
      .all();

    return NextResponse.json(shrines);
  } catch (error) {
    console.error('Error fetching shrines:', error);
    return NextResponse.json({ error: 'Failed to fetch shrines' }, { status: 500 });
  }
}
