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
var _Printer_counter;
class Printer {
    constructor() {
        _Printer_counter.set(this, 0);
    }
    static getInstance() {
        if (!Printer.printer)
            this.printer = new Printer();
        return this.printer;
    }
    print(str) {
        var _a;
        __classPrivateFieldSet(this, _Printer_counter, (_a = __classPrivateFieldGet(this, _Printer_counter, "f"), _a++, _a), "f");
        console.log(str, __classPrivateFieldGet(this, _Printer_counter, "f"));
    }
}
_Printer_counter = new WeakMap();
class User {
    constructor(name) {
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
