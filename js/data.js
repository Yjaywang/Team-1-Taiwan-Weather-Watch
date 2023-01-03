import { cityDistList } from "./city.js"
let allDistWeatherData = {}
let allCityWeatherData = {}
const authorization = "CWB-25142137-EFE4-4F9E-9B46-D41BF5BD73D5"
class City {
    constructor(city, num, list) {
        this.cityName = city
        this.cityNum = num
        this.cityDistList = list
    }
}

const G_Yilan = new City("宜蘭縣", "001", cityDistList.G_Yilan)
const H_Taoyuan = new City("桃園市", "005", cityDistList.H_Taoyuan)
const J_Hsinchu = new City("新竹縣", "009", cityDistList.J_Hsinchu)
const K_Miaoli = new City("苗栗縣", "013", cityDistList.K_Miaoli)
const N_Changhua = new City("彰化縣", "017", cityDistList.N_Changhua)
const M_Nantou = new City("南投縣", "021", cityDistList.M_Nantou)
const P_Yunlin = new City("雲林縣", "025", cityDistList.P_Yunlin)
const Q_Chiayi = new City("嘉義縣", "029", cityDistList.Q_Chiayi)
const T_Pingtung = new City("屏東縣g", "033", cityDistList.T_Pingtung)
const V_Taitung = new City("臺東縣", "037", cityDistList.V_Taitung)
const U_Hualien = new City("花蓮縣", "041", cityDistList.U_Hualien)
const X_Penghu = new City("澎湖縣", "045", cityDistList.X_Penghu)
const C_Keelung = new City("基隆市g", "049", cityDistList.C_Keelung)
const O_Hsinchu = new City("新竹市", "053", cityDistList.O_Hsinchu)
const I_Chiayi = new City("嘉義市", "057", cityDistList.I_Chiayi)
const A_Taipei = new City("臺北市", "061", cityDistList.A_Taipei)
const E_Kaohsiung = new City("高雄市", "065", cityDistList.E_Kaohsiung)
const F_New_Taipei = new City("新北市", "069", cityDistList.F_New_Taipei)
const B_Taichung = new City("臺中市", "073", cityDistList.B_Taichung)
const D_Tainan = new City("臺南市", "077", cityDistList.D_Tainan)
const Z_Lianjiang = new City("連江縣", "081", cityDistList.Z_Lianjiang)
const W_Kinmen = new City("金門縣", "085", cityDistList.W_Kinmen)

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
        console.log(allCityWeatherData[B_Taichung.cityName])
        return data
    } catch (err) {
        console.log("fetch failed:", err)
    }
}

/* 鄉鎮資訊API */
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

getDistWeatherData(H_Taoyuan.cityNum)
getCityWeatherData()
