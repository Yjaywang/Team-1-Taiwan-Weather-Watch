import {
  currentCityWeatherData,
  getDistWeekWeatherData,
  getTownshipWeeklyData,
  getDistWeatherData,
} from "./data.js";
import { cityDistList } from "./city.js";

//更改鄉鎮選單
function getTowns() {
  let option = document.querySelectorAll("option");
  if (option.length > 2) {
    let select = document.querySelector("select");
    for (let x = 2; x < option.length; x++) {
      select.removeChild(option[x]);
    }
  }
  let location = $(".city").text();
  const TownsAmount = cityDistList[location].length;
  let fragment = document.createDocumentFragment();
  for (let x = 1; x < TownsAmount; x++) {
    $("option:last").html(cityDistList[location][0]);
    $("option:last").clone().html(cityDistList[location][x]).appendTo(fragment);
  }
  document.querySelector(".town_meun").appendChild(fragment);
}
//開網頁偵測地區更動鄉鎮市選單
window.onload = () => {
  getTowns();
};
window.addEventListener("load", function () {
  let intervalId = setInterval(() => {
    if (currentCityWeatherData["臺北市"]) {
      changeText("臺北市");
      // Stop the interval when the data is available
      clearInterval(intervalId);
    }
  }, 0.05);
});
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
};

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
};

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
];

htmlIDs.forEach((htmlID) => {
  const regionEl = document.querySelector(`#${htmlID}`);
  regionEl.addEventListener("click", async function () {
    //fetch information function
    let oldPathChosed = $("#chosed")[0];
    oldPathChosed.removeAttribute("style", "fill: red");
    oldPathChosed.removeAttribute("id");
    let newPathChosed = regionEl.querySelector("path");
    newPathChosed.setAttribute("style", "fill: #00c0fb");
    newPathChosed.setAttribute("id", "chosed");
    changeText(this.childNodes[1].textContent.slice(0, 3));
    goToPosition(this.id);
    getDescContents(this.id);
    getTowns();
  });
  function goToPosition(htmlID) {
    const positionEl = document.querySelector("#position");
    positionEl.setAttribute(
      "transform",
      `translate(${htmlIDToPosition[htmlID]})`
    );
  }
});
// 檢查天氣圖片
function checkweatherImg(wx) {
  const code = +wx;
  const weatherTypes = {
    isThunderstorm: [
      15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41, 8, 9, 10, 11, 12, 13, 14, 19,
      20, 29, 30, 31, 32, 38, 39, 23, 37, 42,
    ],
    isClear: [1],
    isCloudy: [2, 3, 4, 5, 6, 7, 24, 25, 26, 27, 28],
  };
  if (weatherTypes.isThunderstorm.includes(code)) {
    return "img/rain.svg";
  } else if (weatherTypes.isCloudy.includes(code)) {
    return "img/cloudy.svg";
  } else {
    return "img/sunny.svg";
  }
}
// 串接今明36小時天氣預報api資料
function changeText(countyName) {
  const todayText = document.querySelector(".todayRight").childNodes[3];
  const time = document.querySelector(".todayRight").childNodes[5];
  const todayImg = document.querySelector(".todayRight img");
  const today = document.querySelector(".todayRight").childNodes[9];
  const pop = document.querySelector(".todayRight").childNodes[11];
  const tomorrowText = document.querySelector(".tomorrow").childNodes[1];
  const tomorrowImg = document.querySelector(".tomorrow img");
  const tomorrow = document.querySelector(".tomorrow").childNodes[5];
  const laterText = document.querySelector(".later").childNodes[1];
  const laterImg = document.querySelector(".later img");
  const later = document.querySelector(".later").childNodes[5];
  currentCityWeatherData[countyName].forEach((data, index) => {
    switch (index) {
      case 0:
        time.textContent = `${data.startTime}~${data.endTime}`;
        todayImg.setAttribute("src", checkweatherImg(data.wx));
        today.textContent = `${data.MinT}°-${data.MaxT}°`;
        pop.textContent = `${data.PoP}%`;
        if (data.startTime == "00:00") {
          todayText.textContent = "今日凌晨";
          tomorrowText.textContent = "今日白天";
          laterText.textContent = "今日晚上";
        } else if (data.startTime == "06:00" || data.startTime == "12:00") {
          todayText.textContent = "今日白天";
          tomorrowText.textContent = "今晚明晨";
          laterText.textContent = "明日白天";
        } else if (data.startTime == "18:00") {
          todayText.textContent = "今晚明晨";
          tomorrowText.textContent = "明日白天";
          laterText.textContent = "明日晚上";
        }
        break;
      case 1:
        tomorrowImg.setAttribute("src", checkweatherImg(data.wx));
        tomorrow.textContent = `${data.MinT}°-${data.MaxT}°`;
        break;
      case 2:
        laterImg.setAttribute("src", checkweatherImg(data.wx));
        later.textContent = `${data.MinT}°-${data.MaxT}°`;
        break;
    }
  });
}

// 取得縣市的名字
const city = document.querySelector(".city");
function getDescContents(id) {
  const country = document.getElementById(id);
  const descEl = country.getElementsByTagName("desc");
  const descContent = descEl[0].textContent;
  const cityName = descContent.split("區域");
  city.innerHTML = cityName[0];
}
let isChooseDist = false;

/* 拿SELCET值-區域名稱 */
let distSelectName;
const town_meun = document.querySelector(".town_meun");
town_meun.addEventListener("change", (e) => {
  isChooseDist = true;
  distSelectName = e.target.value;
});
const town_meun_button = document.querySelector(".town_meun_button");
town_meun_button.addEventListener("click", (e) => {
  if (isChooseDist) {
    getDistWeekWeatherData(city.textContent, distSelectName);
    getTownshipWeeklyData(city.textContent, distSelectName);
    getDistWeatherData(city.textContent, distSelectName);
  } else {
  }
});

// 彈跳視窗
document.onclick = function (click) {
  const chartWindow = document.querySelector("#chart_window");
  const dialogMask = document.getElementsByClassName("dialogMask");
  const chartHeaderBackground = document.querySelector(
    ".chart_window_header_background"
  );
  if (click.target.className === "town_meun_button") {
    if (isChooseDist) {
      chartWindow.style.display = "block";
      chartHeaderBackground.style.display = "block";
      dialogMask[0].classList.remove("none");
    } else {
    }
  }
};

/* 跑馬燈 */
export function generateMarqueeContent(weatherDescription) {
  const marqueeContent = document.getElementById("marqueeContent");
  marqueeContent.innerHTML = weatherDescription;
}
