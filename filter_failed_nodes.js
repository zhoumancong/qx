// filter_failed_nodes.js

// 测试网址，你可以根据需要更改
const testUrl = "http://www.google.com/generate_204";
const timeout = 5000;  // 设置超时时间（毫秒）
const nodes = $resource.getPolicyList("YOUR_POLICY_NAME"); // 替换为你的策略组名称

let validNodes = [];
let testedNodes = 0;

function testNode(node) {
    $httpClient.get(testUrl, { node: node }, (error, response, data) => {
        testedNodes++;
        if (!error && response.statusCode === 204) {
            validNodes.push(node);
        }

        if (testedNodes === nodes.length) {
            applyPolicy(validNodes);
        }
    });
}

function applyPolicy(validNodes) {
    $surge.setSelectGroupPolicy("YOUR_POLICY_NAME", validNodes);
    $done();
}

for (let node of nodes) {
    testNode(node);
}

setTimeout(() => {
    if (testedNodes < nodes.length) {
        applyPolicy(validNodes);
    }
}, timeout);
