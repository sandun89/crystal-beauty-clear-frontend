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
