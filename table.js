class TableData {
  constructor(columns, data) {
    this.columns = columns;
    this.data = data;
  }
}

class DynamicTable {
  constructor(columns, tableRows, perPage = 3) {
    this.columns = columns;
    this.tableRows = tableRows;
    this.perPage = perPage;

    this.pageCount = Math.ceil(this.tableRows.length / perPage);

    this.currentPage = {
      from: 0,
      to: perPage - 1,
    };
  }

  generateDOM(parent) {
    const wrapper = document.createElement("div");
    const tableElement = document.createElement("table");
    const headerElement = document.createElement("tr");

    for (const col of this.columns) {
      const colElement = document.createElement("th");
      const colElementText = document.createTextNode(col);
      colElement.appendChild(colElementText);
      headerElement.appendChild(colElement);
    }

    tableElement.appendChild(headerElement);

    for (let i = this.currentPage.from; i < this.currentPage.to + 1; i++) {
      const rowElement = document.createElement("tr");

      for (let y = 0; y < this.columns.length; y++) {
        const rowItem = document.createElement("td");

        rowElement.appendChild(rowItem);
      }

      tableElement.appendChild(rowElement);
    }

    wrapper.appendChild(tableElement);

    for (let i = 0; i < this.pageCount; i++) {
      const pageBtnElement = document.createElement("button");
      const pageBtnElementText = document.createTextNode(i + 1);

      pageBtnElement.addEventListener("click", (e) => {
        this.nextPage(i + 1);
      });

      pageBtnElement.appendChild(pageBtnElementText);
      wrapper.appendChild(pageBtnElement);
    }

    this.wrapper = wrapper;
    parent.appendChild(wrapper);

    this.populateTable();
  }

  populateTable() {
    const trs = this.wrapper.querySelectorAll("tr");

    let currentTrIndex = 0;
    for (let i = this.currentPage.from - 1; i < this.currentPage.to + 1; i++) {
      if (currentTrIndex === 0) {
        currentTrIndex++;
        continue;
      }

      const currentRowData = this.tableRows[i];
      const currentTr = trs[currentTrIndex];
      const currentTrChildren = currentTr.childNodes;

      for (let y = 0; y < Object.keys(currentRowData).length; y++) {
        const tdText = document.createTextNode(
          Object.values(currentRowData)[y]
        );
        if (currentTrChildren[y].childNodes.length) {
          currentTrChildren[y].childNodes[0].remove();
        }

        currentTrChildren[y].appendChild(tdText);
      }
      currentTrIndex++;
    }
  }

  nextPage(number) {
    this.currentPage.from = number * (this.pageCount - 1);
    this.currentPage.to += number * this.pageCount;

    this.populateTable();
  }
}

const convertAggregateListToObjects = (aggrList) => {
  const list = [];

  for (const aggr of aggrList) {
    list.push(aggr.toObject());
  }

  return list;
};
