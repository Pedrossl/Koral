import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const shrineId = params.id;

    const sections = db
      .prepare(
        `
      SELECT
        sec.id,
        sec.name,
        sec.image_url,
        sec.order_index,
        cs.completed,
        cs.completed_at
      FROM sections sec
      LEFT JOIN completion_status cs ON sec.id = cs.section_id
      WHERE sec.shrine_id = ?
      ORDER BY sec.order_index
    `
      )
      .all(shrineId);

    // Buscar itens para cada seção
    const sectionsWithItems = sections.map((section: any) => {
      const items = db
        .prepare(
          `
        SELECT
          si.id,
          si.item_name,
          si.quantity,
          si.image_url,
          COALESCE(ics.completed_quantity, 0) as completed_quantity
        FROM section_items si
        LEFT JOIN item_completion_status ics ON si.id = ics.item_id
        WHERE si.section_id = ?
      `
        )
        .all(section.id);

      return {
        ...section,
        items,
        completed: Boolean(section.completed),
      };
    });

    return NextResponse.json(sectionsWithItems);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}
