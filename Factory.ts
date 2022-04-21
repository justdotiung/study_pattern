enum SchedulingStrategyID {
  RESPONSE_TIME,
  THROUGHPUT,
  DYNAMIC,
}

enum Direction {
  UP,
}

abstract class ElevatorManager {
  #controlloers: ElevatorController[] = [];

  constructor(controllerCount: number) {
    for (let i = 0; i < controllerCount; i++) {
      const controller = new ElevatorController(i + 1);
      this.#controlloers.push(controller);
    }
  }
  protected abstract getScheduler(): ElevatorScheduler;

  requsetElevator(destination: number, direction: Direction) {
    const scheduler = this.getScheduler();
    console.log(scheduler);
    const selectedElevator = scheduler.selectElevator(
      this,
      destination,
      direction
    );

    this.#controlloers[selectedElevator].gotoFloor(destination);
  }
}

class ElevatorManagerWithTroughputScheduling extends ElevatorManager {
  constructor(controllerCount: number) {
    super(controllerCount);
  }

  protected getScheduler() {
    const scheduler = ThroughputScheduler.getInstance();
    return scheduler;
  }
}

class ElevatorManagerWithResponseTimeScheduling extends ElevatorManager {
  constructor(controllerCount: number) {
    super(controllerCount);
  }

  protected getScheduler() {
    return ResponseTimeScheduler.getInstance();
  }
}

class ElevatorManagerWithDynamicScheduling extends ElevatorManager {
  constructor(controllerCount: number) {
    super(controllerCount);
  }

  protected getScheduler(): ElevatorScheduler {
    const hour = new Date().getHours();
    let scheduler = null;
    if (hour < 12) scheduler = ResponseTimeScheduler.getInstance();
    else scheduler = ThroughputScheduler.getInstance();
    return scheduler;
  }
}

class SchedulerFactory {
  static getScheduler(
    strategyID: SchedulingStrategyID
  ): ResponseTimeScheduler | ThroughputScheduler {
    let scheduler = null;
    switch (strategyID) {
      case SchedulingStrategyID.RESPONSE_TIME:
        scheduler = ResponseTimeScheduler.getInstance();
        break;
      case SchedulingStrategyID.THROUGHPUT:
        scheduler = ThroughputScheduler.getInstance();
        break;
      case SchedulingStrategyID.DYNAMIC:
        const hour = new Date().getHours();

        if (hour < 12) scheduler = ResponseTimeScheduler.getInstance();
        else scheduler = ThroughputScheduler.getInstance();
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

interface ElevatorScheduler {
  selectElevator: (
    manager: ElevatorManager,
    destination: number,
    direction: Direction
  ) => number;
}

class ThroughputScheduler implements ElevatorScheduler {
  static #instance: ThroughputScheduler;
  static getInstance() {
    if (!this.#instance) this.#instance = new ThroughputScheduler();
    return this.#instance;
  }
  private constructor() {}

  selectElevator(
    manager: ElevatorManager,
    destination: number,
    direction: Direction
  ) {
    return 0;
  }
}

class ResponseTimeScheduler implements ElevatorScheduler {
  static #instance: ResponseTimeScheduler;
  static getInstance() {
    if (!this.#instance) this.#instance = new ResponseTimeScheduler();
    return this.#instance;
  }

  private constructor() {}

  selectElevator(
    manager: ElevatorManager,
    destination: number,
    direction: Direction
  ) {
    return 1;
  }
}

export class Client {
  constructor() {
    new ElevatorManagerWithDynamicScheduling(2).requsetElevator(
      10,
      Direction.UP
    );
    new ElevatorManagerWithResponseTimeScheduling(2).requsetElevator(
      10,
      Direction.UP
    );
    new ElevatorManagerWithTroughputScheduling(2).requsetElevator(
      10,
      Direction.UP
    );
    // const emWithResponseTimeScheduler = new ElevatorManager(
    //   2,
    //   SchedulingStrategyID.RESPONSE_TIME
    // );
    // emWithResponseTimeScheduler.requsetElevator(10, Direction.UP);

    // const emWithThroughputScheduler = new ElevatorManager(
    //   2,
    //   SchedulingStrategyID.THROUGHPUT
    // );
    // emWithThroughputScheduler.requsetElevator(10, Direction.UP);

    // const emWithDynamicScheduler = new ElevatorManager(
    //   10,
    //   SchedulingStrategyID.DYNAMIC
    // );
    // emWithDynamicScheduler.requsetElevator(10, Direction.UP);
  }
}
