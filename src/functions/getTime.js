const getTime = (hour, min) => {
  let duration = null;
  if (hour >= 12) {
    duration = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  } else {
    duration = "AM";
    if (hour === 0) {
      hour = 12;
    }
  }
  return `(${String(hour).padStart(2, "0")}:${String(min).padStart(
    2,
    "0"
  )} ${duration})`;
};


export { getTime };
