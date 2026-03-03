import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Globe, 
  Fan, 
  Battery, 
  Plus, 
  Moon, 
  Sun,
  Monitor,
  Terminal as TerminalIcon,
  LayoutGrid
} from 'lucide-react';
import { CircularGauge } from './components/CircularGauge';
import { UsageGraph } from './components/UsageGraph';
import { ProcessList } from './components/ProcessList';
import { SystemData } from './types';
import { cn } from './utils';

const MOCK_DATA: SystemData = {
  cpu: {
    user: 21,
    system: 20,
    temp: 44,
    cores: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
    processes: [
      { name: 'macOS', value: '4.1%', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=macos' },
      { name: 'Time Machine', value: '0.6%', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=tm' },
      { name: 'Safari', value: '0.3%', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=safari' },
    ]
  },
  memory: {
    pressure: 44,
    used: 61,
    app: '3.7 GB',
    wired: '2.4 GB',
    compressed: '1.2 GB',
    free: '4.7 GB',
    processes: [
      { name: 'macOS', value: '8.8 GB', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=macos' },
      { name: 'Time Machine', value: '4.4 GB', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=tm' },
      { name: 'Safari', value: '2.2 GB', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=safari' },
    ]
  },
  disk: {
    used: 68,
    total: '1.43 TB',
    read: '25 KB/s',
    write: '490 KB/s',
    processes: [
      { name: 'macOS', value: '8.8M', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=macos' },
      { name: 'Time Machine', value: '-', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=tm' },
      { name: 'Safari', value: '-', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=safari' },
    ]
  },
  network: {
    upload: '0 KB/s',
    download: '0 KB/s',
    ping: '22ms',
    ip: '11.22.33.44',
    publicIp: '11.22.33.44',
    processes: [
      { name: 'macOS', value: '8.8 M', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=macos' },
    ]
  },
  sensors: {
    cpuTemp: 44,
    gpuTemp: 88,
    fanSpeed: 22,
    details: [
      { label: '温度', value: '44', unit: '°' },
      { label: '风扇', value: '2,222', unit: '转/分' },
      { label: '电流', value: '2.2', unit: 'A' },
      { label: '功率', value: '2.2', unit: 'W' },
      { label: '电压', value: '2.2', unit: 'V' },
      { label: '频率', value: '2.22', unit: 'GHz' },
      { label: '环境光', value: '22', unit: 'Lux' },
    ]
  },
  battery: {
    level: 44,
    health: 100,
    keyboard: 44,
    processes: [
      { name: 'macOS', value: 'High', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=macos' },
      { name: 'Time Machine', value: 'Normal', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=tm' },
      { name: 'Safari', value: 'Normal', icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=safari' },
    ]
  }
};

const GRAPH_DATA = Array.from({ length: 60 }, () => ({
  top: Math.random() * 50 + 10,
  bottom: -(Math.random() * 50 + 10)
}));

export default function App() {
  const [activeTab, setActiveTab] = useState<'cpu' | 'memory' | 'terminal' | 'disk' | 'network' | 'sensors' | 'battery'>('cpu');
  const [data, setData] = useState<SystemData>(MOCK_DATA);
  const [graphData, setGraphData] = useState(GRAPH_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(prev => {
        const newData = [...prev.slice(1), {
          top: Math.random() * 50 + 10,
          bottom: -(Math.random() * 50 + 10)
        }];
        return newData;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const renderModule = () => {
    switch (activeTab) {
      case 'cpu':
        return (
          <motion.div 
            key="cpu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-bold text-sm">CPU</span>
              <span className="text-white font-mono text-sm">{data.cpu.temp}°</span>
            </div>
            
            <UsageGraph data={graphData} />
            
            <div className="flex justify-between text-[10px] font-medium">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-400">用户</span>
                <span className="text-white ml-2">{data.cpu.user}%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-500" />
                <span className="text-gray-400">系统</span>
                <span className="text-white ml-2">{data.cpu.system}%</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 py-2">
              {data.cpu.cores.map((val, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border border-gray-800 relative flex items-center justify-center">
                    <div 
                      className="absolute inset-0 rounded-full border border-pink-500" 
                      style={{ clipPath: `inset(0 0 ${100 - val}% 0)` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] font-medium border-t border-gray-800 pt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-500" />
                <span className="text-gray-400">能效核心</span>
                <span className="text-white ml-2">50%</span>
              </div>
              <span className="text-white">50%</span>
            </div>
            <div className="flex justify-between text-[10px] font-medium">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-400">性能核心</span>
                <span className="text-white ml-2">50%</span>
              </div>
              <span className="text-white">50%</span>
            </div>

            <ProcessList processes={data.cpu.processes} />

            <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              <span className="text-blue-400">电脑开启时间</span>
              <span className="text-white">13 天 1 小时</span>
            </div>
          </motion.div>
        );
      case 'memory':
        return (
          <motion.div 
            key="memory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center px-4">
              <CircularGauge value={data.memory.pressure} label="PRESSURE" size={120} />
              <CircularGauge value={data.memory.used} label="内存" color="#FF2D55" size={120} />
            </div>

            <div className="space-y-1">
              {[
                { label: 'App 内存', value: data.memory.app, color: 'bg-blue-500' },
                { label: '联动内存', value: data.memory.wired, color: 'bg-pink-500' },
                { label: '已压缩', value: data.memory.compressed, color: 'bg-yellow-500' },
                { label: '可用', value: data.memory.free, color: 'bg-gray-500' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", item.color)} />
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-white font-mono">{item.value}</span>
                </div>
              ))}
            </div>

            <ProcessList processes={data.memory.processes} />
          </motion.div>
        );
      case 'terminal':
        return (
          <motion.div 
            key="terminal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-bold text-sm">所有进程</span>
              <LayoutGrid className="w-4 h-4 text-gray-500" />
            </div>
            <div className="bg-black rounded-lg p-3 font-mono text-xs text-green-400 border border-gray-800 h-48 overflow-y-auto scrollbar-hide">
              <div>$ top -o cpu</div>
              <div className="mt-2 text-gray-400">Processes: 456 total, 2 running, 454 sleeping...</div>
              <div className="mt-1">CPU usage: 12.45% user, 8.22% sys, 79.33% idle</div>
              <div className="mt-2 text-white">PID    COMMAND      %CPU  TIME</div>
              <div className="mt-1">123    WindowServer 8.4   12:44.22</div>
              <div className="mt-1">456    Safari       4.2   05:12.11</div>
              <div className="mt-1">789    Kernel       2.1   99:59.99</div>
              <div className="mt-1 animate-pulse">_</div>
            </div>
            <ProcessList processes={[...data.cpu.processes, ...data.memory.processes]} />
          </motion.div>
        );
      case 'disk':
        return (
          <motion.div 
            key="disk"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-xl border border-gray-800">
              <div className="w-10 h-10 rounded-full border-2 border-gray-800 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-2 border-pink-500" style={{ clipPath: 'inset(0 0 32% 0)' }} />
                <span className="text-xs font-bold text-white">68</span>
              </div>
              <div>
                <div className="text-xs text-gray-400">Macintosh HD</div>
                <div className="text-sm font-bold text-white">{data.disk.total}可用</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-blue-400 text-xs font-medium">网络磁盘</div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">AirPort Disk</span>
                <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-blue-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{data.disk.read}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-pink-500" /> 读
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{data.disk.write}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> 写
                </div>
              </div>
            </div>

            <UsageGraph data={graphData} />

            <ProcessList processes={data.disk.processes} />
          </motion.div>
        );
      case 'network':
        return (
          <motion.div 
            key="network"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{data.network.upload}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-pink-500" /> 上传
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{data.network.download}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> 下载
                </div>
              </div>
            </div>

            <UsageGraph data={graphData} />

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white">Wi-Fi</span>
                </div>
                <span className="text-xs text-gray-400">AirPort 网络</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-400">公共 IP 地址</span>
                <span className="text-sm text-white font-mono">{data.network.publicIp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-400">IP 地址</span>
                <span className="text-sm text-white font-mono">{data.network.ip}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                <div className="flex flex-col">
                  <span className="text-xs text-blue-400 uppercase">PING</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-400">istatmenus.app</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{data.network.ping}</span>
              </div>
            </div>

            <ProcessList processes={data.network.processes} />
          </motion.div>
        );
      case 'sensors':
        return (
          <motion.div 
            key="sensors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center px-2">
              <CircularGauge value={data.sensors.cpuTemp} label="CPU" size={100} subLabel="44°" />
              <CircularGauge value={data.sensors.gpuTemp} label="GPU" color="#FF2D55" size={100} subLabel="88°" />
              <CircularGauge value={data.sensors.fanSpeed} label="FANS" color="#007AFF" size={100} subLabel="22%" />
            </div>

            <div className="space-y-1">
              {data.sensors.details.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                  <div className="flex flex-col">
                    <span className="text-xs text-blue-400">{item.label}</span>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-white font-mono">{item.value}</span>
                    <span className="text-xs text-gray-500">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'battery':
        return (
          <motion.div 
            key="battery"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-center gap-8 px-4">
              <CircularGauge value={data.battery.level} label="电池" size={140} />
              <CircularGauge value={data.battery.health} label="健康" color="#FF2D55" size={140} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-400">键盘</span>
                <span className="text-white font-mono">{data.battery.keyboard}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.battery.keyboard}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="text-blue-400 text-xs font-medium mb-3">使用大量能耗</div>
              <ProcessList processes={data.battery.processes} title="" />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="w-[360px] h-[720px] bg-[#0a0a0a] rounded-[54px] border-[12px] border-[#1a1a1a] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Status Bar */}
        <div className="h-14 flex items-center justify-between px-10 pt-6">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-bold">DND</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase">MEM</span>
            <span className="text-[10px] font-bold text-white">44%</span>
            <Plus className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
          <AnimatePresence mode="wait">
            {renderModule()}
          </AnimatePresence>
        </div>

        {/* macOS Style Dock */}
        <div className="px-4 pb-6">
          <div className="h-16 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/5 flex items-center justify-around px-2 shadow-inner">
            {[
              { id: 'cpu', icon: Activity },
              { id: 'memory', icon: Cpu },
              { id: 'sensors', icon: Fan },
              { id: 'disk', icon: HardDrive },
              { id: 'network', icon: Globe },
              { id: 'battery', icon: Battery },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "relative p-2.5 rounded-xl transition-all duration-300 group",
                  activeTab === tab.id ? "bg-white/10 text-blue-400 -translate-y-1 shadow-lg" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                )}
              >
                <tab.icon className={cn("w-5 h-5 transition-transform", activeTab === tab.id && "scale-110")} />
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="dock-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
