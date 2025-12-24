# Lake Temple Tracker - Coral Island

Uma aplicação web para acompanhar o progresso dos Santuários do Lake Temple no jogo Coral Island.

## Características

- **4 Altares**: Crop Altar, Catch Altar, Advanced Altar e Rare Altar
- **Controle individual de itens**: Digite a quantidade exata de cada item
- **Persistência de dados**: SQLite para salvar seu progresso
- **Tema cyberpunk roxo**: Design futurista com fonte Orbitron
- **Progresso em tempo real**: Veja seu progresso geral e por altar
- **Input numérico**: Digite a quantidade exata ao invés de botões +/-

## Tecnologias

- **Next.js 13** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **SQLite** (better-sqlite3)
- **Radix UI** (componentes de UI)

## Como usar

1. Instalar dependências:
```bash
npm install
```

2. Rodar o projeto:
```bash
npm run dev
```

3. Abrir no navegador:
```
http://localhost:3000
```

## Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── shrines/          # API para listar santuários
│   │   └── sections/         # API para atualizar progresso
│   ├── layout.tsx
│   └── page.tsx              # Página principal
├── components/
│   ├── ShrineCard.tsx        # Card de cada santuário
│   ├── SectionItem.tsx       # Item de seção com checkbox
│   └── ProgressBar.tsx       # Barra de progresso
├── lib/
│   ├── db.ts                 # Configuração do banco de dados
│   └── seed.ts               # Dados dos santuários
└── data/
    └── coral-island.db       # Banco de dados SQLite
```

## Dados

Os dados foram baseados na [Coral Island Wiki - Lake Temple](https://coralisland.fandom.com/wiki/Lake_Temple).

### Santuários incluídos:

1. **Harvest Shrine** (Roxo pastel)
   - Spring Crops, Summer Crops, Fall Crops, Quality Crops, Flowers, Tree Products

2. **Ocean Shrine** (Azul turquesa pastel)
   - Common Fish, Uncommon Fish, Rare Fish, Crustaceans, Beach Foraging

3. **Catch Shrine** (Rosa pastel)
   - Chicken Products, Cow Products, Sheep Products, Goat Products, Artisan Goods, Honey

4. **Advanced Shrine** (Verde pastel)
   - Gems, Minerals, Cooked Dishes, Foraged Items, Monster Drops

## Funcionalidades

- ✅ Marcar/desmarcar seções como concluídas
- ✅ Visualizar progresso por santuário
- ✅ Visualizar progresso total
- ✅ Persistência automática de dados
- ✅ Design responsivo (mobile e desktop)
- ✅ Animações ao completar seções

## Licença

Este é um projeto pessoal criado para fins educacionais e de acompanhamento de progresso no jogo Coral Island.