class Printer {
  static printer: Printer;
  #counter: number = 0;
  private constructor() {}

  static getInstance() {
    if (!Printer.printer) this.printer = new Printer();
    return this.printer;
  }

  print(str: string) {
    this.#counter++;
    console.log(str, this.#counter);
  }
}

class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  print() {
    const printer = Printer.getInstance();
    printer.print(this.name + " print using " + printer.toString() + ".");
  }
}

export class Main {
  constructor() {
    for (let i = 0; i < 5; i++) {
      new User(i + 1 + "-user").print();
    }
  }
}
