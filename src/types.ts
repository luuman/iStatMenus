export interface Process {
  name: string;
  value: string;
  icon: string;
}

export interface SystemData {
  cpu: {
    user: number;
    system: number;
    temp: number;
    cores: number[];
    processes: Process[];
  };
  memory: {
    pressure: number;
    used: number;
    app: string;
    wired: string;
    compressed: string;
    free: string;
    processes: Process[];
  };
  disk: {
    used: number;
    total: string;
    read: string;
    write: string;
    processes: Process[];
  };
  network: {
    upload: string;
    download: string;
    ping: string;
    ip: string;
    publicIp: string;
    processes: Process[];
  };
  sensors: {
    cpuTemp: number;
    gpuTemp: number;
    fanSpeed: number;
    details: { label: string; value: string; unit: string }[];
  };
  battery: {
    level: number;
    health: number;
    keyboard: number;
    processes: Process[];
  };
}
