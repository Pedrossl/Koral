import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id;
    const { completed_quantity } = await request.json();

    // Atualizar ou inserir status de conclusão do item
    const existing = db
      .prepare('SELECT id FROM item_completion_status WHERE item_id = ?')
      .get(itemId);

    if (existing) {
      db.prepare(
        `
        UPDATE item_completion_status
        SET completed_quantity = ?
        WHERE item_id = ?
      `
      ).run(completed_quantity, itemId);
    } else {
      db.prepare(
        `
        INSERT INTO item_completion_status (item_id, completed_quantity)
        VALUES (?, ?)
      `
      ).run(itemId, completed_quantity);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
