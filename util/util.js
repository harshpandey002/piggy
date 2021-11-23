// export const numberWithCommas = (x) => {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

export const numberWithCommas = (x) => {
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return res;
};
