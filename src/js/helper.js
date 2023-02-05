function findMaxDate(obj1, obj2) {
  date1 = new Date(obj1.date);
  date2 = new Date(obj2.date);

  return date1 > date2 ? obj1 : obj2;
}

function findMinDate(obj1, obj2) {
  date1 = new Date(obj1.date);
  date2 = new Date(obj2.date);

  return date1 < date2 ? obj1 : obj2;
}

findDateRange = function (toBookList) {
  const maxDate = toBookList.reduce((prev, cur) => {
    return findMaxDate(prev, cur);
  }).date;

  const minDate = toBookList.reduce((prev, cur) => {
    return findMinDate(prev, cur);
  }).date;

  return {
    maxDate,
    minDate,
  };
};

findLocations = function (toBookList) {
  return toBookList.map((toBookItem) => {
    const location = toBookItem.location;
    return location;
  });
};
