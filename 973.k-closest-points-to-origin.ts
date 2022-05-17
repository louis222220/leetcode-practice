function squareSum(nums: number[]): number {
    return nums[0] * nums[0] + nums[1] * nums[1];
}

function kClosest(points: number[][], k: number): number[][] {
    const maxHeap = new Heap<number[]>(
        [],
        (a, b) => squareSum(a) - squareSum(b)
    );
    for(let i = 0; i < points.length; i++) {
        maxHeap.push(points[i]);
        if (maxHeap.length > k) {
            maxHeap.pop();
        }
    }
    return maxHeap.items;
};