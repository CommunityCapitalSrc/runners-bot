import { TRunnerItem } from './types'

class State {
  runners: TRunnerItem[] | undefined
  private static instance: State

  private constructor() {
    this.runners = undefined
  }

  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new State()
    }

    return State.instance
  }

  get runnersData() {
    return this.runners
  }

  set initialData(runners: TRunnerItem[]) {
    this.runners = runners
  }
}

export const StateService = State.getInstance()
