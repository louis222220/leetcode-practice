function kWeakestRows(mat: number[][], k: number): number[] {
    const rowInfos = mat.map((nums, index) => {
        return {
            index,
            value: nums.filter(n => n).length,
        };
    });
    
    
    const minHeap = new Heap(
        rowInfos,
        (a, b) => {
            if (a == null) return 1;
            else if (b == null) return -1;
            else if (a.value == b.value) {
                if (a.index > b.index) return -1;
                else return 1;
            }
            else if (a.value > b.value) return -1;
            else return 1;
        }
    );
    const results = [];
    for (let i = 0; i < k; i++) {
        results.push(minHeap.pop().index);
    }
    return results;
};