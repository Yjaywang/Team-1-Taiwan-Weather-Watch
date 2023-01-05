import { 
    currentCityWeatherData, 
    getDistWeekWeatherData, 
    getTownshipWeeklyData, 
} from "./data.js"
import { cityDistList } from "./city.js"

//更改鄉鎮選單
function getTowns() {
    let option = document.querySelectorAll("option")
    if (option.length > 2) {
        console.log(1)
        let select = document.querySelector("select")
        for (let x = 2; x < option.length; x++) {
            select.removeChild(option[x])
        }
    }
    let location = $(".city").text()
    const TownsAmount = cityDistList[location].length
    let fragment = document.createDocumentFragment()
    for (let x = 1; x < TownsAmount; x++) {
        $("option:last").html(cityDistList[location][0])
        $("option:last").clone().html(cityDistList[location][x]).appendTo(fragment)
    }
    document.querySelector(".town_meun").appendChild(fragment)
}
//開網頁偵測地區更動鄉鎮市選單
window.onload = () => {
    getTowns()
}

//clickTaiwan
const htmlIDToApiID = {
    C10017: "049",
    C65: "069",
    C63: "061",
    C68: "005",
    C10004: "009",
    C10018: "053",
    C10005: "013",
    C66: "073",
    C10008: "021",
    C10007: "017",
    C10009: "025",
    C10010: "029",
    C10020: "057",
    C67: "077",
    C64: "065",
    C10013: "033",
    C10014: "037",
    C10015: "041",
    C10002: "001",
    C10016: "045",
    C09020: "085",
    C09007: "081",
}

const htmlIDToPosition = {
    C10017: "310 30",
    C65: "280 65",
    C63: "288 30",
    C68: "240 55",
    C10004: "235 95",
    C10018: "210 80",
    C10005: "210 130",
    C66: "180 170",
    C10008: "220 200",
    C10007: "150 210",
    C10009: "130 235",
    C10010: "170 265",
    C10020: "142 265",
    C67: "130 320",
    C64: "130 380",
    C10013: "170 420",
    C10014: "225 350",
    C10015: "275 220",
    C10002: "300 115",
    C10016: "15 250",
    C09020: "20 150",
    C09007: "20 80",
}

const htmlIDs = [
    "C10017",
    "C65",
    "C63",
    "C68",
    "C10004",
    "C10018",
    "C10005",
    "C66",
    "C10008",
    "C10007",
    "C10009",
    "C10010",
    "C10020",
    "C67",
    "C64",
    "C10013",
    "C10014",
    "C10015",
    "C10002",
    "C10016",
    "C09020",
    "C09007",
]

htmlIDs.forEach((htmlID) => {
    const regionEl = document.querySelector(`#${htmlID}`)
    regionEl.addEventListener("click", async function () {
        //fetch information function
        let oldPathChosed = $("#chosed")[0]
        oldPathChosed.removeAttribute("style", "fill: red")
        oldPathChosed.removeAttribute("id")
        let newPathChosed = regionEl.querySelector("path")
        newPathChosed.setAttribute("style", "fill: #00c0fb")
        newPathChosed.setAttribute("id", "chosed")
        changeText(this.childNodes[1].textContent.slice(0, 3))
        goToPosition(this.id)
        getDescContents(this.id)
        getTowns()
    })
    function goToPosition(htmlID) {
        const positionEl = document.querySelector("#position")
        positionEl.setAttribute("transform", `translate(${htmlIDToPosition[htmlID]})`)
    }
    function changeText(countyName) {
        const county = document.querySelector(".city")
        const today = document.querySelector(".todayRight").childNodes[3]
        const tomorrow = document.querySelector(".tomorrow").childNodes[5]
        const later = document.querySelector(".later").childNodes[5]
        county.textContent = `${countyName}`
        currentCityWeatherData[countyName].forEach((data, index) => {
            switch (index) {
                case 0:
                    today.textContent = `${data.MinT}°-${data.MaxT}°`
                    break
                case 1:
                    tomorrow.textContent = `${data.MinT}°-${data.MaxT}°`
                    break
                case 2:
                    later.textContent = `${data.MinT}°-${data.MaxT}°`
                    break
            }
        })
    }
})

// 取得縣市的名字
const city = document.querySelector(".city")
function getDescContents(id) {
    const country = document.getElementById(id)
    const descEl = country.getElementsByTagName("desc")
    const descContent = descEl[0].textContent
    const cityName = descContent.split("區域")
    city.innerHTML = cityName[0]
}
let isChooseDist = false

/* 拿SELCET值-區域名稱 */
let distSelectName
const town_meun = document.querySelector(".town_meun")
town_meun.addEventListener("change", (e) => {
    isChooseDist = true
    distSelectName = e.target.value
})
const town_meun_button = document.querySelector(".town_meun_button")
town_meun_button.addEventListener("click", (e) => {
    if (isChooseDist) {
        getDistWeekWeatherData(city.textContent, distSelectName);
        getTownshipWeeklyData(city.textContent, distSelectName);
    } else {
    }
})

// 彈跳視窗
document.onclick = function (click) {
    const chartWindow = document.querySelector("#chart_window")
    const dialogMask = document.getElementsByClassName("dialogMask")
    const chartHeaderBackground = document.querySelector(".chart_window_header_background")
    // 打開 chart_window
    if (click.target.className === "town_meun_button") {
        if (isChooseDist) {
            chartWindow.style.display = "block"
            chartHeaderBackground.style.display = "block"
            dialogMask[0].classList.remove("none")
        }
    }
    // 點擊dialogMask 關閉chart_window
    else if(click.target.className === "dialogMask"){
            chartWindow.style.display = "none"
            chartHeaderBackground.style.display = "none"
            dialogMask[0].classList.add("none")
    }
}

/* 跑馬燈 */
export function generateMarqueeContent(weatherDescription) {
    const marqueeContent = document.getElementById("marqueeContent")
    marqueeContent.innerHTML = weatherDescription
}
