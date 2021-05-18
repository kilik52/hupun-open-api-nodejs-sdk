import axios from "axios";
import CryptoJS from "crypto-js";
import queryString from "query-string";

export interface HupunClientConfig {
  appkey: string;
  appsecret: string;
  url?: string;
}

export class HupunClient {
  appkey: string;
  appsecret: string;
  url: string = "https://open-api.hupun.com/api";

  constructor(config: HupunClientConfig) {
    this.appkey = config.appkey;
    this.appsecret = config.appsecret;

    if (config.url) this.url = config.url;
  }

  async request(api: string, params: any) {
    const paramsToSign = {
      ...params,
      _app: this.appkey,
      _t: new Date().getTime(),
    };

    const sign = CryptoJS.MD5(this._stringToSign(paramsToSign)).toString();

    return axios.post(
      `${this.url}/${api}`,
      queryString.stringify({
        ...paramsToSign,
        _sign: sign,
      })
    );
  }

  _stringToSign(params: any) {
    const paramsToSign = {
      ...params,
      _app: this.appkey,
    };

    const stringToSign =
      this.appsecret + queryString.stringify(paramsToSign) + this.appsecret;
    return stringToSign;
  }
}
