const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const day = now.getDay();
const weekday = ["日","月","火","水","木","金","土"];

const showDate = `${year}年${month}月${date}日${weekday[day]}曜日`
document.getElementById("date").textContent = showDate;
