const asyncReadFile = require("../utils/asyncReadFile");

const testArr = [
    '2-4,6-8',
    '2-3,4-5',
    '5-7,7-9',
    '2-8,3-7',
    '6-6,4-6',
    '2-6,4-8',
]

async function part1() {
    const packList = await asyncReadFile('./input.txt');

    let count = 0;

    packList.map((pair) => {

        const [firElf, SecElf] = pair.split(',');
        const [firElfStart, firElfFin] = firElf.split('-').map(val => Number(val));
        const [secElfStart, secElfFin] = SecElf.split('-').map(val => Number(val));

        if (firElfStart >= secElfStart && firElfFin <= secElfFin) {

            count++;

        } else if (firElfStart <= secElfStart && firElfFin >= secElfFin) {

            count++;


        }

    })

    console.log("part1: ", count);
};

async function part2() {
    const packList = await asyncReadFile('./input.txt');

    let count = 0;

    packList.map((pair) => {
        const [firElf, SecElf] = pair.split(',');
        const [firElfStart, firElfFin] = firElf.split('-').map(val => Number(val));
        const [secElfStart, secElfFin] = SecElf.split('-').map(val => Number(val));

        if (firElfStart >= secElfStart && firElfStart <= secElfFin) {
            count++;
        } else if (firElfFin >= secElfStart && firElfFin <= secElfFin) {
            count++;
        } else if (secElfStart >= firElfStart && secElfStart <= firElfFin) {
            count++;
        } else if (secElfFin >= firElfStart && secElfFin <= firElfFin) {
            count++;
        }
    })

    console.log("part2: ", count)
}

part1();
part2();