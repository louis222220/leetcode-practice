type CompareFn = (a: number, b: number) => number;

/** Max Heap */
export class Heap {
	private nums: number[] = [0];
	private _length = 0;
	private compareFn: CompareFn;

	/** heapify */
	constructor(
		nums: number[] = [],
		compareFn: CompareFn = (a, b) => a - b
	) {
		this.nums = [0, ...nums];
		this._length = nums.length;
		this.compareFn = compareFn;

		this.heapify();
	}


	get length(): number{
		return this._length;
	}

	top(): number {
		return this.nums[1] ?? null;
	}

	push(value: number) {
		this.nums.push(value);
		this._length++;
		let currentIndex = this._length;
		while (true) {
			const parentIndex = this.getParentIndex(currentIndex);
			if (parentIndex < 1) break;
			if (this.compareFn(value, this.nums[parentIndex]) > 0) {
				this.swap(currentIndex, parentIndex);
				currentIndex = parentIndex;
			}
			else break;
		}
	}

	pop(): number {
		const lastIndex = this._length;
		const popValue = this.nums[1];
		this.swap(1, lastIndex);
		this.nums.pop();
		this._length--;
		this.siftDown(1);

		return popValue;
	}

	private siftDown(index: number) {
		if (index > this._length) return;

		const value = this.nums[index];
		let currentIndex = index;
		while (true) {
			const leftIndex = this.getLeftChildIndex(currentIndex);
			const rightIndex = this.getRightChildIndex(currentIndex);

			if (leftIndex > this._length) break;
			if (
				rightIndex > this._length &&
				this.compareFn(this.nums[leftIndex], value) > 0
			) {
				this.swap(leftIndex, currentIndex);
				break;
			}

			if (
				this.compareFn(this.nums[leftIndex], value) > 0 &&
				this.compareFn(this.nums[leftIndex], this.nums[rightIndex]) >= 0
			) {
				this.swap(leftIndex, currentIndex);
				currentIndex = leftIndex;
			}
			else if (
				this.compareFn(this.nums[rightIndex], value) > 0 &&
				this.compareFn(this.nums[rightIndex], this.nums[leftIndex]) > 0
			) {
				this.swap(rightIndex, currentIndex);
				currentIndex = rightIndex;
			}
			else break;
		}
	}

	private heapify(): void {
		if (this._length <= 1) return;
		const lastParentIndex = this.getParentIndex(this._length);
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
