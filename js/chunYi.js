const date = document.querySelector(".date")
const today = new Date()

// 當下日期
function getDatetime() {
    date.innerHTML = today.getMonth() + 1 + " / " + today.getDate()
}
// 進入網頁執行
getDatetime()

// 切換
const toggleButton = document.querySelector("#toggleButton")
const body = document.querySelector("body")
function toggle() {
    toggleButton.classList.toggle("light")
    body.classList.toggle("light")
}
