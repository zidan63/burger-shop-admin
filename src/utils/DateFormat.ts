export const formatDate = (date: any) => {
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

export const formatMoney = (amount: number) => {
  // Sử dụng Intl.NumberFormat để định dạng số
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Định dạng số và trả về chuỗi đã được định dạng
  return formatter.format(amount);
};
