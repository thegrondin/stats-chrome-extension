class StatisticsURL {
  constructor(url = null) {
    if (!url) return;

    this.hash = url.hash;
    this.host = url.host;
    this.hostname = url.hostname;
    this.href = url.href;
    this.origin = url.origin;
    this.pathname = url.pathname;
    this.protocol = url.protocol;
  }

  fromJSONString(jsonStr) {
    json = JSON.parse(jsonStr);

    this.fromJSON(json);
  }

  fromJSON(json) {
    this.hash = json["hash"];
    this.host = json["host"];
    this.hostname = json["hostname"];
    this.href = json["href"];
    this.origin = json["origin"];
    this.pathname = json["pathname"];
    this.protocol = json["protocol"];
  }

  toJSON() {
    return {
      hash: this.hash,
      host: this.host,
      hostname: this.hostname,
      href: this.href,
      origin: this.origin,
      pathname: this.pathname,
      protocol: this.protocol,
    };
  }
}

const parseJsonListToStatisticsUrl = (jsonList) => {
  let statisticsUrls = [];

  for (let item of jsonList) {
    const obj = new StatisticsURL();

    obj.fromJSON(item);
    statisticsUrls.push(obj);
  }

  return statisticsUrls;
};

const getItem = (key, callback) => {
  chrome.storage.sync.get([key], (result) => {
    callback(result[key]);
  });
};

const setItem = (key, value) => {
  chrome.storage.sync.set({ [key]: value });
  //console.log("Saved to storage : ", value);
};

const clearAll = (key) => {
  setItem(key, null);
};

const addNewurl = (newUrl) => {
  let urls = getItem("urls", (result) => {
    result = JSON.parse(result);
    if (!result) result = [];

    result.push(newUrl);

    result = JSON.stringify(result);

    setItem("urls", result);
    //console.log("RESULTS", result);
  });
};
