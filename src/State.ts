import { TRunnerItem } from './types'

class StateService {
  runners: TRunnerItem[] | undefined
  private static instance: StateService

  private constructor() {
    this.runners = undefined
  }

  public static getInstance(): StateService {
    if (!StateService.instance) {
      StateService.instance = new StateService()
    }

    return StateService.instance
  }

  get runnersData() {
    return this.runners
  }

  set initialData(runners: TRunnerItem[]) {
    this.runners = runners
  }

  public updateRunnersData(runners: TRunnerItem[]) {
    this.runners = runners
  }
}

export const State = StateService.getInstance()
