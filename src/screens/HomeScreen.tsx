import { Settings, Menu, ChevronRight } from 'lucide-react';

export default function HomeScreen({ onStartGame }: { onStartGame: (diff: 4 | 6 | 9) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#f8fdf9]">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button className="p-2"><Menu size={24} className="text-gray-700" /></button>
        <span className="font-bold text-lg text-gray-800">猫系数独</span>
        <button className="p-2"><Settings size={24} className="text-gray-700" /></button>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center mt-4">
        <div className="w-32 h-32 rounded-full border-4 border-green-100 overflow-hidden relative shadow-sm">
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Cat" className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-green-400 text-white text-[10px] px-2 py-0.5 rounded-full rotate-12 shadow-sm">喵呜~</div>
        </div>
        <h1 className="text-2xl font-bold mt-4 text-gray-800 tracking-tight">猫系数独</h1>
        <p className="text-gray-500 text-sm mt-2">今天想和哪只小猫玩个数独？</p>
        <p className="text-green-500 text-xs mt-1 font-medium bg-green-50 px-3 py-1 rounded-full">选择你的挑战等级</p>
      </div>

      {/* Levels */}
      <div className="flex flex-col gap-4 px-6 mt-8">
        <LevelCard 
          title="4x4 萌猫级" 
          desc="适合初学者，简单又有趣" 
          color="bg-green-50" 
          iconColor="text-green-500"
          onClick={() => onStartGame(4)}
        />
        <LevelCard 
          title="6x6 顽皮猫级" 
          desc="有点小挑战，需要动动脑筋" 
          color="bg-orange-50" 
          iconColor="text-orange-500"
          onClick={() => onStartGame(6)}
        />
        <LevelCard 
          title="9x9 狮子猫级" 
          desc="数独达人专属，展现你的实力" 
          color="bg-purple-50" 
          iconColor="text-purple-500"
          onClick={() => onStartGame(9)}
        />
      </div>
    </div>
  );
}

function LevelCard({ title, desc, color, iconColor, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between p-4 rounded-2xl ${color} active:scale-95 transition-transform`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${iconColor}`}>
          <span className="font-bold text-lg">{title.split(' ')[0]}</span>
        </div>
        <div className="text-left">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </button>
  );
}
