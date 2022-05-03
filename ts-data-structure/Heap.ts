type TypeHavingValueOf = {
	valueOf: () => number | string | BigInt;
};

type CompareFn <T extends TypeHavingValueOf> = (a: T, b: T) => number;

/** Max Heap */
export class Heap <T extends TypeHavingValueOf = number> {
	private nums: Array<T>;
	private _length = 0;
	private compareFn: CompareFn<T>;

	/** heapify */
	constructor(
		nums: T[] = [],
		compareFn: CompareFn<T> = (a, b) => {
			if (a == b) return 0;
			else if (a == null) return -1;
			else if (b == null) return 1;
			else if (a > b) return 1;
			else return -1;
		}
	) {
		this.nums = nums;
		this._length = nums.length;
		this.compareFn = compareFn;

		this.heapify();
	}

	get length(): number{
		return this._length;
	}

	top(): T | null {
		return this.nums[0] ?? null;
	}

	push(value: T) {
		this.nums.push(value);
		this._length++;

		let currentIndex = this._length - 1;
		while (true) {
			const parentIndex = this.getParentIndex(currentIndex);
			if (parentIndex < 0) break;
			if (this.compareFn(value, this.nums[parentIndex]) > 0) {
				this.swap(currentIndex, parentIndex);
				currentIndex = parentIndex;
			}
			else break;
		}
	}

	pop(): T | undefined {
		const topIndex = 0;
		const lastIndex = this._length - 1;

		const popValue = this.nums[topIndex];
		this.swap(topIndex, lastIndex);
		this.nums.pop();
		this._length--;
		this.siftDown(0);

		return popValue;
	}

	private siftDown(index: number) {
		if (index >= this._length) return;

		const value = this.nums[index];
		let currentIndex = index;
		while (true) {
			const leftIndex = this.getLeftChildIndex(currentIndex);
			const rightIndex = this.getRightChildIndex(currentIndex);

			if (leftIndex >= this._length) break;
			if (
				rightIndex >= this._length &&
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

		const lastIndex = this._length - 1;
		const lastParentIndex = this.getParentIndex(lastIndex);
		for (let index = lastParentIndex; index >= 0 ; index--) {
			this.siftDown(index);
		}
	}


	private swap(i: number, j: number) {
		
		const temp = this.nums[i];
		this.nums[i] = this.nums[j];
		this.nums[j] = temp;
	}

	private getParentIndex(index: number): number {
		return Math.floor((index - 1) / 2)
	}

	private getLeftChildIndex(index: number): number {
		return index * 2 + 1;
	}

	private getRightChildIndex(index: number): number {
		return index * 2 + 2;
	}
}
