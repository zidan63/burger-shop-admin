export const formatDate = (date: number) => {
  if (!date) return "Chưa có";
  const dateTime = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  };

  return dateTime.toLocaleString("en-GB", options).replace(",", "");
};
