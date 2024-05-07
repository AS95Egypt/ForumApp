module.exports.isLeapYear = function (year) {
  if (isNaN(Number(year)) || year % 1 != 0 || year <= 0) return undefined;
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? true : false;
};
