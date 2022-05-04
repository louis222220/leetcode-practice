function lastStoneWeight(stones: number[]): number {
    const maxHeap = new Heap(stones);
    while (maxHeap.length > 1) {
        const x = maxHeap.pop();
        const y = maxHeap.pop();
        if (x != y) {
            maxHeap.push(Math.abs(x - y));
        }
    }
    return maxHeap.top() ?? 0;
};