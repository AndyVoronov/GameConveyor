import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GameConveyor — Управление игровыми проектами',
  description: 'Панель управления для отслеживания игр на игровых платформах: Яндекс Игры, VK Play и другие',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
