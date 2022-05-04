function topKFrequent(nums: number[], k: number): number[] {
    let frequencies = {};
    nums.forEach(num => {
        if (frequencies[num] == null) {
            frequencies[num] = 1;
        }
        else {
            frequencies[num] += 1;
        }
    });
    
    const frequencyItems = [];
    for (const key in frequencies) {
        frequencyItems.push({
            key,
            value: frequencies[key],
        });
    }
    
    const maxHeap = new Heap(frequencyItems, (a, b) => (a?.value ?? 0) - (b?.value ?? 0));
    const results = [];
    for (let i = 0; i < k; i++) {
        results.push((maxHeap.pop()).key);
    }
    return results;
};