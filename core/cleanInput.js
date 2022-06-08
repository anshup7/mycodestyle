// cleans the input provided in usable array of array of lines
class CleanInput {
    constructor(inputLinesArray) {
        this.inputLinesArray = inputLinesArray;
        this.processedLines = [];
    }

    process() {
        for (let line of this.inputLinesArray) {
            const replacedExtraSpaces = line.replace(/\s+/g, " ");
            const replacedTrailingSpaces = replacedExtraSpaces.trim();
            this.processedLines.push(replacedTrailingSpaces.split(" "));
        }
        return this.processedLines;
    }
}

module.exports = CleanInput;