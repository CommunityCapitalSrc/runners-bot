export type TRunnerStatus = "online" | "offline" | "idle" | "active";

export type TRunnerLabel = {
  id: number;
  name: string;
  type: string;
};

export type TRunnerItem = {
  id: number;
  name: string;
  os: string;
  status: TRunnerStatus;
  busy: false;
  labels: TRunnerLabel[];
};

export type TGetRunnersResponse = {
  total_count: number;
  runners: TRunnerItem[];
};
