interface MovingStrategy {
  move(): void;
}

interface AttackStrategy {
  attack(): void;
}

class WalingStrategy implements MovingStrategy {
  move(): void {
    console.log("걷는중..");
  }
}

class FlyingStrategy implements MovingStrategy {
  move(): void {
    console.log("날 수 있음");
  }
}

class MissileStrategy implements AttackStrategy {
  attack(): void {
    console.log("미사일 공격중..");
  }
}

class PunchStrategy implements AttackStrategy {
  attack(): void {
    console.log("주먹 공격중..");
  }
}

abstract class Robot {
  private name: string;
  private movingStrategy: unknown;
  private attakStrategy: unknown;
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  move() {
    if (isMovingStrategy(this.movingStrategy)) {
      this.movingStrategy.move();
    }

    function isMovingStrategy(object: unknown): object is MovingStrategy {
      return "move" in Object.getPrototypeOf(object);
    }
  }

  attack() {
    if (isAttackStrategy(this.attakStrategy)) this.attakStrategy.attack();

    function isAttackStrategy(object: unknown): object is AttackStrategy {
      return "attack" in Object.getPrototypeOf(object);
    }
  }

  setMovingStrategy(movingStrategy: MovingStrategy) {
    this.movingStrategy = movingStrategy;
  }

  setAttackStrategy(attakStrategy: AttackStrategy) {
    this.attakStrategy = attakStrategy;
  }
}

class TaekwonV extends Robot {
  constructor(name: string) {
    super(name);
  }
}

class Atom extends Robot {
  constructor(name: string) {
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
