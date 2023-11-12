const getDifferenceDays = (start_date, return_date) => {
    var date1 = new Date(start_date);
    var date2 = new Date(return_date);
  
    var Difference_In_Time = date2.getTime() - date1.getTime();
  
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
    return Difference_In_Days;
  };

  export default getDifferenceDays