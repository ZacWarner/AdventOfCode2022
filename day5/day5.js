const asyncReadFile = require("../utils/asyncReadFile");


async function part1() {
    const packList = await asyncReadFile('./input.txt');

    let stacks = [];
    let directions = [];

    for (let i = 0; i < packList.length; i++) {
        if (packList[i] === '') {
            stacks = packList.slice(0, i);
            directions = packList.slice(i + 1);
        }
    };

    const stackArr = [];


    for (let i = (stacks.length - 2); i >= 0; i--) {
        let row = stacks[i].split(' ');
        let spaceCount = 0;
        let itemPos = 0;
        row.forEach((item) => {
            if (item != '') {
                if (stackArr[itemPos]) {
                    stackArr[itemPos].push(item);
                    itemPos++
                } else {
                    stackArr[itemPos] = [item];
                    itemPos++
                }

            } else {
                if (spaceCount < 3) {
                    spaceCount++
                } else {
                    spaceCount = 0;
                    itemPos++;
                }
            }
        })
    };



    //remove the backets;
    stackArr.forEach((stack, index) => {
        stackArr[index] = stack.map(v => v.replace(/[^\w\s!?]/g, ''));
    });



    //clean up directions
    directions.forEach((direction, index) => {
        if (direction) {
            directions[index] = direction.split(" ").filter(val => {
                if (val !== 'move' && val !== 'from' && val !== 'to') {

                    return val;
                }
            });
        }

    });
    console.log(directions.length);


    //handle directions
    directions.forEach((direction) => {
        if (direction) {
            direction = direction.map(val => Number(val));

            let moving = stackArr[direction[1] - 1].slice(-direction[0]);
            moving = moving.reverse();

            const oldRow = stackArr[direction[1] - 1].slice(0, (stackArr[direction[1] - 1].length - direction[0]));

            stackArr[direction[2] - 1] = [...stackArr[direction[2] - 1], ...moving];
            stackArr[direction[1] - 1] = [...oldRow];
        }
    });


    let answer = ''

    stackArr.forEach(stack => {
        answer = answer + stack.pop();
    });

    console.log(answer);

};

async function part2() {
    const packList = await asyncReadFile('./input.txt');

    let stacks = [];
    let directions = [];

    for (let i = 0; i < packList.length; i++) {
        if (packList[i] === '') {
            stacks = packList.slice(0, i);
            directions = packList.slice(i + 1);
        }
    };

    const stackArr = [];


    for (let i = (stacks.length - 2); i >= 0; i--) {
        let row = stacks[i].split(' ');
        let spaceCount = 0;
        let itemPos = 0;
        row.forEach((item) => {
            if (item != '') {
                if (stackArr[itemPos]) {
                    stackArr[itemPos].push(item);
                    itemPos++
                } else {
                    stackArr[itemPos] = [item];
                    itemPos++
                }

            } else {
                if (spaceCount < 3) {
                    spaceCount++
                } else {
                    spaceCount = 0;
                    itemPos++;
                }
            }
        })
    };



    //remove the backets;
    stackArr.forEach((stack, index) => {
        stackArr[index] = stack.map(v => v.replace(/[^\w\s!?]/g, ''));
    });



    //clean up directions
    directions.forEach((direction, index) => {
        if (direction) {
            directions[index] = direction.split(" ").filter(val => {
                if (val !== 'move' && val !== 'from' && val !== 'to') {

                    return val;
                }
            });
        }

    });
    console.log(directions.length);


    //handle directions
    directions.forEach((direction) => {
        if (direction) {
            direction = direction.map(val => Number(val));

            let moving = stackArr[direction[1] - 1].slice(-direction[0]);


            const oldRow = stackArr[direction[1] - 1].slice(0, (stackArr[direction[1] - 1].length - direction[0]));

            stackArr[direction[2] - 1] = [...stackArr[direction[2] - 1], ...moving];
            stackArr[direction[1] - 1] = [...oldRow];
        }
    });


    let answer = ''

    stackArr.forEach(stack => {
        answer = answer + stack.pop();
    });

    console.log(answer);

};

part1();
part2();