import { Heap } from "../Heap";


describe("Heap data structure", () => {
  it("Heapify", () => {
    const heap = new Heap([1, 2, 5, 0, 10, 3]);
    expect(heap.top()).toBe(10);
  });
});
