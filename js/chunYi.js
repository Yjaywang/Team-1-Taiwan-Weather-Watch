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

/* 彈出視窗切換 */
const tab_weeks = document.getElementById("tab_weeks")
const tab_3hr_table = document.getElementById("tab_3hr_table")
const tab_body = document.getElementById("tab_body")
const tab_body1 = document.getElementById("tab_body1")
const three = document.getElementById("three")
const week = document.getElementById("week")
const mainChart = document.getElementById("mainChart")
const secondChart = document.getElementById("secondChart")
const popupScreen = [three, week, mainChart, secondChart]

tab_weeks.addEventListener("click", (e) => {
    for (let i of popupScreen) {
        if (i !== week) {
            i.classList.add("none")
        }
    }
    week.classList.remove("none")
})
tab_3hr_table.addEventListener("click", (e) => {
    for (let i of popupScreen) {
        if (i !== three) {
            i.classList.add("none")
        }
    }
    three.classList.remove("none")
})
tab_body.addEventListener("click", (e) => {
    for (let i of popupScreen) {
        if (i !== mainChart) {
            i.classList.add("none")
        }
    }
    mainChart.classList.remove("none")
})

tab_body1.addEventListener("click", (e) => {
    for (let i of popupScreen) {
        if (i !== secondChart) {
            i.classList.add("none")
        }
    }
    secondChart.classList.remove("none")
})
