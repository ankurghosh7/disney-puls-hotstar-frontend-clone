export function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = (today.getMonth() + 1).toString().padStart(2, "0"); // Using padStart to add leading zero if necessary
  var day = today.getDate().toString().padStart(2, "0"); // Using padStart to add leading zero if necessary
  return `${year}-${month}-${day}`;
}
