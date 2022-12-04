const asyncReadFile = require("../utils/asyncReadFile");

const testArr = ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg', 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw']
let countGet = 0;
const getPriority = (let) => {
    if (!let) {
        return;
    }
    countGet += 1
    if (let.length === 1) {
        const letVal = let.charCodeAt(0);
        if (letVal < 97) {
            return letVal - 38;
        } else {
            return letVal - 96;
        }
    } else {
        console.log('error')
    }
}


async function part1() {
    const packList = await asyncReadFile('./input.txt');
    let total = 0;

    let count = 0;
    packList.forEach((sack) => {
        // if (!sack) {
        //     return;
        // }
        count += 1;
        const mid = sack.length / 2;
        const side1 = sack.substring(0, mid);
        const side2 = sack.substring(mid);

        let match = side1.split("").find(item => side2.indexOf(item) > -1);
        if (!match) {
            return
        }
        const val = getPriority(match);
        console.log({ match, val });
        total += val;

    });
    console.log(total);
    console.log(packList.length);
    console.log(count);
    console.log(countGet)
}

async function part2() {
    const packList = await asyncReadFile('./input.txt');
    let total = 0;

    for (let i = 0; i < packList.length; i += 3) {
        const firPack = packList[i];
        const secPack = packList[i + 1];
        const thirPack = packList[i + 2];

        const matchFir2 = firPack.split("").filter(badge => secPack.indexOf(badge) > -1);

        const actBadge = matchFir2.find(badge => thirPack.indexOf(badge) > -1);

        // if (!actBadge) {
        //     console.log('error');
        //     return;
        // }

        const val = getPriority(actBadge);
        if (val) {
            total += val;
        }

        console.log({ actBadge, val })
    }
    console.log(total);
}


part2();