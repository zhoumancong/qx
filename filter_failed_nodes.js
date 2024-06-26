#连接测试
// filter_failed_nodes.js

let nodes = $surge.selectGroup($environment.policy);
let validNodes = [];

for (let node of nodes) {
    $httpClient.get('http://www.google.com/generate_204', { node: node }, (error, response, data) => {
        if (!error && response.statusCode == 204) {
            validNodes.push(node);
        }
        if (validNodes.length == nodes.length) {
            $done(validNodes);
        }
    });
}

setTimeout(() => {
    $done(validNodes);
}, 10000); // 超时时间，10秒后返回已筛选的有效节点
