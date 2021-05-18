const test = require("tape");
const APIService = require("../lib/index");

const { HupunClient } = APIService;

test("test sign", function (t) {
  t.plan(2);

  const client = new HupunClient({
    appkey: "123",
    appsecret: "456",
  });

  const timestamp = new Date().getTime();

  t.equal(
    client._stringToSign({ page_no: 1, page_size: 100, _t: timestamp }),
    `456_app=123&_t=${timestamp}&page_no=1&page_size=100456`,
    "sdk should sign correctly"
  );

  t.equal(
    client._stringToSign({ page_no: "中文", _t: timestamp }),
    `456_app=123&_t=${timestamp}&page_no=%E4%B8%AD%E6%96%87456`,
    "sdk should work with url encode correctly"
  );
});

// 修改appkey和appsecret，打开测试
// test("test request", async function (t) {
//   const client = new HupunClient({
//     appkey: "xxxx",
//     appsecret: "xxxx",
//   });

//   try {
//     const ret = await client.request("erp/base/storage/query", {
//       page_no: 1,
//       page_size: 100,
//     });
//     t.ok(ret.data, "successfully get data");
//   } catch (error) {
//     t.fail("should not throw error");
//   }
// });
