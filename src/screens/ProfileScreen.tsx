import { Settings, Bell, ChevronRight, Trophy, HelpCircle, HeadphonesIcon } from 'lucide-react';

export default function ProfileScreen() {
  return (
    <div className="flex flex-col h-full bg-[#f8fdf9]">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button className="p-2"><Settings size={24} className="text-gray-700" /></button>
        <span className="font-bold text-lg text-gray-800">个人中心</span>
        <button className="p-2"><Bell size={24} className="text-gray-700" /></button>
      </div>

      {/* Profile Card */}
      <div className="mx-4 mt-2 p-4 bg-white rounded-2xl shadow-sm flex items-center justify-between border border-gray-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full border-2 border-white font-bold shadow-sm">
              LV.12
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800">小虎</h2>
            <p className="text-xs text-green-500 mt-1 flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              <Trophy size={12} /> 已获得 12 枚猫咪奖章
            </p>
          </div>
        </div>
        <button className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full font-medium active:bg-gray-100 transition-colors">
          编辑资料
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-between mx-4 mt-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-50">
        <StatItem label="最高纪录" value="2850" />
        <div className="w-px bg-gray-100"></div>
        <StatItem label="累计完成" value="142次" />
        <div className="w-px bg-gray-100"></div>
        <StatItem label="连续签到" value="7天" />
      </div>

      {/* Menu */}
      <div className="mx-4 mt-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 ml-2">我的功能</h3>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50">
          <MenuItem icon={Trophy} label="我的成就" iconColor="text-orange-500" />
          <MenuItem icon={Settings} label="游戏设置" iconColor="text-blue-500" />
          <MenuItem icon={HelpCircle} label="帮助中心" iconColor="text-purple-500" />
          <MenuItem icon={HeadphonesIcon} label="联系客服" iconColor="text-green-500" border={false} />
        </div>
      </div>
      
      <div className="flex justify-center mt-8 gap-2 opacity-50">
        <div className="w-4 h-4 rounded-full bg-green-200"></div>
        <div className="w-4 h-4 rounded-full bg-green-200"></div>
        <div className="w-4 h-4 rounded-full bg-green-200"></div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className="text-lg font-bold text-green-500 mt-1">{value}</span>
    </div>
  );
}

function MenuItem({ icon: Icon, label, iconColor, border = true }: any) {
  return (
    <button className={`w-full flex items-center justify-between p-4 ${border ? 'border-b border-gray-50' : ''} active:bg-gray-50 transition-colors`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <ChevronRight size={20} className="text-gray-300" />
    </button>
  );
}
