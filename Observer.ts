interface Observer {
  update: () => void;
}

class Subject {
  private observers: Array<Observer> = [];

  attach(target: Observer) {
    this.observers.push(target);
  }

  detach(target: Observer) {
    this.observers = this.observers.filter((observer) => observer !== target);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }
}

class ScoreRecord extends Subject {
  private scores: number[] = [];

  addScore(score: number) {
    this.scores.push(score);
    this.notifyObservers();
  }

  getScoreRecord(): number[] {
    return this.scores;
  }
}

class MinMaxView implements Observer {
  private scoreRecord;
  constructor(scoreRecord: ScoreRecord) {
    this.scoreRecord = scoreRecord;
  }

  update() {
    const record = this.scoreRecord.getScoreRecord();
    this.displayyMinMax(record);
  }

  private displayyMinMax(record: number[]) {
    console.log("min", Math.min(...record), "max", Math.max(...record));
  }
}

class DataSheetView implements Observer {
  private viewCount;
  private scoreRecord;
  constructor(socreRecord: ScoreRecord, viewCount: number) {
    this.scoreRecord = socreRecord;
    this.viewCount = viewCount;
  }

  update() {
    const record = this.scoreRecord.getScoreRecord();
    this.displayScores(record, this.viewCount);
  }

  private displayScores(record: number[], viewCount: number) {
    console.log(`List of ${viewCount} entries:`);
    for (let i = 0; i < record.length && i < viewCount; i++) {
      console.log(record[i]);
    }
  }
}

class StatistcsView implements Observer {
  constructor(private scoreRecord: ScoreRecord) {}

  update() {
    const scores = this.scoreRecord.getScoreRecord();
    this.displayStatiscs(scores);
  }

  displayStatiscs(scores: number[]) {
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

type ObjectK = {
  [k: string]: unknown;
};

class CreateStore {
  private state: unknown | ObjectK;
  private listeners: Array<() => void> = [];
  constructor(private reducer: any) {}

  dispatch(action: any) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((li) => li());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  getState() {
    return this.state;
  }
}

const reducer = (
  state: ObjectK = { key: 1, count: 1 },
  action: any
): ObjectK => {
  switch (action.type) {
    case "AAAA":
      return {
        ...state,
        key: state.key + action.payload,
      };
    case "BBB":
      return {
        ...state,
        count: state.count + action.payload,
      };
  }
  return state;
};

const createStore = new CreateStore(reducer);

createStore.subscribe(function () {
  console.log("구독");
});

createStore.dispatch({ type: "AAAA", payload: 1 });
createStore.dispatch({ type: "AAAA", payload: 1 });
createStore.dispatch({ type: "AAAA", payload: 1 });
createStore.dispatch({ type: "BBB", payload: 100 });
createStore.dispatch({ type: "CCC", payload: 100 });
createStore.dispatch({ type: "CCC", payload: 100 });

console.log(createStore.getState());
