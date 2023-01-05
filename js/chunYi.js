// 切換
const toggleButton = document.querySelector(".toggleButton")
const body = document.querySelector("body")
const nav = document.querySelector(".nav")
function toggle() {
    toggleButton.classList.toggle("light")
    body.classList.toggle("light")
    nav.classList.toggle("light")
    $(".background_image_1").toggle()
}
/* 現在是不是沒有toggleButton_1 */
/*
const toggleButton=document.querySelector(".toggleButton");
const toggleButton_1=document.querySelector(".toggleButton_1");
const body=document.querySelector("body");
const nav = document.querySelector(".nav");
function toggle(){
    toggleButton_1.classList.toggle("light");
    toggleButton.classList.toggle("light");
    body.classList.toggle("light");
    nav.classList.toggle("light");
    $(".background_image_1").toggle();
    
}*/

// 彈跳視窗
document.onclick = function (click) {
    const chartWindow = document.querySelector("#chart_window")
    const chartHeaderBackground = document.querySelector(".chart_window_header_background")
    if (click.target.className === "town_meun_button") {
        chartWindow.style.display = "block"
        chartHeaderBackground.style.display = "block"
    }
}

// 滑鼠移入chartHeader，底色變色
const chartHeader = document.querySelector(".chart_window_header")
const tabs = document.querySelectorAll(".tab_chart_window_header")
tabs.forEach((tab) => {
    //滑鼠移入變色
    tab.addEventListener("mouseenter", (event) => {
        event.target.style.backgroundColor = "#202020"
    })

    //滑鼠移出變色
    tab.addEventListener("mouseleave", (event) => {
        event.target.style.backgroundColor = ""
    })

    // 點擊chartHeader，邊框底色變色
    tab.addEventListener("click", (event) => {
        tabs.forEach((tab) => tab.classList.remove("highlighted"))
        event.target.classList.add("highlighted")
    })
})
