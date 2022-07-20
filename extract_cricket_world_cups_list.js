const axios = require('axios');
const cheerio = require("cheerio");

// function to get the raw data
const getRawData = (URL) => {
    return axios(URL)
    .then((responce) => {
        return responce.data;
    })
    .catch(console.error);
};

// URL for data
const URL = "https://en.wikipedia.org/wiki/Cricket_World_Cup"

// start of the program
const getCricketWorldCupsList = async () => {
    const cricketWorldCupRawData = await getRawData(URL);

    const parsedCricketWorldCupData = cheerio.load(cricketWorldCupRawData);

    const worldCupsDataTable = parsedCricketWorldCupData("table")[0].children[1].children;

    console.log("Year --- Winner --- Runner");
    worldCupsDataTable.forEach((row) => {
        if (row.name === "tr") {
            let year, winner, runner = null;

            const columns = row.children.filter((column) => column.name === "td");

            const yearColumn = columns[0];
            if (yearColumn) {
                year = yearColumn.children[0];
                if (year) {
                    year = year.data;
                }
            }
            const winnerColumn = columns[3];
            if (winnerColumn) {
                if (winnerColumn.children[0]) {
                    winner = winnerColumn.children[0].children[0].data;
                }
            }
            const runnerColumn = columns[3];
            if (runnerColumn) {
                if (runnerColumn.children[0]) {
                    runner = runnerColumn.children[0].children[0].data;
                }
            }
            if (year && winner && runner) {
                console.log(`${year} --- ${winner} --- ${runner}`);
            }
        }
    });
};

// invoking the main function
getCricketWorldCupsList();
