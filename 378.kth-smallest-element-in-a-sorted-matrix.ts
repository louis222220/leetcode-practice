
/** Traversal the whole matrix with a fixed-size max heap */
function kthSmallest(matrix: number[][], k: number): number {
    const maxHeap = new Heap();
    for (const nums of matrix) {
        for (const num of nums) {
            maxHeap.push(num);
            if (maxHeap.length > k) maxHeap.pop();
        }
    }
    return maxHeap.top()
};

/** Heapify the whole matrix with a min heap after flat the matrix */
function kthSmallest(matrix: number[][], k: number): number {
    const nums = matrix.flat();
    const minHeap = new Heap(nums, (b, a) => a - b);
    for(let i = 0; i < k - 1; i++) {
        minHeap.pop();
    }
    return minHeap.top();
};

class MyPointer {
	row: number = 0;
	column: number = 0;
}