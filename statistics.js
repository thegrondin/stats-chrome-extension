class AggregateItem {
  constructor(count, name, items) {
    this.name = name;
    this.count = count;
    this.items = items;
  }

  toObject() {
    return {
      name: this.name,
      count: this.count,
    };
  }
}

class GroupByAggregate {
  constructor(key, elements) {
    this.key = key;
    this.elements = elements;
  }

  result() {
    const groupedObjs = this.elements.reduce((acc, current = {}) => {
      if (!acc.hasOwnProperty(current[this.key])) {
        acc[current[this.key]] = [current];
      } else {
        acc[current[this.key]].push(current);
      }

      return acc;
    }, {});

    const aggreateItems = [];

    for (const [key, value] of Object.entries(groupedObjs)) {
      aggreateItems.push(new AggregateItem(value.length, key, value));
    }

    return aggreateItems;
  }
}

const groupByHost = (urls) => {
  const gba = new GroupByAggregate("host", urls);
  return gba.result();
};

const sortAggregates = (aggregates) => {
  return aggregates.sort(function (a, b) {
    return a.count < b.count ? -1 : a.count > b.count ? 1 : 0;
  });
};
