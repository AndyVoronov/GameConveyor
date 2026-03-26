import Sidebar from '@/components/layout/Sidebar';
import { Settings } from 'lucide-react';

export default function Page() {
  return (
    <Sidebar>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-500 mt-1">Управление API ключами и интеграциями</p>
        <div className="bg-white rounded-xl border border-gray-200 p-12 mt-8 text-center">
          <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Модуль настроек</h3>
          <p className="text-gray-500">
            Здесь будут API ключи для площадок, вебхуки и настройки интеграций.
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
