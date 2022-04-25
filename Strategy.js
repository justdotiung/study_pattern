class WalingStrategy {
    move() {
        console.log("걷는중..");
    }
}
class FlyingStrategy {
    move() {
        console.log("날 수 있음");
    }
}
class MissileStrategy {
    attack() {
        console.log("미사일 공격중..");
    }
}
class PunchStrategy {
    attack() {
        console.log("주먹 공격중..");
    }
}
class Robot {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    move() {
        if (isMovingStrategy(this.movingStrategy)) {
            this.movingStrategy.move();
        }
        function isMovingStrategy(object) {
            return "move" in Object.getPrototypeOf(object);
        }
    }
    attack() {
        if (isAttackStrategy(this.attakStrategy))
            this.attakStrategy.attack();
        function isAttackStrategy(object) {
            return "attack" in Object.getPrototypeOf(object);
        }
    }
    setMovingStrategy(movingStrategy) {
        this.movingStrategy = movingStrategy;
    }
    setAttackStrategy(attakStrategy) {
        this.attakStrategy = attakStrategy;
    }
}
class TaekwonV extends Robot {
    constructor(name) {
        super(name);
    }
}
class Atom extends Robot {
    constructor(name) {
        super(name);
    }
}
export class Clinet {
    constructor() {
        const taekwonV = new TaekwonV("TaekwonV");
        const atom = new Atom("Atom");
        taekwonV.setMovingStrategy(new WalingStrategy());
        taekwonV.setAttackStrategy(new MissileStrategy());
        atom.setAttackStrategy(new PunchStrategy());
        atom.setMovingStrategy(new FlyingStrategy());
        console.log("my name is ", taekwonV.getName());
        taekwonV.attack();
        taekwonV.move();
        console.log("my name is ", atom.getName());
        atom.attack();
        atom.move();
    }
}
