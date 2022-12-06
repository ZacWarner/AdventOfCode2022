const asyncReadFile = require("../utils/asyncReadFile");

async function part1() {
    const data = await asyncReadFile('./input.txt');

    const code = data[0].split('');

    let count = 1;
    let target = 0;

    code.forEach((letter, index) => {

        if (index >= 3) {
            if (letter === code[index - 3]) {
                count++
                return
            } else if (letter === code[index - 2]) {
                count++
                return
            } else if (letter !== code[index - 1]) {
                let checkN = code[index - 1];
                if (checkN === code[index - 2]) {
                    count++
                    return
                } else if (checkN !== code[index - 3]) {
                    if (code[index - 2] !== code[index - 3]) {
                        target = count;
                        console.log(code[index - 3], code[index - 2], code[index - 1], code[index]);
                        console.log(index + 1);
                        console.log(j)
                    }
                }
            } else {
                count++
                return;
            }
        }
        count++
    })
}

async function part2() {
    const data = await asyncReadFile('./input.txt');

    const code = data[0].split('');


    code.forEach((letter, index) => {

        if (index >= 14) {
            const section = code.slice((index - 14), index);
            let Match = false;
            section.forEach((let, i) => {

                const found = section.find(el => el === let);
                if (found) {
                    if (section.indexOf(found) !== i) {
                        Match = true;
                    }

                }
            })
            if (!Match) {
                console.log(index);
                console.log(section)
            }

        }

    })
}

part2();