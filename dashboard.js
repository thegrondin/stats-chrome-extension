const clearAllBtn = document.querySelector(".clear-all-btn");
const getListInConsole = document.querySelector(".get-list");
const sortByHost = document.querySelector(".sort-by-host");

const tableWrapper = document.querySelector(".table-wrapper");

clearAllBtn.addEventListener("click", (e) => {
  clearAll("urls");
});

getListInConsole.addEventListener("click", (e) => {
  getItem("urls", (result) => {
    result = JSON.parse(result);
    console.table(parseJsonListToStatisticsUrl(result));
  });
});

sortByHost.addEventListener("click", (e) => {
  getItem("urls", (result) => {
    result = JSON.parse(result);
    const items = sortAggregates(groupByHost(result)).reverse();

    const aggreateTable = new DynamicTable(
      ["name", "count"],
      convertAggregateListToObjects(items)
    );

    aggreateTable.generateDOM(tableWrapper);
  });
});
