export type TRunnerLabel = {
  id: number;
  name: string;
  type: string;
};

export type TRunnerItem = {
  id: number;
  name: string;
  os: string;
  status: "online" | "offline" | "idle" | "active";
  busy: false;
  labels: TRunnerLabel[];
};

export type TGetRunnersResponse = {
  total_count: number;
  runners: TRunnerItem[];
};
