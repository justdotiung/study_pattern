var ScoreRecord = /** @class */ (function () {
    function ScoreRecord() {
        this.scores = [];
    }
    ScoreRecord.prototype.setDataSheetView = function (view) {
        if (view instanceof DataSheetView)
            this.dataSheetView = view;
        else
            this.minMaxView = view;
    };
    ScoreRecord.prototype.addScore = function (score) {
        var _a, _b;
        this.scores.push(score);
        (_a = this.dataSheetView) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.minMaxView) === null || _b === void 0 ? void 0 : _b.update();
    };
    ScoreRecord.prototype.getScoreRecord = function () {
        return this.scores;
    };
    return ScoreRecord;
}());
var MinMaxView = /** @class */ (function () {
    function MinMaxView(scoreRecord) {
        this.scoreRecord = scoreRecord;
    }
    MinMaxView.prototype.update = function () {
        var record = this.scoreRecord.getScoreRecord();
        this.displayyMinMax(record);
    };
    MinMaxView.prototype.displayyMinMax = function (record) {
        console.log("min", Math.min.apply(Math, record), "max", Math.max.apply(Math, record));
    };
    return MinMaxView;
}());
var DataSheetView = /** @class */ (function () {
    function DataSheetView(socreRecord, viewCount) {
        this.scoreRecord = socreRecord;
        this.viewCount = viewCount;
    }
    DataSheetView.prototype.update = function () {
        var record = this.scoreRecord.getScoreRecord();
        this.displayScores(record, this.viewCount);
    };
    DataSheetView.prototype.displayScores = function (record, viewCount) {
        console.log("List of ".concat(viewCount, " entries:"));
        for (var i = 0; i < record.length && i < viewCount; i++) {
            console.log(record[i]);
        }
    };
    return DataSheetView;
}());
var Client = /** @class */ (function () {
    function Client() {
        var scoreRecord = new ScoreRecord();
        var dataSheetView = new DataSheetView(scoreRecord, 3);
        var minMaxView = new MinMaxView(scoreRecord);
        // scoreRecord.setDataSheetView(dataSheetView);
        scoreRecord.setDataSheetView(minMaxView);
        for (var i = 1; i <= 5; i++) {
            var score = i * 10;
            console.log("add", score);
            scoreRecord.addScore(score);
        }
    }
    return Client;
}());
new Client();
