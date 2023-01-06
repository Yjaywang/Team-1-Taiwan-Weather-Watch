import { cityDistList } from "./city.js"
import { chartGenerate, tempChartGenerate } from "./chart.js"
let allDistWeekWeatherData = {}
let allCityWeatherData = {}
let currentCityWeatherData = {}
let allTownshipWeeklyData = {}
let allDistWeatherData = {}
const authorization = "CWB-38D05447-1373-4B83-8E52-FEE50DA80FAD"
class City {
    constructor(city, num, weekNum, list) {
        this.cityName = city
        this.dayWeatherApiNum = num
        this.weekWeatherApiNum = weekNum
        this.cityDistList = list
    }
}

const G_Yilan = new City("宜蘭縣", "001", "003", cityDistList.G_Yilan)
const H_Taoyuan = new City("桃園市", "005", "007", cityDistList.H_Taoyuan)
const J_Hsinchu = new City("新竹縣", "009", "011", cityDistList.J_Hsinchu)
const K_Miaoli = new City("苗栗縣", "013", "015", cityDistList.K_Miaoli)
const N_Changhua = new City("彰化縣", "017", "019", cityDistList.N_Changhua)
const M_Nantou = new City("南投縣", "021", "023", cityDistList.M_Nantou)
const P_Yunlin = new City("雲林縣", "025", "027", cityDistList.P_Yunlin)
const Q_Chiayi = new City("嘉義縣", "029", "031", cityDistList.Q_Chiayi)
const T_Pingtung = new City("屏東縣", "033", "035", cityDistList.T_Pingtung)
const V_Taitung = new City("臺東縣", "037", "039", cityDistList.V_Taitung)
const U_Hualien = new City("花蓮縣", "041", "043", cityDistList.U_Hualien)
const X_Penghu = new City("澎湖縣", "045", "047", cityDistList.X_Penghu)
const C_Keelung = new City("基隆市g", "049", "051", cityDistList.C_Keelung)
const O_Hsinchu = new City("新竹市", "053", "055", cityDistList.O_Hsinchu)
const I_Chiayi = new City("嘉義市", "057", "059", cityDistList.I_Chiayi)
const A_Taipei = new City("臺北市", "061", "063", cityDistList.A_Taipei)
const E_Kaohsiung = new City("高雄市", "065", "067", cityDistList.E_Kaohsiung)
const F_New_Taipei = new City("新北市", "069", "071", cityDistList.F_New_Taipei)
const B_Taichung = new City("臺中市", "073", "075", cityDistList.B_Taichung)
const D_Tainan = new City("臺南市", "077", "079", cityDistList.D_Tainan)
const Z_Lianjiang = new City("連江縣", "081", "083", cityDistList.Z_Lianjiang)
const W_Kinmen = new City("金門縣", "085", "087", cityDistList.W_Kinmen)
const cityList = [
    G_Yilan,
    H_Taoyuan,
    J_Hsinchu,
    K_Miaoli,
    N_Changhua,
    M_Nantou,
    P_Yunlin,
    Q_Chiayi,
    T_Pingtung,
    V_Taitung,
    U_Hualien,
    X_Penghu,
    C_Keelung,
    O_Hsinchu,
    I_Chiayi,
    A_Taipei,
    E_Kaohsiung,
    F_New_Taipei,
    B_Taichung,
    D_Tainan,
    Z_Lianjiang,
    W_Kinmen,
]
/* 縣市二日天氣資訊API */
export async function getCityWeatherData(cityName = "臺北市", time = "1", pop12hTime = "1") {
    try {
        let cityNum
        for (let i of cityList) {
            if (i.cityName === cityName) {
                cityNum = i.dayWeatherApiNum
            }
        }
        const response = await fetch(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${authorization}&format=JSON`
        )
        const data = await response.json()
        const city = data.records.locations[0].location
        for (let i of city) {
            let cityWeatherData = {
                pop12h: `${i.weatherElement[0].time[pop12hTime].elementValue[0].value}%`,
                wx: i.weatherElement[1].time[time].elementValue[0].value,
                at: `${i.weatherElement[2].time[time].elementValue[0].value}°C攝氏度`,
                t: `${i.weatherElement[3].time[time].elementValue[0].value}°C攝氏度`,
                rh: `${i.weatherElement[4].time[time].elementValue[0].value}%`,
                ci: i.weatherElement[5].time[time].elementValue[1].value,
                weatherDescription: i.weatherElement[6].time[time].elementValue[0].value,
                wsSpeed: `${i.weatherElement[8].time[time].elementValue[0].value}公尺/秒`,
                wsSize: `${i.weatherElement[8].time[time].elementValue[1].value}蒲福風級`,
                wd: i.weatherElement[9].time[time].elementValue[0].value,
                td: `${i.weatherElement[10].time[time].elementValue[0].value}°C攝氏度`,
            }
            allCityWeatherData[i.locationName] = cityWeatherData
        }
        const marqueeContent = document.getElementById("marqueeContent")
        let weatherDescription = allCityWeatherData[`${cityName}`].weatherDescription
        marqueeContent.innerHTML = weatherDescription
        return data
    } catch (err) {
        console.log("fetch failed:", err)
    }
}

/* 鄉鎮二日天氣資訊API */
export async function getDistWeatherData(cityName = "宜蘭縣", distName = "頭城鎮") {
    try {
        let cityNum
        for (let i of cityList) {
            if (i.cityName === cityName) {
                cityNum = i.dayWeatherApiNum
            }
        }
        const response = await fetch(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${cityNum}?Authorization=${authorization}&format=JSON`
        )
        const data = await response.json()
        const dist = await data.records.locations[0].location
        for (let i of dist) {
            if (distName == i.locationName) {
                let distWeatherData = []
                for (let x = 0; x <= 23; x++) {
                    data[x] = {}
                }
                for (let j = 1; j < i.weatherElement.length; j++) {
                    for (let k in i.weatherElement[j].time) {
                        if (i.weatherElement[j].elementName === "CI") {
                            data[k][`${i.weatherElement[j].elementName}`] =
                                i.weatherElement[j].time[k].elementValue[1].value
                        } else if (i.weatherElement[j].elementName === "PoP6h") {
                            switch (k) {
                                case "0":
                                    data[0]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[1]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "1":
                                    data[2]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[3]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "2":
                                    data[4]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[5]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "3":
                                    data[6]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[7]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "4":
                                    data[8]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[9]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "5":
                                    data[10]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[11]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "6":
                                    data[12]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[13]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "7":
                                    data[14]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[15]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "8":
                                    data[16]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[17]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "9":
                                    data[18]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[19]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "10":
                                    data[20]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[21]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                case "11":
                                    data[22]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    data[23]["PoP6h"] = i.weatherElement[j].time[k].elementValue[0].value
                                    break
                                default:
                                    console.log("something error")
                            }
                        } else if (i.weatherElement[j].time[k].dataTime) {
                            data[k][`${i.weatherElement[j].elementName}`] =
                                i.weatherElement[j].time[k].elementValue[0].value
                            data[k]["date"] = i.weatherElement[j].time[k].dataTime.slice(5, 10)
                            data[k]["time"] = i.weatherElement[j].time[k].dataTime.slice(-8, -3)
                        } else {
                            data[k][`${i.weatherElement[j].elementName}`] =
                                i.weatherElement[j].time[k].elementValue[0].value
                        }
                    }
                }
                distWeatherData.push(
                    data[0],
                    data[1],
                    data[2],
                    data[3],
                    data[4],
                    data[5],
                    data[6],
                    data[7],
                    data[8],
                    data[9],
                    data[10],
                    data[11],
                    data[12],
                    data[13],
                    data[14],
                    data[15],
                    data[16],
                    data[17],
                    data[18],
                    data[19],
                    data[20],
                    data[21],
                    data[22],
                    data[23]
                )
                allDistWeatherData[i.locationName] = distWeatherData
            }
        }
        createThreeHoursData(distName)

        function createThreeHoursData(distName) {
            const wrapper = document.querySelector(".wrapper")
            for (let i = 0; i < 8; i++) {
                const code = `<table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <span>${allDistWeatherData[distName][i].date}</span>
                                    <div>${allDistWeatherData[distName][i].time}</div>
                                </th>
                                <td><img></td>
                                <td colspan="2">
                                    <div class="weather-info"><span>${allDistWeatherData[distName][i].CI}</span></div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>溫度</th>
                                <td><span>${allDistWeatherData[distName][i].T}°C</span></td>
                                <th>降雨機率</th>
                                <td>${allDistWeatherData[distName][i].PoP6h}%</td>
                            </tr>
                            <tr>
                                <th>體感溫度</th>
                                <td><span>${allDistWeatherData[distName][i].AT}°C</span></td>
                                <th>相對濕度</th>
                                <td>${allDistWeatherData[distName][i].RH}%</td>
                            </tr>
                            <tr>
                                <th><span>蒲福風級</span></th>
                                <td><span>${allDistWeatherData[distName][i].WS}</span></td>
                            </tr>
                            <tr>
                                <th>風向</th>
                                <td>${allDistWeatherData[distName][i].WD}</td>
                                <th></th>
                                <th></th>
                            </tr>
                        </tbody>
                      </table>`
                wrapper.insertAdjacentHTML("beforeend", code)
            }
        }
    } catch (err) {
        console.log("fetch failed:", err)
    }
}

//township weekly weather for popup-window api
export async function getTownshipWeeklyData(cityName = "宜蘭縣", distName = "頭城鎮") {
    try {
        let cityNum
        for (let i of cityList) {
            if (i.cityName === cityName) {
                cityNum = i.weekWeatherApiNum
            }
        }

        const response = await fetch(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${cityNum}?Authorization=${authorization}&format=JSON`
        )
        const data = await response.json()
        const townships = data.records.locations[0].location
        for (let township of townships) {
            let townshipWeeklyData = {
                weatherStatus: [],
                maxT: [],
                minT: [],
                rainPercentage: [],
                maxBodyT: [],
                minBodyT: [],
                rh: [],
                windVelocity: [],
                windDirection: [],
                uvIndex: [],
                uvDescription: [],
                firstEndTime: "",
                startTime: [],
            }
            townshipWeeklyData.firstEndTime = township.weatherElement[0].time[0].endTime
            for (let i = 0; i < township.weatherElement[0].time.length; i++) {
                townshipWeeklyData.weatherStatus.push(township.weatherElement[6].time[i].elementValue[0].value)
                townshipWeeklyData.maxT.push(township.weatherElement[12].time[i].elementValue[0].value)
                townshipWeeklyData.minT.push(township.weatherElement[8].time[i].elementValue[0].value)
                townshipWeeklyData.rainPercentage.push(township.weatherElement[0].time[i].elementValue[0].value)
                townshipWeeklyData.maxBodyT.push(township.weatherElement[5].time[i].elementValue[0].value)
                townshipWeeklyData.minBodyT.push(township.weatherElement[11].time[i].elementValue[0].value)
                townshipWeeklyData.rh.push(township.weatherElement[2].time[i].elementValue[0].value)
                townshipWeeklyData.windVelocity.push(township.weatherElement[4].time[i].elementValue[1].value)
                townshipWeeklyData.windDirection.push(township.weatherElement[13].time[i].elementValue[0].value)
                townshipWeeklyData.startTime.push(township.weatherElement[0].time[i].startTime)
            }
            for (let uv of township.weatherElement[9].time) {
                townshipWeeklyData.uvIndex.push(uv.elementValue[0].value)
                townshipWeeklyData.uvDescription.push(uv.elementValue[1].value)
            }
            allTownshipWeeklyData[township.locationName] = townshipWeeklyData
        }

        ////create elements////
        createWeeklyData(distName)

        function createWeeklyData(townshipName) {
            const counts = allTownshipWeeklyData[townshipName].weatherStatus.length
            const firstEndTime = allTownshipWeeklyData[townshipName].firstEndTime
            const weekEl = document.querySelector("#week")
            const wrapperEl = weekEl.querySelector(".wrapper")
            let i = 0
            if (firstEndTime.slice(-8) === "06:00:00") {
                i++
            }
            for (i; i < counts; i++) {
                const spanWeatherInfo = document.createElement("span")
                const divWeatherInfo = document.createElement("div")
                divWeatherInfo.className = "weather-info"
                spanWeatherInfo.textContent = allTownshipWeeklyData[townshipName].weatherStatus[i]
                divWeatherInfo.appendChild(spanWeatherInfo)

                //////////////////////////////////////////////////
                const startTime = allTownshipWeeklyData[townshipName].startTime[i]
                const thDate = document.createElement("th")
                const spanDate = document.createElement("span")
                const divTime = document.createElement("div")
                spanDate.textContent = startTime.slice(5, 10)
                if (startTime.slice(-8) === "18:00:00") {
                    divTime.textContent = "晚上"
                } else {
                    divTime.textContent = "白天"
                }
                thDate.appendChild(spanDate)
                thDate.appendChild(divTime)

                /////wait crawling result
                const tdImg = document.createElement("td")
                const img = document.createElement("img")
                tdImg.appendChild(img)

                const tdWeatherInfo = document.createElement("td")
                tdWeatherInfo.setAttribute("colspan", "2")
                tdWeatherInfo.appendChild(divWeatherInfo)

                const thTemp = document.createElement("th")
                const tdTemp = document.createElement("td")
                const spanTemp = document.createElement("span")
                const maxT = allTownshipWeeklyData[townshipName].maxT[i]
                const minT = allTownshipWeeklyData[townshipName].minT[i]
                thTemp.textContent = "溫度"
                spanTemp.textContent = `${minT}~${maxT}°C`
                tdTemp.appendChild(spanTemp)

                const thRaining = document.createElement("th")
                const tdRaining = document.createElement("td")
                thRaining.textContent = "降雨機率"
                if (allTownshipWeeklyData[townshipName].rainPercentage[i] === " ") {
                    tdRaining.textContent = "-"
                } else {
                    tdRaining.textContent = `${allTownshipWeeklyData[townshipName].rainPercentage[i]}%`
                }

                const thBodyTemp = document.createElement("th")
                const tdBodyTemp = document.createElement("td")
                const spanBodyTemp = document.createElement("span")
                const maxBodyT = allTownshipWeeklyData[townshipName].maxBodyT[i]
                const minBodyT = allTownshipWeeklyData[townshipName].minBodyT[i]
                thBodyTemp.textContent = "體感溫度"
                spanBodyTemp.textContent = `${minBodyT}~${maxBodyT}°C`
                tdBodyTemp.appendChild(spanBodyTemp)

                const thRh = document.createElement("th")
                const tdRh = document.createElement("td")
                thRh.textContent = "相對濕度"
                tdRh.textContent = `${allTownshipWeeklyData[townshipName].rh[i]}%`

                const thWingVel = document.createElement("th")
                const spanThWingVel = document.createElement("span")
                const tdWingVel = document.createElement("td")
                const spanTdWingVel = document.createElement("span")
                spanThWingVel.textContent = "蒲福風級"
                spanTdWingVel.textContent = allTownshipWeeklyData[townshipName].windVelocity[i]
                tdWingVel.appendChild(spanTdWingVel)
                thWingVel.appendChild(spanThWingVel)

                const thUV = document.createElement("th")
                const tdUV = document.createElement("td")
                if (firstEndTime.slice(-8) === "18:00:00" && i % 2 === 0) {
                    thUV.textContent = "紫外線"
                    tdUV.textContent = allTownshipWeeklyData[townshipName].uvIndex[Math.floor(i / 2)]
                } else if (firstEndTime.slice(-8) === "06:00:00" && i % 2 === 1) {
                    thUV.textContent = "紫外線"
                    tdUV.textContent = allTownshipWeeklyData[townshipName].uvIndex[Math.floor(i / 2)]
                }

                const thWingDirection = document.createElement("th")
                const tdWingDirection = document.createElement("td")
                thWingDirection.textContent = "風向"
                tdWingDirection.textContent = allTownshipWeeklyData[townshipName].windDirection[i]
                const thWhat = document.createElement("th")
                const tdWhat = document.createElement("th")

                ///////////////////////////////////////////////////////
                const trHead = document.createElement("tr")
                trHead.appendChild(thDate)
                trHead.appendChild(tdImg)
                trHead.appendChild(tdWeatherInfo)

                const trBodyFirst = document.createElement("tr")
                trBodyFirst.appendChild(thTemp)
                trBodyFirst.appendChild(tdTemp)
                trBodyFirst.appendChild(thRaining)
                trBodyFirst.appendChild(tdRaining)

                const trBodySecond = document.createElement("tr")
                trBodySecond.appendChild(thBodyTemp)
                trBodySecond.appendChild(tdBodyTemp)
                trBodySecond.appendChild(thRh)
                trBodySecond.appendChild(tdRh)

                const trBodyThird = document.createElement("tr")
                trBodyThird.appendChild(thWingVel)
                trBodyThird.appendChild(tdWingVel)
                trBodyThird.appendChild(thUV)
                trBodyThird.appendChild(tdUV)

                const trBodyFourth = document.createElement("tr")
                trBodyFourth.appendChild(thWingDirection)
                trBodyFourth.appendChild(tdWingDirection)
                trBodyFourth.appendChild(thWhat)
                trBodyFourth.appendChild(tdWhat)

                /////////////////////////////////////////////////////
                const thead = document.createElement("thead")
                thead.appendChild(trHead)

                const tbody = document.createElement("tbody")
                tbody.appendChild(trBodyFirst)
                tbody.appendChild(trBodySecond)
                tbody.appendChild(trBodyThird)
                tbody.appendChild(trBodyFourth)

                ////////////////////////////////////////////////////////
                const table = document.createElement("table")
                table.className = "table"
                table.appendChild(thead)
                table.appendChild(tbody)

                //////////////////////////////////////////////////////////
                wrapperEl.appendChild(table)
            }
        }
    } catch (error) {
        console.log(`error message: ${error}`)
    }
}

/* 鄉鎮一周天氣資訊API */
export async function getDistWeekWeatherData(cityName = "宜蘭縣", distName = "頭城鎮") {
    try {
        let cityNum
        for (let i of cityList) {
            if (i.cityName === cityName) {
                cityNum = i.weekWeatherApiNum
            }
        }
        const response = await fetch(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${cityNum}?Authorization=${authorization}&format=JSON`
        )
        const data = await response.json()
        const dist = data.records.locations[0].location
        for (let i of dist) {
            let distWeekWeatherData = {
                t: [
                    Number(`${i.weatherElement[1].time[1].elementValue[0].value}`),
                    Number(`${i.weatherElement[1].time[3].elementValue[0].value}`),
                    Number(`${i.weatherElement[1].time[5].elementValue[0].value}`),
                    Number(`${i.weatherElement[1].time[7].elementValue[0].value}`),
                    Number(`${i.weatherElement[1].time[9].elementValue[0].value}`),
                    Number(`${i.weatherElement[1].time[11].elementValue[0].value}`),
                    Number(`${i.weatherElement[1].time[13].elementValue[0].value}`),
                ],
                uvi: [
                    Number(`${i.weatherElement[9].time[0].elementValue[0].value}`),
                    Number(`${i.weatherElement[9].time[1].elementValue[0].value}`),
                    Number(`${i.weatherElement[9].time[2].elementValue[0].value}`),
                    Number(`${i.weatherElement[9].time[3].elementValue[0].value}`),
                    Number(`${i.weatherElement[9].time[4].elementValue[0].value}`),
                    Number(`${i.weatherElement[9].time[5].elementValue[0].value}`),
                    Number(`${i.weatherElement[9].time[6].elementValue[0].value}`),
                ],
                rh: [
                    Number(`${i.weatherElement[2].time[0].elementValue[0].value}`),
                    Number(`${i.weatherElement[2].time[1].elementValue[0].value}`),
                    Number(`${i.weatherElement[2].time[2].elementValue[0].value}`),
                    Number(`${i.weatherElement[2].time[3].elementValue[0].value}`),
                    Number(`${i.weatherElement[2].time[4].elementValue[0].value}`),
                    Number(`${i.weatherElement[2].time[5].elementValue[0].value}`),
                    Number(`${i.weatherElement[2].time[6].elementValue[0].value}`),
                ],
                maxAT: [
                    Number(`${i.weatherElement[5].time[1].elementValue[0].value}`),
                    Number(`${i.weatherElement[5].time[3].elementValue[0].value}`),
                    Number(`${i.weatherElement[5].time[5].elementValue[0].value}`),
                    Number(`${i.weatherElement[5].time[7].elementValue[0].value}`),
                    Number(`${i.weatherElement[5].time[9].elementValue[0].value}`),
                    Number(`${i.weatherElement[5].time[11].elementValue[0].value}`),
                    Number(`${i.weatherElement[5].time[13].elementValue[0].value}`),
                ],
                minAT: [
                    Number(`${i.weatherElement[11].time[0].elementValue[0].value}`),
                    Number(`${i.weatherElement[11].time[2].elementValue[0].value}`),
                    Number(`${i.weatherElement[11].time[4].elementValue[0].value}`),
                    Number(`${i.weatherElement[11].time[6].elementValue[0].value}`),
                    Number(`${i.weatherElement[11].time[8].elementValue[0].value}`),
                    Number(`${i.weatherElement[11].time[10].elementValue[0].value}`),
                    Number(`${i.weatherElement[11].time[11].elementValue[0].value}`),
                ],
            }
            allDistWeekWeatherData[i.locationName] = distWeekWeatherData
        }
        const temperature = allDistWeekWeatherData[`${distName}`].t
        const uvi = allDistWeekWeatherData[`${distName}`].uvi
        const rh = allDistWeekWeatherData[`${distName}`].rh
        const maxAT = allDistWeekWeatherData[`${distName}`].maxAT
        const minAT = allDistWeekWeatherData[`${distName}`].minAT
        chartGenerate(cityName, distName, temperature, rh, uvi)
        tempChartGenerate(cityName, distName, maxAT, minAT)
        return data
    } catch (err) {
        console.log("fetch failed:", err)
    }
}

// 最近36小時天氣資訊API
;(async function getCurrentCityWeatherData() {
    try {
        const response = await fetch(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorization}&format=JSON`
        )
        const data = await response.json()
        const city = await data.records.location
        for (let i of city) {
            let cityWeatherData = []
            let firstData = {}
            let secondData = {}
            let thirdData = {}
            for (let j of i.weatherElement) {
                switch (j.elementName) {
                    case "Wx":
                        ;(function () {
                            for (let k in j.time) {
                                if (k == 0) {
                                    firstData["startTime"] = j.time[k].startTime.slice(-8, -3)
                                    firstData["endTime"] = j.time[k].endTime.slice(-8, -3)
                                    let value = j.time[k].parameter.parameterValue
                                    firstData["wx"] = value
                                } else if (k == 1) {
                                    secondData["startTime"] = j.time[k].startTime.slice(-8, -3)
                                    secondData["endTime"] = j.time[k].endTime.slice(-8, -3)
                                    let value = j.time[k].parameter.parameterValue
                                    secondData["wx"] = value
                                } else {
                                    thirdData["startTime"] = j.time[k].startTime.slice(-8, -3)
                                    thirdData["endTime"] = j.time[k].endTime.slice(-8, -3)
                                    let value = j.time[k].parameter.parameterValue
                                    thirdData["wx"] = value
                                }
                            }
                        })()
                        break
                    case "PoP":
                        loop("PoP")
                        break
                    case "MinT":
                        loop("MinT")
                        break
                    case "CI":
                        loop("CI")
                        break
                    case "MaxT":
                        loop("MaxT")
                        break
                }
                function loop(key) {
                    for (let k in j.time) {
                        if (k == 0) {
                            let value = j.time[k].parameter.parameterName
                            firstData[key] = value
                        } else if (k == 1) {
                            let value = j.time[k].parameter.parameterName
                            secondData[key] = value
                        } else {
                            let value = j.time[k].parameter.parameterName
                            thirdData[key] = value
                        }
                    }
                }
            }
            cityWeatherData.push(firstData, secondData, thirdData)
            currentCityWeatherData[i.locationName] = cityWeatherData
        }
    } catch (err) {
        console.log("fetch failed:", err)
    }
})()

export { currentCityWeatherData }
