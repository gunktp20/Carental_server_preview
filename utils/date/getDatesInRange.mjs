const getDatesInRange = (d1, d2)=> {
    var startDate = new Date(d1);
    var endDate = new Date(d2);
  
    var date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      date = new Date(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateFormatted = [month, day, year].join("/");
      dates.push(dateFormatted);
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }

export default getDatesInRange