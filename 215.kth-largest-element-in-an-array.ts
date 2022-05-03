/*
 * @lc app=leetcode id=215 lang=typescript
 *
 * [215] Kth Largest Element in an Array
 */

// @lc code=start

/** Keep the largest k elements with min heap */
function findKthLargest(nums: number[], k: number): number {
    const minHeap = new Heap<number>([], (a, b) => {
		if (a > b) return -1;
		else if (a < b) return 1;
		else return 0;
    });

    for (let i = 0; i < nums.length; i++) {
        minHeap.push(nums[i]);
        if (minHeap.length > k) {
            minHeap.pop();
        }
    }

    return minHeap.pop();
};

/** Heapify and pop with a max heap */
// function findKthLargest(nums: number[], k: number): number {
//     const heap = new Heap(nums);
//     for (let i = 0; i < k - 1; i++) {
//         heap.pop();
//     }
//     return heap.pop();
// };
// @lc code=end
