import { Heap } from "../Heap";


describe("Data Structure - Heap", () => {
	it.each([
		// nums: Array<number>, expected: number
		[[], null],
		[[3], 3],
		[[3, 4], 4],
		[[3, 4, 5], 5],
		[[5, 4, 3], 5],
		[[3, 3, 3], 3],
		[[1, 2, 5, 0, 10, 3], 10]
	])("Heapify and get top, input: %p, expect: %p", (nums, expected) => {
		const heap = new Heap(nums);
		expect(heap.top()).toBe(expected);
	});

	it.each([
		// nums: Array<number>, expected: Array<number>
		[[], []],
		[[10], [10]],
		[[5, 10], [10, 5]],
		[[10, 11, 12], [12, 11, 10]],
		[[10, 10], [10, 10]],
		[[1, 2, 5, 0, 10, 3], [10, 5, 3, 2, 1, 0]],
	])("Heapify and pop all, input: %p, expected: %p", (nums, expected) => {
		const heap = new Heap(nums);
		const results = [];
		while(heap.length > 0) {
			const popped = heap.pop();
			results.push(popped);
		}
		expect(results).toEqual(expected);
	});
});
