var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ElevatorManager_controlloers, _ElevatorController_id, _ElevatorController_curFloor, _a, _ThroughputScheduler_instance, _b, _ResponseTimeScheduler_instance;
var SchedulingStrategyID;
(function (SchedulingStrategyID) {
    SchedulingStrategyID[SchedulingStrategyID["RESPONSE_TIME"] = 0] = "RESPONSE_TIME";
    SchedulingStrategyID[SchedulingStrategyID["THROUGHPUT"] = 1] = "THROUGHPUT";
    SchedulingStrategyID[SchedulingStrategyID["DYNAMIC"] = 2] = "DYNAMIC";
})(SchedulingStrategyID || (SchedulingStrategyID = {}));
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
})(Direction || (Direction = {}));
class ElevatorManager {
    constructor(controllerCount) {
        _ElevatorManager_controlloers.set(this, []);
        for (let i = 0; i < controllerCount; i++) {
            const controller = new ElevatorController(i + 1);
            __classPrivateFieldGet(this, _ElevatorManager_controlloers, "f").push(controller);
        }
    }
    requsetElevator(destination, direction) {
        const scheduler = this.getScheduler();
        console.log(scheduler);
        const selectedElevator = scheduler.selectElevator(this, destination, direction);
        __classPrivateFieldGet(this, _ElevatorManager_controlloers, "f")[selectedElevator].gotoFloor(destination);
    }
}
_ElevatorManager_controlloers = new WeakMap();
class ElevatorManagerWithTroughputScheduling extends ElevatorManager {
    constructor(controllerCount) {
        super(controllerCount);
    }
    getScheduler() {
        const scheduler = ThroughputScheduler.getInstance();
        return scheduler;
    }
}
class ElevatorManagerWithResponseTimeScheduling extends ElevatorManager {
    constructor(controllerCount) {
        super(controllerCount);
    }
    getScheduler() {
        return ResponseTimeScheduler.getInstance();
    }
}
class ElevatorManagerWithDynamicScheduling extends ElevatorManager {
    constructor(controllerCount) {
        super(controllerCount);
    }
    getScheduler() {
        const hour = new Date().getHours();
        let scheduler = null;
        if (hour < 12)
            scheduler = ResponseTimeScheduler.getInstance();
        else
            scheduler = ThroughputScheduler.getInstance();
        return scheduler;
    }
}
class SchedulerFactory {
    static getScheduler(strategyID) {
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
                if (hour < 12)
                    scheduler = ResponseTimeScheduler.getInstance();
                else
                    scheduler = ThroughputScheduler.getInstance();
                break;
        }
        return scheduler;
    }
}
class ElevatorController {
    constructor(id) {
        _ElevatorController_id.set(this, void 0);
        _ElevatorController_curFloor.set(this, void 0);
        __classPrivateFieldSet(this, _ElevatorController_id, id, "f");
        __classPrivateFieldSet(this, _ElevatorController_curFloor, 1, "f");
    }
    gotoFloor(destination) {
        console.log(`Elevator[${__classPrivateFieldGet(this, _ElevatorController_id, "f")}] Floor: ${__classPrivateFieldGet(this, _ElevatorController_curFloor, "f")}`);
        __classPrivateFieldSet(this, _ElevatorController_curFloor, destination, "f");
        console.log(`==> ${__classPrivateFieldGet(this, _ElevatorController_curFloor, "f")}`);
    }
}
_ElevatorController_id = new WeakMap(), _ElevatorController_curFloor = new WeakMap();
class ThroughputScheduler {
    constructor() { }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _a, "f", _ThroughputScheduler_instance))
            __classPrivateFieldSet(this, _a, new ThroughputScheduler(), "f", _ThroughputScheduler_instance);
        return __classPrivateFieldGet(this, _a, "f", _ThroughputScheduler_instance);
    }
    selectElevator(manager, destination, direction) {
        return 0;
    }
}
_a = ThroughputScheduler;
_ThroughputScheduler_instance = { value: void 0 };
class ResponseTimeScheduler {
    constructor() { }
    static getInstance() {
        if (!__classPrivateFieldGet(this, _b, "f", _ResponseTimeScheduler_instance))
            __classPrivateFieldSet(this, _b, new ResponseTimeScheduler(), "f", _ResponseTimeScheduler_instance);
        return __classPrivateFieldGet(this, _b, "f", _ResponseTimeScheduler_instance);
    }
    selectElevator(manager, destination, direction) {
        return 1;
    }
}
_b = ResponseTimeScheduler;
_ResponseTimeScheduler_instance = { value: void 0 };
export class Client {
    constructor() {
        new ElevatorManagerWithDynamicScheduling(2).requsetElevator(10, Direction.UP);
        new ElevatorManagerWithResponseTimeScheduling(2).requsetElevator(10, Direction.UP);
        new ElevatorManagerWithTroughputScheduling(2).requsetElevator(10, Direction.UP);
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
