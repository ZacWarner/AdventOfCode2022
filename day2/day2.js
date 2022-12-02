
const asyncReadFile = require("../utils/asyncReadFile");

async function part1() {
    let stratGuide = await asyncReadFile('./input.txt');
    let totalScore = 0;
    let testArr = ['A Y', 'B X', 'C Z'];


    stratGuide.forEach((game) => {
        const gameArr = game.trim().split(/\s+/);
        const hm = gameArr[0]
        const ym = gameArr[1]

        if (!ym || !hm) {
            return;
        }

        if (ym === 'Z') {
            totalScore += 3;
            if (hm === 'A') {
                totalScore += 0
            } else if (hm == "B") {
                totalScore += 6;
            } else {
                totalScore += 3
            }
        } else if (ym === "Y") {
            totalScore += 2;
            if (hm === 'A') {
                totalScore += 6
            } else if (hm == "B") {
                totalScore += 3;
            } else {
                totalScore += 0;
            }
        } else {
            totalScore += 1;
            if (hm === 'A') {
                totalScore += 3
            } else if (hm === "B") {
                totalScore += 0;
            } else {
                totalScore += 6;
            }
        }

    })
    console.log(totalScore);
};

async function part2() {
    let stratGuide = await asyncReadFile('./input.txt');
    let totalScore = 0;
    let testArr = ['A Y', 'B X', 'C Z'];

    stratGuide.forEach((game) => {
        const gameArr = game.trim().split(/\s+/);
        const hm = gameArr[0]
        const ym = gameArr[1]

        if (!ym || !hm) {
            return;
        }
        // x means lose, y means draw z means win
        if (ym === 'Z') {
            totalScore += 6;
            if (hm === 'A') {
                totalScore += 2
            } else if (hm == "B") {
                totalScore += 3;
            } else {
                totalScore += 1
            }
        } else if (ym === "Y") {
            totalScore += 3;
            if (hm === 'A') {
                totalScore += 1
            } else if (hm == "B") {
                totalScore += 2;
            } else {
                totalScore += 3;
            }
        } else {
            totalScore += 0;
            if (hm === 'A') {
                totalScore += 3
            } else if (hm === "B") {
                totalScore += 1;
            } else {
                totalScore += 2;
            }
        }

    })
    console.log(totalScore);

}
part1();
part2();