class ScoreRecord {
  private scores: number[] = [];
  private minMaxView: MinMaxView | undefined;
  private dataSheetView: DataSheetView | undefined;

  setDataSheetView(view: DataSheetView | MinMaxView) {
    if (view instanceof DataSheetView) this.dataSheetView = view;
    else this.minMaxView = view;
  }
  addScore(score: number) {
    this.scores.push(score);
    this.dataSheetView?.update();
    this.minMaxView?.update();
  }
  getScoreRecord(): number[] {
    return this.scores;
  }
}

class MinMaxView {
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

class DataSheetView {
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

class Client {
  constructor() {
    const scoreRecord = new ScoreRecord();
    const dataSheetView = new DataSheetView(scoreRecord, 3);
    const minMaxView = new MinMaxView(scoreRecord);

    // scoreRecord.setDataSheetView(dataSheetView);
    scoreRecord.setDataSheetView(minMaxView);
    for (let i = 1; i <= 5; i++) {
      let score = i * 10;
      console.log("add", score);

      scoreRecord.addScore(score);
    }
  }
}

new Client();
