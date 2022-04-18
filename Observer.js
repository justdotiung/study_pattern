class Subject {
    constructor() {
        this.observers = [];
    }
    attach(target) {
        this.observers.push(target);
    }
    detach(target) {
        this.observers = this.observers.filter((observer) => observer !== target);
    }
    notifyObservers() {
        this.observers.forEach((observer) => observer.update());
    }
}
class ScoreRecord extends Subject {
    constructor() {
        super(...arguments);
        this.scores = [];
    }
    addScore(score) {
        this.scores.push(score);
        this.notifyObservers();
    }
    getScoreRecord() {
        return this.scores;
    }
}
class MinMaxView {
    constructor(scoreRecord) {
        this.scoreRecord = scoreRecord;
    }
    update() {
        const record = this.scoreRecord.getScoreRecord();
        this.displayyMinMax(record);
    }
    displayyMinMax(record) {
        console.log("min", Math.min(...record), "max", Math.max(...record));
    }
}
class DataSheetView {
    constructor(socreRecord, viewCount) {
        this.scoreRecord = socreRecord;
        this.viewCount = viewCount;
    }
    update() {
        const record = this.scoreRecord.getScoreRecord();
        this.displayScores(record, this.viewCount);
    }
    displayScores(record, viewCount) {
        console.log(`List of ${viewCount} entries:`);
        for (let i = 0; i < record.length && i < viewCount; i++) {
            console.log(record[i]);
        }
    }
}
class StatistcsView {
    constructor(scoreRecord) {
        this.scoreRecord = scoreRecord;
    }
    update() {
        const scores = this.scoreRecord.getScoreRecord();
        this.displayStatiscs(scores);
    }
    displayStatiscs(scores) {
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        console.log("average", average);
    }
}
export class Client {
    constructor() {
        const scoreRecord = new ScoreRecord();
        const dataSheetView3 = new DataSheetView(scoreRecord, 3);
        const dataSheetView5 = new DataSheetView(scoreRecord, 5);
        const minMaxView = new MinMaxView(scoreRecord);
        const statistcsView = new StatistcsView(scoreRecord);
        scoreRecord.attach(dataSheetView3);
        scoreRecord.attach(dataSheetView5);
        scoreRecord.attach(minMaxView);
        scoreRecord.attach(statistcsView);
        scoreRecord.detach(dataSheetView3);
        for (let i = 1; i <= 5; i++) {
            let score = i * 10;
            console.log("add", score);
            scoreRecord.addScore(score);
        }
    }
}
class CreateStore {
    constructor(reducer) {
        this.reducer = reducer;
        this.listeners = [];
    }
    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((li) => li());
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    getState() {
        return this.state;
    }
}
const reducer = (state = { key: 1, count: 1 }, action) => {
    console.log(state);
    switch (action.type) {
        case "AAAA":
            return Object.assign(Object.assign({}, state), { key: state.key + action.payload });
        case "BBB":
            return Object.assign(Object.assign({}, state), { count: state.count + action.payload });
    }
};
const createStore = new CreateStore(reducer);
createStore.subscribe(function () {
    console.log("구독");
});
createStore.dispatch({ type: "AAAA", payload: 1 });
createStore.dispatch({ type: "AAAA", payload: 1 });
createStore.dispatch({ type: "AAAA", payload: 1 });
createStore.dispatch({ type: "BBB", payload: 100 });
createStore.dispatch({ type: "BBB", payload: 100 });
createStore.dispatch({ type: "BBB", payload: 100 });
console.log(createStore.getState());
