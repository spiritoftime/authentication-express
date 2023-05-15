const formats = [
  { divideBy: 60000, unit: "minute", limit: 60 },
  { divideBy: 3600000, unit: "hour", limit: 24 },
  { divideBy: 86400000, unit: "day", limit: 7 },
  { divideBy: 604800000, unit: "week", limit: 4 },
  { divideBy: 2419200000, unit: "month", limit: 12 },
];
const checkFormatter = (format, limit) => {
  if (+format.split(" ")[0] >= 0 && +format.split(" ")[0] < limit) return true;
};
const getDateDiff = (timestamp) => {
  const createdTime = new Date(timestamp);
  const currDate = new Date();
  const dateDiff = createdTime - currDate;
  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "always",
  });
  for (const format of formats) {
    if (
      checkFormatter(
        formatter.format(Math.round(dateDiff / format.divideBy), format.unit),
        format.limit
      )
    )
      return formatter.format(
        Math.round(dateDiff / format.divideBy),
        format.unit
      );
  }
};

export default getDateDiff;
