/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	// 在不混合陣列的前提下，將兩個陣列各自切一刀，使兩陣列的左側數量和跟右側數量和相等。
	// 假設此時的切點正好符合合併後的中位數，切點旁的數字將會符合幾項比大小的特性，能用來判斷是否為符合假設的切點，以及如果不符合的話切點應在哪一側。
	// 有了能判斷是否為正確切點的方法後，就能對陣列一使用二元搜尋法，陣列二的切點能以陣列一的切點來推算。
	// 題目限制上的長度 m 與 n 的數量級都不會 Overflow，因此不做考慮

	// if the length of array 1 is bigger than the one of array 2
	if (nums1.length > nums2.length) {
		// call function itself, and return the answer, make the array 1 is always the shorter one
		return findMedianSortedArrays(nums2, nums1);
	}
	// Declare m & n for convenience, m is always less than n
	const [m, n] = [nums1.length, nums2.length];
	// Lower is the first index of nums1
	let lower = 0;
	// Upper is the last index of nums1
	let upper = m - 1;

	// A while loop to do binary search, until lower greater to upper
	while (lower <= upper) {
		// Call getMedians with lower, upper and length of two arrays. Get 4 medians
		const {
			arr1LeftMedianIndex, arr1RightMedianIndex,
			arr2LeftMedianIndex, arr2RightMedianIndex,
		} = getMedians(lower, upper);
		console.log(`${lower}~${upper}`);
		console.log(getMedians(lower, upper));
		// Determine if the medians are the answer
		// Get the value of the bigger one of left medians
		const biggerLeftMedian = Math.max(nums1[arr1LeftMedianIndex], nums2[arr2LeftMedianIndex]);
		// Get the value of the smaller one of left medians
		const smallerRightMedian = Math.min(nums1[arr1RightMedianIndex], nums2[arr2RightMedianIndex]);
		// if left median is less than or equals to right medians
		if (biggerLeftMedian <= smallerRightMedian) {
			// this set of medians is the answer
			const answer = biggerLeftMedian + (smallerRightMedian - biggerLeftMedian) / 2; 
			return answer;
		}
		else {
			// if the left median of array 1 is greater than the one of array 2
			if (nums1[arr1LeftMedianIndex] > nums2[arr2LeftMedianIndex]) {
				// Search the left half of array 1, because the current middle is too big to be the final median
				// Set upper to be the middle
				upper = Math.floor((upper + lower) / 2) - 1;
			}
			// else if the left median of array 1 is less than the one of array 2
			else if (nums1[arr1LeftMedianIndex] < nums2[arr2LeftMedianIndex]) {
				// Search the right half of array 1, because the current middle is too small
				// Set lower to be middle plus 1
				lower = Math.floor((upper + lower) / 2) + 1;
			}
			// else
			else {
				// The 2 left medians will never be equal
			}
		}
	}

	// It may be happened that the final medians are not found even if the loop ends
	// Calculate the index of the median with 2 length of nums
	const medianIndexOfAll = Math.floor((m + n) / 2);
	// if case 1: m equals to n && upper equals to m-1: nums1 is all less than nums2
	console.log(`m:${m}, n: ${n}, lower${lower}, upper${upper}`);
	if (m == n && upper == m - 1) {
		console.log(`case1`);
		// Medians are the last element of nums1 and the first element of nums2
		const [answer1, answer2] = [nums1[m - 1], nums2[0]];
		return answer1 + (answer2 - answer1) / 2;
	}
	// else if case 2: m equals to n && lower is equals to 0: nums1 is all greater than nums2
	else if (m == n && lower == 0) {
		console.log(`case2`);
		// Medians are the last element of nums2 and the first element of nums1
		const [answer1, answer2] = [nums2[n - 1], nums1[0]];
		return answer1 + (answer2 - answer1) / 2;
	}
	// m is always less than n in following cases
	// else if case 3: m+n is odd
	else if ((m + n) % 2) {
		console.log(`case3`);
		// the index of median of all nums is Floor((m+n)/2)
		const medianIndex = Math.floor((m + n) / 2);
		// index of arr2 is medianIndex, or medianIndex-m if upper equals to 0
		const arr2Index = medianIndex - (upper == 0 ? m : 0);
		// return the answer, the element of the index
		return nums2[arr2Index];
	}
	// else if case 4: m+n is even
	else if ((m + n) % 2 == 0) {
		console.log(`case4`);
		// the indexes of 2 medians are (m+n)/2 and the previous one
		const [medianIndex1, medianIndex2]= [(m + n) / 2 - 1, (m + n) / 2];
		const [arr2Index1, arr2Index2] = upper == 0 ? [medianIndex1 - m, medianIndex2 - m] : [medianIndex1, medianIndex2];
		const [value1, value2] = [nums2[arr2Index1], nums2[arr2Index2]];
		// return the answer, the average of elements of the 2 indexes
		return value1 + (value2 - value1) / 2;
	}
	else {
		console.log(`case error`);
		// no other possible cases
	}




	// function: getMedians, return 4 numbers, which are two medians of each array
	// input: lower, upper, and closure variables: m, n
	function getMedians (lower: number, upper: number) {
		// The following formulas can be proved with derivation
		// The result variables to be returned
		let [arr1LeftMedianIndex, arr1RightMedianIndex, arr2LeftMedianIndex, arr2RightMedianIndex]: number[] = [];
		
		// Calculate medians of array 1
		// suppose xi are the average of lower and upper, meaning the index of division point and allows to be float
		const xi = (lower + upper) / 2;
		// if (upper-lower) is odd
		if ((upper - lower) % 2) {
			// the indexes of array 1 are Floor(xi) and Floor(xi)+1)
			[arr1LeftMedianIndex, arr1RightMedianIndex] = [Math.floor(xi), Math.floor(xi) + 1];
		}
		// even
		else {
			// the indexes of array 1 are 2 duplicate xi
			[arr1LeftMedianIndex, arr1RightMedianIndex] = [xi, xi];
		}
		
		// Calculate medians of array 2
		// suppose yi are (m+n)/2-xi-1
		const yi = (m + n) / 2 - xi - 1;
		// if (upper-lower+n-m) is odd
		if ((upper -lower + n - m) % 2) {
			// the indexes of array 2 are Floor(yi) and Floor(yi)+1
			[arr2LeftMedianIndex, arr2RightMedianIndex] = [Math.floor(yi), Math.floor(yi) + 1];
		}
		// else (even)
		else {
			// the indexes of array 2 are 2 duplicate yi
			[arr2LeftMedianIndex, arr2RightMedianIndex] = [yi, yi];
		}
		
		// return the 4 indexes of medians
		return { arr1LeftMedianIndex, arr1RightMedianIndex, arr2LeftMedianIndex, arr2RightMedianIndex };
	}
};
// @lc code=end

