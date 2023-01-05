import { cityDistList } from "./city.js"
import { chartGenerate, tempChartGenerate } from "./chart.js"
let allDistWeatherData = {}
let allDistWeekWeatherData = {}
let allCityWeatherData = {}
let currentCityWeatherData = {}
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
const T_Pingtung = new City("屏東縣g", "033", "035", cityDistList.T_Pingtung)
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

/* 縣市二日天氣資訊API */
async function getCityWeatherData(time = "1", pop12hTime = "1") {
    try {
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
        return data
    } catch (err) {
        console.log("fetch failed:", err)
    }
}

/* 鄉鎮二日天氣資訊API */
async function getDistWeatherData(cityNum = "001", time = "1", pop12hTime = "1") {
    try {
        const response = await fetch(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${cityNum}?Authorization=${authorization}&format=JSON`
        )
        const data = await response.json()
        const dist = data.records.locations[0].location
        for (let i of dist) {
            let distWeatherData = {
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
            allDistWeatherData[i.locationName] = distWeatherData
        }
        console.log(allDistWeatherData)
        return data
    } catch (err) {
        console.log("fetch failed:", err)
    }
}

/* 鄉鎮一周天氣資訊API */
async function getDistWeekWeatherData(cityNum = "003", cityName, distName) {
    try {
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
                maxT: [
                    Number(`${i.weatherElement[12].time[1].elementValue[0].value}`),
                    Number(`${i.weatherElement[12].time[3].elementValue[0].value}`),
                    Number(`${i.weatherElement[12].time[5].elementValue[0].value}`),
                    Number(`${i.weatherElement[12].time[7].elementValue[0].value}`),
                    Number(`${i.weatherElement[12].time[9].elementValue[0].value}`),
                    Number(`${i.weatherElement[12].time[11].elementValue[0].value}`),
                    Number(`${i.weatherElement[12].time[13].elementValue[0].value}`),
                ],
                minT: [
                    Number(`${i.weatherElement[8].time[0].elementValue[0].value}`),
                    Number(`${i.weatherElement[8].time[2].elementValue[0].value}`),
                    Number(`${i.weatherElement[8].time[4].elementValue[0].value}`),
                    Number(`${i.weatherElement[8].time[6].elementValue[0].value}`),
                    Number(`${i.weatherElement[8].time[8].elementValue[0].value}`),
                    Number(`${i.weatherElement[8].time[10].elementValue[0].value}`),
                    Number(`${i.weatherElement[8].time[11].elementValue[0].value}`),
                ],
            }
            allDistWeekWeatherData[i.locationName] = distWeekWeatherData
        }
        console.log(allDistWeekWeatherData)
        const temperature = allDistWeekWeatherData[`${distName}`].t
        const uvi = allDistWeekWeatherData[`${distName}`].uvi
        const rh = allDistWeekWeatherData[`${distName}`].rh
        const maxT = allDistWeekWeatherData[`${distName}`].maxT
        const minT = allDistWeekWeatherData[`${distName}`].minT
        console.log(maxT, minT)
        chartGenerate(cityName, distName, temperature, rh, uvi)
        tempChartGenerate(cityName, distName, maxT, minT)
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
        const city = data.records.location
        for (let i of city) {
            let cityWeatherData = []
            let firstData = {}
            let secondData = {}
            let thirdData = {}
            for (let j of i.weatherElement) {
                switch (j.elementName) {
                    case "Wx":
                        loop("Wx")
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
                            firstData["startTime"] = j.time[k].startTime.slice(-8, -3)
                            firstData["endTime"] = j.time[k].endTime.slice(-8, -3)
                            let value = j.time[k].parameter.parameterName
                            firstData[key] = value
                        } else if (k == 1) {
                            secondData["startTime"] = j.time[k].startTime.slice(-8, -3)
                            secondData["endTime"] = j.time[k].endTime.slice(-8, -3)
                            let value = j.time[k].parameter.parameterName
                            secondData[key] = value
                        } else {
                            thirdData["startTime"] = j.time[k].startTime.slice(-8, -3)
                            thirdData["endTime"] = j.time[k].endTime.slice(-8, -3)
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

getDistWeekWeatherData(G_Yilan.weekWeatherApiNum, G_Yilan.cityName, "宜蘭市")

export { currentCityWeatherData }
