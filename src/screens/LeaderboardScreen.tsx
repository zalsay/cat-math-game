import { ChevronLeft } from 'lucide-react';

export default function LeaderboardScreen() {
  return (
    <div className="flex flex-col h-full bg-[#f8fdf9] relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button className="p-2 -ml-2"><ChevronLeft size={24} className="text-gray-700" /></button>
        <span className="font-bold text-lg text-gray-800">排行榜</span>
        <div className="w-10"></div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-2 bg-green-50 rounded-full p-1 shadow-inner">
        <button className="flex-1 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-sm">
          好友排行
        </button>
        <button className="flex-1 py-2 text-gray-500 rounded-full text-sm font-medium">
          世界排行
        </button>
      </div>

      {/* Top 3 */}
      <div className="flex justify-center items-end gap-4 mt-12 mb-8 px-4">
        <TopUser rank={2} name="数学大王" score="128 关" avatar="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=150&q=80" />
        <TopUser rank={1} name="小猫咪" score="156 关" avatar="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=150&q=80" isFirst />
        <TopUser rank={3} name="数独达人" score="115 关" avatar="https://images.unsplash.com/photo-1529778458726-24aa07662d74?w=150&q=80" />
      </div>

      {/* List */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-4 pt-6 pb-24 overflow-y-auto z-10">
        <h3 className="text-xs font-bold text-gray-400 mb-4 ml-2">更多排名</h3>
        <div className="flex flex-col gap-3">
          <RankItem rank={4} name="逻辑小喵" score="98 关" avatar="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&q=80" />
          <RankItem rank={5} name="布丁老师" score="87 关" avatar="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&q=80" />
          <RankItem rank={6} name="快乐解题手" score="76 关" avatar="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=100&q=80" />
          <RankItem rank={7} name="爱吃鱼的猫" score="65 关" avatar="https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=100&q=80" />
        </div>
      </div>

      {/* Current User Sticky Bottom */}
      <div className="absolute bottom-4 left-4 right-4 bg-green-500 rounded-2xl p-4 flex items-center justify-between text-white shadow-lg z-20">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg w-6 text-center">12</span>
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&q=80" alt="Me" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
          <div>
            <div className="font-bold text-sm">我 (小虎)</div>
            <div className="text-[10px] text-green-100 mt-0.5">距离第11名还差 2 关！</div>
          </div>
        </div>
        <div className="font-bold text-xl">42 <span className="text-xs font-normal opacity-80">关</span></div>
      </div>
    </div>
  );
}

function TopUser({ rank, name, score, avatar, isFirst = false }: any) {
  const size = isFirst ? 'w-20 h-20' : 'w-16 h-16';
  const rankColor = isFirst ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-300' : 'bg-orange-300';
  
  return (
    <div className={`flex flex-col items-center ${isFirst ? '-mt-6' : ''}`}>
      <div className="relative">
        <div className={`${size} rounded-full border-4 ${isFirst ? 'border-yellow-400' : 'border-white'} overflow-hidden shadow-md`}>
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${rankColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm`}>
          {isFirst ? 'NO.1' : rank}
        </div>
      </div>
      <div className="font-bold text-gray-800 text-sm mt-3">{name}</div>
      <div className="text-green-500 text-xs font-medium mt-0.5 bg-green-50 px-2 py-0.5 rounded-full">{score}</div>
    </div>
  );
}

function RankItem({ rank, name, score, avatar }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-400 w-6 text-center">{rank}</span>
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
        <span className="font-bold text-gray-700 text-sm">{name}</span>
      </div>
      <span className="font-bold text-green-500 text-sm bg-green-50 px-2 py-1 rounded-lg">{score}</span>
    </div>
  );
}
