function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
	const maxHeap = new Heap();

	walks:
	for (let i = 0; i < heights.length - 1; i++) {
		if (heights[i] >= heights[i + 1]) continue;
		else {
			const difference = heights[i + 1] - heights[i];

			replace:
			while (true) {
				if (bricks >= difference) {
					maxHeap.push(difference);
					bricks -= difference;
					break replace;
				}
				else {
					if (ladders < 1) return i;
					if (maxHeap.length > 0) {
						const lastMaxDifference = maxHeap.top();
						if (difference > lastMaxDifference) {
							ladders -= 1;
							break replace;
						}
						else {
							bricks += lastMaxDifference;
							ladders -= 1;
							maxHeap.pop();
						}
					}
					else {
						ladders -= 1;
						break replace;
					}
				}
			}
		}
		
	}
	return heights.length - 1;
};