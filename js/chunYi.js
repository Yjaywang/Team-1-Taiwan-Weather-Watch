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

// 滑鼠移入chartHeader，底色變色
const chartHeader = document.querySelector(".chart_window_header")
const tabs = document.querySelectorAll(".tab_chart_window_header")
tabs.forEach((tab) => {
    /*  改用CSS hover完成這部分的功能
        //滑鼠移入變色
        tab.addEventListener("mouseenter", (event) => {
            event.target.style.backgroundColor = "#202020"
        })

        //滑鼠移出變色
        tab.addEventListener("mouseleave", (event) => {
            event.target.style.backgroundColor = ""
        }) 
    */

    // 點擊chartHeader，邊框底色變色
    tab.addEventListener("click", (event) => {
        tabs.forEach((tab) => tab.classList.remove("highlighted"))
        event.target.classList.add("highlighted")
    })
})

/* 彈出視窗切換 */
const tab_weeks = document.getElementById("tab_weeks")
const tab_3hr_table = document.getElementById("tab_3hr_table")
const tab_curve_other = document.getElementById("tab_curve_other")
const tab_curve_temper = document.getElementById("tab_curve_temper")
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
tab_curve_other.addEventListener("click", (e) => {
    for (let i of popupScreen) {
        if (i !== mainChart) {
            i.classList.add("none")
        }
    }
    mainChart.classList.remove("none")
})

tab_curve_temper.addEventListener("click", (e) => {
    for (let i of popupScreen) {
        if (i !== secondChart) {
            i.classList.add("none")
        }
    }
    secondChart.classList.remove("none")
})
