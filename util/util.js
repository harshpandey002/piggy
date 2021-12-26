export const numberWithCommas = (x) => {
  let isNegetive = x < 0;
  if (isNegetive) x = -1 * x;
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  if (isNegetive) return "-" + res;
  return res;
};

export const handleColor = (expend) => {
  let color;

  if (expend < 25) {
    color = "#59bb1c";
  } else if (expend < 50) {
    color = "#d6c400";
  } else if (expend < 75) {
    color = "#d65d00";
  } else if (expend < 100) {
    color = "#d41a00";
  } else if (expend == 100) {
    color = "#2f2f2f";
  }

  return color;
};
