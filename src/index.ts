function reverseArray<T>(arr: T[][]): T[][] {
    // Helper function to reverse a single dimensional array
    const reverseSubarray = <U>(subArr: U[]): U[] => {
        return subArr.reverse();
    };

    // Base case: if the input is not an array, return it as is
    if (!Array.isArray(arr)) {
        return arr;
    }

    // If the array is empty or contains only a single element, return it as is
    if (arr.length === 0 || arr.length === 1) {
        return arr;
    }

    // Reverse each sub-array and then reverse the order of the sub-arrays
    const reversedSubArrays = arr.map(subArr => reverseSubarray(subArr));
    return reversedSubArrays.reverse();
}

// Example usage:
const multiDimensionalArray: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const reversedArray = reverseArray(multiDimensionalArray);
console.log(reversedArray);
// Output: [[9, 8, 7], [6, 5, 4], [3, 2, 1]]