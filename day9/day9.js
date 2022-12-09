const asyncReadFile = require("../utils/asyncReadFile");

async function part1() {
    const input = await asyncReadFile('./test.txt');

    let hPos = { hor: 1, ver: 1 };
    let tPos = { hor: 1, ver: 1 };
    let tailPos = [{ hor: 1, ver: 1 },];

    const checkTouch = () => {
        if (hPos.hor === tPos.hor && hPos.ver === tPos.ver) {
            return 'TOP';
        } else if ((hPos.hor - 1 === tPos.hor || hPos.hor + 1 === tPos.hor) && (hPos.ver - 1 === tPos.ver || hPos.ver + 1 === tPos.ver)) {
            return 'TOP';
        }
        else if (hPos.hor === tPos.hor || hPos.ver === tPos.ver) {
            return 'TOUCH';
        } else if (hPos.hor > tPos.hor && hPos.ver > tPos.ver) {
            return 'TOPR';
        } else if (hPos.hor > tPos.hor && hPos.ver < tPos.ver) {
            return 'BOTR'
        } else if (hPos.hor < tPos.hor && hPos.ver > tPos.ver) {
            return 'TOPL'
        } else if (hPos.hor < tPos.hor && hPos.ver < tPos.ver) {
            return 'BOTL'
        };
    };

    input.forEach(direction => {
        const [dir, dist] = direction.trim().split(' ');

        if (dir === 'R') {

            for (let i = 1; i <= dist; i++) {

                const check = checkTouch();

                const newTPos = { ...tPos };
                hPos.hor = hPos.hor + 1;
                switch (check) {
                    case 'TOP':
                        tailPos.push(newTPos);
                        break;
                    case 'TOUCH':
                        newTPos.hor = newTPos.hor + 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'TOPR':
                        newTPos.hor = newTPos.hor + 1;
                        newTPos.ver = newTPos.ver + 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'BOTR':
                        newTPos.hor = newTPos.hor + 1;
                        newTPos.ver = newTPos.ver - 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    default:
                        console.log('error r')
                        break;

                }
            };
        } else if (dir === 'L') {

            for (let i = 1; i <= dist; i++) {

                const check = checkTouch();
                const newTPos = { ...tPos };
                hPos.hor = hPos.hor - 1;
                switch (check) {
                    case 'TOP':
                        tailPos.push(newTPos);
                        break;
                    case 'TOUCH':
                        newTPos.hor = newTPos.hor - 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'TOPL':
                        newTPos.hor = newTPos.hor - 1;
                        newTPos.ver = newTPos.ver + 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'BOTL':
                        newTPos.hor = newTPos.hor - 1;
                        newTPos.ver = newTPos.ver - 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    default:
                        console.log('error L')
                        break;
                }
            };
        } else if (dir === 'U') {
            for (let i = 1; i <= dist; i++) {

                const check = checkTouch();
                const newTPos = { ...tPos };
                hPos.ver = hPos.ver + 1;
                switch (check) {
                    case 'TOP':
                        tailPos.push(newTPos);
                        break;
                    case 'TOUCH':
                        newTPos.ver = newTPos.ver + 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'TOPR':
                        newTPos.hor = newTPos.hor + 1;
                        newTPos.ver = newTPos.ver + 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'TOPL':
                        newTPos.hor = newTPos.hor - 1;
                        newTPos.ver = newTPos.ver + 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    default:
                        console.log('error U')
                        break;
                }
            };
        } else if (dir === 'D') {
            for (let i = 1; i <= dist; i++) {

                const check = checkTouch();
                const newTPos = { ...tPos };
                hPos.ver = hPos.ver - 1;
                switch (check) {
                    case 'TOP':
                        tailPos.push(newTPos);
                        break;
                    case 'TOUCH':
                        newTPos.ver = newTPos.ver - 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'BOTR':
                        newTPos.hor = newTPos.hor + 1;
                        newTPos.ver = newTPos.ver - 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    case 'BOTL':
                        newTPos.hor = newTPos.hor - 1;
                        newTPos.ver = newTPos.ver - 1;
                        tailPos.push(newTPos);
                        tPos = { ...newTPos };
                        break;
                    default:
                        console.log('error D')
                        break;
                }
            };
        };
    });

    console.log(tailPos);
    console.log(tailPos.length);
    //filter out duplicates
    tailPos = tailPos.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.hor === value.hor && t.ver === value.ver
        )));
    console.log(tailPos)
    console.log(tailPos.length)

}

part1();