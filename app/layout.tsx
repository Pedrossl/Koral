import './globals.css';
import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Lake Temple Tracker - Coral Island',
  description: 'Acompanhe seu progresso nos Santuários do Lake Temple de Coral Island',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>{children}</body>
    </html>
  );
}
