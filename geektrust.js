const fs = require("fs")
const filename = process.argv[2];
const Biller = require("./biller");
const CleanInput = require("./core/cleanInput");

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    let inputLines = data.toString().split("\n")
    inputLines = new CleanInput(inputLines).process();
    new Biller(inputLines).main();
});
