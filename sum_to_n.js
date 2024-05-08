
function sum_to_n_a (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}



function sum_to_n_b(n) {

    if (n <= 0) {
        return 0;
    } else {
        return n + sum_to_n_b(n - 1);
    }

}

function sum_to_n_c(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
       arr.push(i);
    }
    return arr.reduce((acc, curr) => acc + curr, 0);
}
function sum_to_n_d(n) {
    return Array.from({length: n}, (_, i) => i + 1).reduce((a, b) => a + b, 0);
}

// describe('Sum to n functions', () => {
//     const testCases = [
//         {n: 1, expected: 1},
//         {n: 2, expected: 3},
//         {n: 3, expected: 6},
//         {n: 4, expected: 10},
//         {n: 5, expected: 15},
//         {n: 100, expected: 5050},
//     ];

//     testCases.forEach(({n, expected}) => {
//         test(`sum_to_n_a(${n}) should return ${expected}`, () => {
//             expect(sum_to_n_a(n)).toBe(expected);
//         });

//         test(`sum_to_n_b(${n}) should return ${expected}`, () => {
//             expect(sum_to_n_b(n)).toBe(expected);
//         });

//         test(`sum_to_n_c(${n}) should return ${expected}`, () => {
//             expect(sum_to_n_c(n)).toBe(expected);
//         });

//         test(`sum_to_n_d(${n}) should return ${expected}`, () => {
//             expect(sum_to_n_d(n)).toBe(expected);
//         });
//     });
// });