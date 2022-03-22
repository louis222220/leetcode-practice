/*
 * @lc app=leetcode id=410 lang=typescript
 *
 * [410] Split Array Largest Sum
 */

// @lc code=start
/** Dynamic Programming + Recursion */
function splitArray(nums: number[], m: number): number {
	if (nums.length == m) {
		return Math.max(...nums);
	}

	const dpMemoization: number[][] = new Array(m + 1).fill(0).map(() => new Array(nums.length));
	const sumFrontMemoization: number[] = new Array(nums.length + 1);
	sumFrontMemoization[0] = 0;

	const answer = recursiveHelper(m, nums.length);
	return answer;

	/** k = current length */
	function recursiveHelper(m: number, k: number): number {
		if (dpMemoization[m][k] != null) {
			return dpMemoization[m][k];
		}

		if (m == 1){
			const sum = sumUpFront(k);
			dpMemoization[1][k] = sum;
			return sum;
		}

		let minimum = Number.MAX_SAFE_INTEGER;
		for (let i = m - 1; i < k; i++) {
			const leftDpResult = recursiveHelper(m - 1, i);
			const rightSum = sumUp(i, k);
			const result = Math.max(leftDpResult, rightSum);
			if (minimum > result) {
				minimum = result;
			}
		}
		dpMemoization[m][k] = minimum;
		return minimum;
	}

	/** from start to stop-1 */
	function sumUp(start: number, stop: number): number {
		let sum = 0;
		for (let i = start; i < stop; i++) {
			sum += nums[i];
		}
		return sum;
	}

	function sumUpFront(length: number): number {
		if (sumFrontMemoization[length] != null) {
			return sumFrontMemoization[length];
		}
		else {
			const sumToIndex = sumUpFront(length - 1) + nums[length - 1];
			sumFrontMemoization[length] = sumToIndex;
			return sumToIndex;
		}
	}
}

// /** Binary Search Solution */
// function splitArray(nums: number[], m: number): number {
// 	// Possible answer is [max element, sum of array]
// 	// Pick one candidate
// 	// Use it to divide the array and try to get maximum pieces
// 	// compare the count with m
// 	// ------

// 	let lower = Math.max(...nums);
// 	let upper = nums.reduce((accu, curr) => accu + curr, 0);
// 	while (lower < upper) {
// 		const middle = Math.floor((lower + upper) / 2);
// 		let sectionSum = 0;
// 		let sectionCount = 1;
// 		for (let i = 0; i < nums.length; i++) {
// 			if (sectionSum + nums[i] > middle) {
// 				sectionCount++;
// 				sectionSum = 0 + nums[i];
// 			} 
// 			else {
// 				sectionSum += nums[i]
// 			}
// 		}
// 		if (sectionCount > m) lower = middle + 1;
// 		else upper = middle
// 	}
// 	return upper;
// };
// @lc code=end

