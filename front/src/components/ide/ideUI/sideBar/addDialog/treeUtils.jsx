// 파일 뎁스 계산 로직
export function getNodeDepth(tree, nodeId) {
  let depth = 0;
  let current = tree.find((item) => item.id === nodeId);

  while (current && current.parent !== 0) {
    depth++;
    current = tree.find((item) => item.id === current.parent);
  }

  return depth;
}
