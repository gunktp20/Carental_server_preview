const isDateValid = (d1, d2) => {
  const toDay = new Date();
  const dateStart = new Date(d1);
  const dateReturn = new Date(d2);

  var difTimeStart = dateStart.getTime() - toDay.getTime();
  var difDayStart = difTimeStart / (1000 * 3600 * 24);

  if (difDayStart <= -1) {
    return false;
  }

  var difTimeReturn = dateReturn.getTime() - toDay.getTime();
  var difDayReturn = difTimeReturn / (1000 * 3600 * 24);

  if (difDayReturn <= -1) {
    return false;
  }

  return true;
};

export default isDateValid;
