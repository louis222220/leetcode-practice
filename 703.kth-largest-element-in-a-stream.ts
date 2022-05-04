class KthLargest {
    private minHeap: Heap;
    private k: number;
    constructor(k: number, nums: number[]) {
        this.k = k;
        this.minHeap = new Heap(nums, (a, b) => b - a);
        while(this.minHeap.length > this.k) {
            this.minHeap.pop();
        }
    }

    add(val: number): number {
        this.minHeap.push(val);
        if (this.minHeap.length > this.k) {
            this.minHeap.pop();
        }
        return this.minHeap.top();
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */