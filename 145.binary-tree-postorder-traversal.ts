/*
 * @lc app=leetcode id=145 lang=typescript
 *
 * [145] Binary Tree Postorder Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// class TreeNode {
//     val: number
//     left: TreeNode | null
//     right: TreeNode | null
//     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//         this.val = (val===undefined ? 0 : val)
//         this.left = (left===undefined ? null : left)
//         this.right = (right===undefined ? null : right)
//     }
// }

function postorderTraversal(root: TreeNode | null): number[] {
	// let curr = root
	let curr: TreeNode|null = root;
	// let stack
	let stack: TreeNode[] = [];
	// let results = []
	let results: number[] = [];
	// while (!empty(stack) || curr != null) 
	while(stack.length > 0 || curr != null)
	{
		// if (curr != null)
		if (curr != null) {
			// stack.push(curr) twice
			stack.push(curr);
			stack.push(curr);
			// curr = curr.left
			curr = curr.left;
		}
		else {
			// curr = stack.pop()
			curr = stack.pop() ?? null;
			// const top = stack.top()
			const top = stack[stack.length - 1] ?? null;
			// if (curr == top)
			if (curr === top) {
				// curr = curr.right
				curr = curr.right;
			}
			else {
				// result.push(stack.pop())
				const val = stack.pop()?.val;
				(val != null) && results.push(val);
				curr = null;
			}
		}
	}
	return results;
};
// @lc code=end

