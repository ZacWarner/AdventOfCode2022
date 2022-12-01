const { readFileSync, promises: fsPromises } = require('fs');

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        const arr = contents.split(/\r?\n/);

        console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

        return arr;
    } catch (err) {
        console.log(err);
    }
}



async function part1() {
    const calList = await asyncReadFile('./input.txt');

    const elfList = [];

    let elf = 0;

    calList.forEach((snack) => {
        if (snack !== '') {
            elf += parseInt(snack);
        } else {
            elfList.push(elf);
            elf = 0;
        }
    });

    console.log("elflist is ", elfList.length, " long")
    console.log("answer is: ", Math.max(...elfList));
}

async function part2() {
    const calList = await asyncReadFile('./input.txt');

    const elfList = [];

    let elf = 0;

    let firstElf = 0;

    let secondElf = 0;

    let thirdElf = 0;

    calList.forEach((snack) => {
        if (snack !== '') {
            elf += parseInt(snack);
        } else {
            elfList.push(elf);
            elf = 0;
        }
    });

    firstElf = Math.max(...elfList)

    elfList.splice(elfList.indexOf(firstElf), 1);

    secondElf = Math.max(...elfList);

    elfList.splice(elfList.indexOf(secondElf), 1);

    thirdElf = Math.max(...elfList);

    console.log("three bigest elfs are: ", firstElf, ", ", secondElf, ", ", thirdElf);

    const totalCal = firstElf + secondElf + thirdElf;

    console.log("totalCal: ", totalCal);

};

part1();

part2();