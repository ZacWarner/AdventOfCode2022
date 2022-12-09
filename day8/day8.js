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
                // console.log("++++++++++++++++")
                // console.log(rowArr.slice(0, i).find(el => el >= tree) && rowArr.slice(i + 1).find(el => el >= tree))
                // console.log(rowArr);
                // console.log(rowArr.slice(0, i), "||", tree, "||", rowArr.slice(i + 1))
                // console.log("++++++++++++++++")
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
                // console.log("+++++++++++")
                // console.log(col)
                // console.log(col.slice(0, i - 1))
                // console.log(tree)
                // console.log(col.slice(i + 1))
                // console.log("+++++++++++")
                return

            } else {
                // console.log("+++++++++++")
                // console.log(col)
                // console.log(col.slice(0, i - 1))
                // console.log(tree)
                // console.log(col.slice(i + 1))
                // console.log("+++++++++++")
                if (!checkVisible(i, index)) {
                    visible.push({ row: i, col: index })
                }
            }
        })
    });
    console.log(visible);

    console.log(visible.length);

};

part1()