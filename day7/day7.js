const asyncReadFile = require("../utils/asyncReadFile");

async function part1() {
    const data = await asyncReadFile('./input.txt');
    let directories = [];
    let directory = {
        name: '',
        size: 0,
        children: [],
    };

    let location = 0;
    let dirTree = [];

    const alreadyAdded = [];



    data.forEach((direction) => {
        if (direction === '$ cd /') {
            dirTree = ['/'];
            location = 0;

        } else if (direction === "$ ls") {
            return
        } else if (direction === "$ cd ..") {

            location = location - 1;
            dirTree.pop();
        } else {
            const thisDir = direction.split(' ');

            if (thisDir[0] === 'dir') {
                return;
            } else if (thisDir[0] === '$') {
                dirTree.push(thisDir[2]);
                location++;
            } else if (!alreadyAdded.find(file => file === thisDir[1])) {
                const check = directories.find(({ name }) => name === dirTree[location]);
                if (check) {
                    const index = directories.findIndex(obj => {
                        return obj.name === dirTree[location];
                    });

                    const newSize = directories[index].size + parseInt(thisDir[0]);

                    directories[index] = { ...directories[index], size: newSize };
                    // directories.forEach((dir, index) => {
                    //     if (dir.name !== dirTree[location] && dir.children.length > 0) {
                    //         if (dir.children.find(child => child === dirTree[location])) {
                    //             directories[index].size = directories[index].size + parseInt(thisDir[0]);
                    //         }
                    //     }
                    // })
                    alreadyAdded.push(thisDir[1])
                } else {
                    const newDirectory = {
                        name: dirTree[location],
                        size: parseInt(thisDir[0]),
                        children: [],
                    };
                    if (location > 0) {
                        dirTree.forEach(dirName => {
                            if (dirName !== dirTree[location]) {
                                const targIn = directories.findIndex(({ name }) => name === dirName);
                                if (targIn > -1) {
                                    const check = directories[targIn].children.find(child => child === dirTree[location]);
                                    if (!check) {
                                        directories[targIn].children.push(dirTree[location]);
                                    }
                                }
                            }
                        })
                    }
                    // directories.forEach((dir, index) => {
                    //     if (dir.children.length > 0) {
                    //         if (dir.children.find(child => child === dirTree[location])) {
                    //             directories[index].size = directories[index].size + newDirectory.size;
                    //         }
                    //     }
                    // })


                    directories.push(newDirectory);
                    alreadyAdded.push(thisDir[1])
                }

            }
        }
    })

    directories.reverse().forEach((dir, index) => {

        if (dir.children.length > 0) {
            let sum = dir.size;
            dir.children.forEach(child => {
                const target = directories.findIndex(({ name }) => name === child);
                sum = sum + directories[target].size;
            });
            directories[index].size = sum;
        }
    })


    const dirAtMost = directories.filter(dir => dir.size <= 100000);
    console.log(dirAtMost);
    let total = 0;
    dirAtMost.forEach(dir => {
        total += dir.size;
    });
    console.log(total);
}



part1();