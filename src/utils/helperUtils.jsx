export function generateUniqueId(prefix="", base = 16) {
  const dateString = Date.now().toString(base).slice(-4);
  const numberString = Math.random().toString(base).slice(-4);
  const uniqueId = dateString + numberString;
  return prefix + uniqueId.toUpperCase();
}

export function getFileExtension(fileName){
  const arr = fileName.split(".");
  const fileExtension = arr[arr.length - 1]
  return fileExtension.toLowerCase();
}

export function convertToTimeStamp(isoTimestamp) {
  const date = new Date(isoTimestamp);
  const timeStamp = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  return timeStamp;
}