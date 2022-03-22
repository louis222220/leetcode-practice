/*
 * @lc app=leetcode id=338 lang=typescript
 *
 * [338] Counting Bits
 */

// @lc code=start
function countBits(n: number): number[] {
	let ans: number[] = [0];
	for (let i = 1; i < n + 1; i++) {
		ans[i] = ans[i >> 1] + Number(i & 1);
	}
	return ans;
};
// @lc code=end
