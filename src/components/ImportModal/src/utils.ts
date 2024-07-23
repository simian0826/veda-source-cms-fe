//@ts-nocheck
let nodes = [];
// 根据子级id获取父级节点
export function getParentNodes(id, tree) {
  _getParentNodes([], id, tree);
  return nodes;
}

export function getSelecedValues(id, tree) {
  const arr = [];
  getParentNodes(id, tree);
  nodes.forEach((item) => {
    arr.push(item.value);
  });
  arr.push(id);
  return arr;
}

function _getParentNodes(his, targetId, tree) {
  tree.some((list) => {
    const children = list.children || [];
    if (list.value == targetId) {
      nodes = his;
      return true;
    } else if (children.length > 0) {
      const history = [...his];
      history.push(list);
      return _getParentNodes(history, targetId, children);
    }
  });
}
