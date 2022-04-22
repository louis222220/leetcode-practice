/** Max Heap */
export class Heap {
	private nums: number[] = [0];
	private length = 0;

	/** heapify */
	constructor(nums: number[] = []) {
		this.nums = [0, ...nums];
		this.length = nums.length;

		this.heapify();
	}

	top(): number {
		return this.nums[1] ?? null;
	}

	push(value: number) {
		this.nums.push(value);
		this.length++;
		let currentIndex = this.length;
		while (true) {
			const parentIndex = this.getParentIndex(currentIndex);
			if (parentIndex < 1) break;
			if (this.nums[parentIndex] < value) {
				this.swap(currentIndex, parentIndex);
				currentIndex = parentIndex;
			}
			else break;
		}
	}

	pop(): number {
		const lastIndex = this.length;
		const popValue = this.nums[1];
		this.swap(1, lastIndex);
		this.nums.pop();
		this.length--;
		this.siftDown(1);

		return popValue;
	}

	private siftDown(index: number) {
		if (index > this.length) return;

		const value = this.nums[index];
		let currentIndex = index;
		while (true) {
			const leftIndex = this.getLeftChildIndex(currentIndex);
			const rightIndex = this.getRightChildIndex(currentIndex);

			if (leftIndex > this.length) break;
			if (rightIndex > this.length && this.nums[leftIndex] > value) {
				this.swap(leftIndex, currentIndex);
				break;
			}

			if (this.nums[leftIndex] > value && this.nums[leftIndex] >= this.nums[rightIndex]) {
				this.swap(leftIndex, currentIndex);
				currentIndex = leftIndex;
			}
			else if (this.nums[rightIndex] > value && this.nums[rightIndex] > this.nums[leftIndex]) {
				this.swap(rightIndex, currentIndex);
				currentIndex = rightIndex;
			}
			else break;
		}
	}

	private heapify(): void {
		if (this.length <= 1) return;
		const lastParentIndex = this.getParentIndex(this.length);
		for (let index = lastParentIndex; 1 <= index ; index--) {
			this.siftDown(index);
		}
	}


	private swap(i: number, j: number) {
		
		const temp = this.nums[i];
		this.nums[i] = this.nums[j];
		this.nums[j] = temp;
	}

	private getParentIndex(index: number): number {
		return Math.floor(index / 2)
	}

	private getLeftChildIndex(index: number): number {
		return index * 2;
	}

	private getRightChildIndex(index: number): number {
		return index * 2 + 1;
	}
}
