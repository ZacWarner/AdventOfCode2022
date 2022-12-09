const asyncReadFile = require("../utils/asyncReadFile");


async function part1() {
    const input = await asyncReadFile('./input.txt');

    const gh = input.length;
    const gw = input[0].length;
    const cols = [];
    const visible = [];

    for (let i = 0; i < gw; i++) {
        cols.push([])
    };


    const checkVisible = (horz, vert) => {
        if (visible.find(tree => tree.row === horz && tree.col === vert)) {
            return true;
        } else {
            return false;
        }
    };

    //find vis in rows
    input.forEach((row, index) => {
        let rowArr = row.split('').map(num => Number(num));
        rowArr.forEach((tree, i) => {
            cols[i].push(tree);
            if (i === 0) {
                visible.push({ row: index, col: i })
            } else if (i === rowArr.length - 1) {
                visible.push({ row: index, col: i })
            }
            else if ((rowArr.slice(0, i).find(el => el >= tree)
                && rowArr.slice(i + 1).find(el => el >= tree)) !== undefined) {
                //not vis left
                return;

            } else {
                visible

                visible.push({ row: index, col: i })
            };
        })
    });

    cols.forEach((col, index) => {
        col.forEach((tree, i) => {

            if (i === 0) {
                // console.log({ row: i, col: index })
                if (!checkVisible(i, index)) {

                    visible.push({ row: i, col: index })
                }

            } else if (i === col.length - 1) {

                if (!checkVisible(i, index)) {

                    visible.push({ row: i, col: index })
                }
            } else if ((col.slice(0, i).find(el => el >= tree) && col.slice(i + 1).find(el => el >= tree)) !== undefined) {

                return

            } else {

                if (!checkVisible(i, index)) {
                    visible.push({ row: i, col: index })
                }
            }
        })
    });
    console.log(visible);

    console.log(visible.length);

};

async function part2() {
    const input = await asyncReadFile('./input.txt');

    const gh = input.length;
    const gw = input[0].length;
    const cols = [];
    let trees = [];

    for (let i = 0; i < gw; i++) {
        cols.push([])
    };

    const getRight = (arr, tree, pos) => {
        const arrToRight = arr.slice(pos + 1);
        let count = 0;
        for (let i = 0; i < arrToRight.length; i++) {
            count++;
            if (tree <= arrToRight[i]) {
                break;
            }
        }
        return count;
    };

    const getLeft = (arr, tree, pos) => {
        const arrToLeft = arr.slice(0, pos);


        let count = 0;
        for (let i = arrToLeft.length - 1; i >= 0; i--) {

            count++
            if (tree <= arrToLeft[i]) {
                break;
            }
        };
        return count;
    };

    const findTree = (col, row) => {
        return trees.findIndex(el => el.col === col && el.row === row)
    };



    //find vis in rows
    input.forEach((row, index) => {
        let rowArr = row.split('').map(num => Number(num));
        rowArr.forEach((tree, i) => {
            const newTree = {
                row: index,
                col: i,
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                vs: 0
            };
            cols[i].push(tree);
            if (i === 0) {
                newTree.right = getRight(rowArr, tree, i);
            } else if (i === rowArr.length - 1) {
                newTree.left = getLeft(rowArr, tree, i);
            }
            else {
                newTree.right = getRight(rowArr, tree, i);
                newTree.left = getLeft(rowArr, tree, i);
            };
            trees.push(newTree);
        })
    });

    cols.forEach((col, index) => {
        col.forEach((tree, i) => {
            const target = findTree(index, i);
            if (i === 0) {
                trees[target].bottom = getRight(col, tree, i);

            } else if (i === col.length - 1) {
                trees[target].top = getLeft(col, tree, i);

            } else {
                trees[target].bottom = getRight(col, tree, i);
                trees[target].top = getLeft(col, tree, i);
            }
        })
    });


    //sum the view scores
    trees = trees.map((tree) => {
        const newVs = tree.left * tree.right * tree.top * tree.bottom;

        return { ...tree, vs: newVs }
    })

    const biggest = Math.max(...trees.map(tree => tree.vs));

    console.log(biggest);
}

part2()