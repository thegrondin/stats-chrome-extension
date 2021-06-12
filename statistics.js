const clearAllBtn = document.querySelector(".clear-all-btn");
const getListInConsole = document.querySelector(".get-list");

clearAllBtn.addEventListener("click", (e) => {
  clearAll("urls");
});

getListInConsole.addEventListener("click", (e) => {
  getItem("urls", (result) => {
    result = JSON.parse(result);
    console.log(parseJsonListToStatisticsUrl(result));
  });
});
