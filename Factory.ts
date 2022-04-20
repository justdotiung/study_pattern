enum SchedulingStrategyID {
  RESPONSE_TIME,
  THROUGHPUT,
  DYNAMIC,
}

class ElevatorManager {
  #controlloers: ElevatorController[] = [];
  #scheduler: ThroughputScheduler;
  constructor(controllerCount: number) {
    for (let i = 0; i < controllerCount; i++) {
      const controller = new ElevatorController(i + 1);
      this.#controlloers.push(controller);
    }

    this.#scheduler = new ThroughputScheduler();
  }

  requsetElevator(destination: number, direction: Direction) {
    const hour = new Date().getHours();

    if (hour < 12) this.#scheduler = new ResponseTimeScheduler();
    else this.#scheduler = new ThroughputScheduler();

    const selectedElevator = this.#scheduler.selectElevator(
      this,
      destination,
      direction
    );

    this.#controlloers.get(selectedElevator).gotoFloor(destination);
  }
}

class SchedulerFactory {
  static getScheduler(strategyID: SchedulingStrategyID) {
    let scheduler = null;
    switch (strategyID) {
      case SchedulingStrategyID.RESPONSE_TIME:
        scheduler = new ResponseTimeScheduler();
        break;
      case SchedulingStrategyID.THROUGHPUT:
        scheduler = new ThroughputScheduler();
        break;
      case SchedulingStrategyID.DYNAMIC:
        const hour = new Date().getHours();

        if (hour < 12) scheduler = new ResponseTimeScheduler();
        else scheduler = new ThroughputScheduler();
        break;
    }

    return scheduler;
  }
}

class ElevatorController {
  #id: number;
  #curFloor: number;

  constructor(id: number) {
    this.#id = id;
    this.#curFloor = 1;
  }

  gotoFloor(destination: number) {
    console.log(`Elevator[${this.#id}] Floor: ${this.#curFloor}`);

    this.#curFloor = destination;
    console.log(`==> ${this.#curFloor}`);
  }
}

class ThroughputScheduler {
  selectElevator(
    manager: ElevatorManager,
    destination: number,
    direction: Direction
  ) {
    return 0;
  }
}
