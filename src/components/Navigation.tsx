import { Gamepad2, Trophy, User } from 'lucide-react';

export default function Navigation({ currentScreen, setCurrentScreen }: any) {
  const navItems = [
    { id: 'home', icon: Gamepad2, label: '开始游戏' },
    { id: 'leaderboard', icon: Trophy, label: '排行榜' },
    { id: 'profile', icon: User, label: '个人中心' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-2 pb-safe z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center p-2 transition-colors ${isActive ? 'text-green-500' : 'text-gray-400'}`}
          >
            <Icon size={24} className={isActive ? 'fill-current opacity-20' : ''} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
