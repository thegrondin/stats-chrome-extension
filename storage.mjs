const getItem = (key, callback) => {
  chrome.storage.sync.get([key], (result) => {
    callback(result[key]);
  });
};

const setItem = (key, value) => {
  chrome.storage.sync.set({ [key]: value });
  console.log("Saved to storage : ", value);
};

const clearAll = (key) => {
  setItem(key, null);
};

const addNewurl = (newUrl) => {
  let urls = getItem("urls", (result) => {
    if (!result) result = [];

    result.push(newUrl);

    setItem("urls", result);
  });
};

//export { getItem, setItem, addNewurl };
