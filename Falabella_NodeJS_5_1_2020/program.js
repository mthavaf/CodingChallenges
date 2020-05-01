
// Sample code to perform I/O:

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function (input) {
    stdin_input += input;                               // Reading input from STDIN
});

process.stdin.on("end", function () {
    main(stdin_input);
});

const print = str => {
    console.log(str);
};

const getMatrix = values => {
    const matrix = [];
    const length = values.length;
    for (let i in values) {
        matrix[i] = new Array(values.length);
    }

    for (let i in values) {
        const prev = i == 0 ? 0 : matrix[length - i][0];
        matrix[length - i - 1][0] = values[length - i - 1] + prev;
    }

    for (let i in values) {
        const prev = i == 0 ? 0 : matrix[0][length - i];
        matrix[0][length - i - 1] = values[i] + prev;
    }

    for (let i = 1; i < length; i++) {
        for (let j = 1; j < length; j++) {
            matrix[i][j] = (matrix[0][j] +
                matrix[i][0] -
                matrix[0][length - i] -
                matrix[length - j][0]) / 2;
        }
    }

    return matrix;
};

function main(input) {
    // process.stdout.write(input);
    const inpArray = input.split('\n');
    const testCases = parseInt(inpArray[0]);
    let inputNumber = 0;
    while (inputNumber < testCases) {
        const [length, sum] = inpArray[inputNumber * 2 + 1].split(' ')
            .map(_ => parseInt(_));
        const values = inpArray[inputNumber * 2 + 2].split(' ')
            .map(_ => parseInt(_));

        const matrix = getMatrix(values);
        let res = Infinity;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i; j++) {
                const diff = Math.abs(sum - matrix[i][j]);
                if (diff < res) {
                    res = diff;
                }
            }
        }
        print(res);
        inputNumber++;
    }
}

