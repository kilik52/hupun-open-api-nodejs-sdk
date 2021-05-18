# hupun-open-api-nodejs-sdk

对接万里牛 ERP 开放接口的 NodeJS SDK。

## 安装

```
npm i hupun-open-api-nodejs-sdk --save
```

## 使用

```javascript
import { HupunClient } from "hupun-open-api-nodejs-sdk";

const client = new HupunClient({
  appkey: "xxxxx",
  appsecret: "xxxxxx",
});

client
  .request("erp/base/storage/query", {
    page_no: 1,
    page_size: 1,
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((e) => {
    console.error(e.message);
  });
```
