const { promises: fsPromises } = require('fs');

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        const arr = contents.split(/\r?\n/);


        return arr;
    } catch (err) {
        console.log(err);
    }
}

module.exports = asyncReadFile;