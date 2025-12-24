import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'coral-island.db');
const db = new Database(dbPath);

// Criar tabelas se não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS shrines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shrine_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    image_url TEXT,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (shrine_id) REFERENCES shrines(id)
  );

  CREATE TABLE IF NOT EXISTS section_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    image_url TEXT,
    FOREIGN KEY (section_id) REFERENCES sections(id)
  );

  CREATE TABLE IF NOT EXISTS completion_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER NOT NULL UNIQUE,
    completed BOOLEAN NOT NULL DEFAULT 0,
    completed_at TEXT,
    FOREIGN KEY (section_id) REFERENCES sections(id)
  );

  CREATE TABLE IF NOT EXISTS item_completion_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    completed_quantity INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (item_id) REFERENCES section_items(id)
  );
`);

export default db;
