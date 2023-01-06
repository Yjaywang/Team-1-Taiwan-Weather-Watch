/*  chart設定*/
export function chartGenerate(city = "台北", dist = "信義區", temperature, rh, uvi) {
    Highcharts.setOptions({
        time: {
            timezoneOffset: -480,
        },
        lang: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月"],
            shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            weekdays: ["(日)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)"],
        },
    })
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const date = `${year}/${month}/${day}`
    let chart = Highcharts.chart("container", {
        chart: {
            zoomType: "xy",
            height: 600,
            style: {
                fontSize: "13px",
            },
        },
        time: { timezoneOffset: -480 },
        title: {
            text: `${city}${dist}`,
            align: "left",
            y: 5,
            x: 10,
            style: {
                fontWeight: "bold",
            },
        },
        subtitle: {
            text: "Source: 中央氣象局",
            align: "left",
            y: 30,
            x: 10,
        },
        xAxis: [
            {
                type: "datetime",
                tickInterval: 24 * 3600 * 1000,
                crosshair: true,
                tickWidth: 1,
                tickLength: 10,
                labels: {
                    format: "{value:%b%e}日 {value:%a}",
                    y: 20,
                },
                scrollbar: {
                    enabled: false,
                },
            },
        ],
        plotOptions: {
            series: {
                pointStart: new Date(`${date}`).getTime(),
                pointInterval: 24 * 3600 * 1000, // one day
            },
        },
        yAxis: [
            {
                // Primary yAxis
                labels: {
                    format: "{value}°C",
                    style: {
                        color: Highcharts.getOptions().colors[3],
                    },
                },
                title: {
                    text: "溫度（°C）",
                    style: {
                        color: Highcharts.getOptions().colors[3],
                    },
                },
            },
            {
                // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: "紫外線指數",
                    style: {
                        color: Highcharts.getOptions().colors[4],
                    },
                },
                labels: {
                    format: "{value} uvi",
                    style: {
                        color: Highcharts.getOptions().colors[4],
                    },
                },
                opposite: true,
            },
            {
                // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: "平均相對溼度 (%)",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                labels: {
                    format: "{value} %",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                opposite: true,
            },
        ],
        tooltip: {
            shared: true,
        },
        legend: {
            align: "center",
            x: 0,
            verticalAlign: "top",
            y: 10,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                "rgba(255,255,255,0.25)",
            itemDistance: 40,
            itemStyle: {
                fontSize: "15px",
            },
        },
        series: [
            {
                name: "紫外線指數",
                type: "spline",
                color: "#8085e5",
                yAxis: 1,
                data: uvi,
                tooltip: {
                    valueSuffix: " uvi",
                },
            },
            {
                name: "平均相對濕度",
                type: "spline",
                yAxis: 2,
                data: rh,
                color: "#7CB3E6",
                marker: {
                    enabled: false,
                },
                tooltip: {
                    valueSuffix: "°C",
                },
                allowPointSelect: true,
            },
            {
                name: "平均溫度",
                type: "spline",
                data: temperature,
                tooltip: {
                    valueSuffix: " °C",
                },
                color: "#ff8c00",
                allowPointSelect: true,
            },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                            x: 0,
                            y: 0,
                        },
                        yAxis: [
                            {
                                labels: {
                                    align: "right",
                                    x: 0,
                                    y: -6,
                                },
                                showLastLabel: true,
                            },
                            {
                                labels: {
                                    align: "left",
                                    x: 0,
                                    y: -6,
                                },
                                showLastLabel: true,
                            },
                            {
                                visible: true,
                            },
                        ],
                    },
                },
            ],
        },
    })
}

/*  chart設定*/
export function tempChartGenerate(city = "台北", dist = "信義區", maxAT, minAT) {
    Highcharts.setOptions({
        time: {
            timezoneOffset: -480,
        },
        lang: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月"],
            shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            weekdays: ["(日)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)"],
        },
    })
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const date = `${year}/${month}/${day}`
    let chart1 = Highcharts.chart("container1", {
        chart: {
            zoomType: "xy",
            height: 600,
        },
        time: { timezoneOffset: -480 },
        title: {
            text: `${city}${dist}`,
            align: "left",
            y: 5,
            x: 10,
            style: {
                fontWeight: "bold",
            },
        },
        subtitle: {
            text: "Source: 中央氣象局",
            align: "left",
            y: 30,
            x: 10,
        },
        xAxis: [
            {
                type: "datetime",
                tickInterval: 24 * 3600 * 1000,
                crosshair: true,
                tickWidth: 1,
                tickLength: 10,
                labels: {
                    format: "{value:%b%e}日 {value:%a}",
                    y: 20,
                },
            },
        ],
        plotOptions: {
            series: {
                pointStart: new Date(`${date}`).getTime(),
                pointInterval: 24 * 3600 * 1000, // one day
            },
        },
        yAxis: [
            {
                // Primary yAxis
                labels: {
                    format: "{value}°C",
                    style: {
                        color: Highcharts.getOptions().colors[1],
                    },
                },
                title: {
                    text: "溫度（°C）",
                    style: {
                        color: Highcharts.getOptions().colors[7],
                    },
                },
            },
        ],
        tooltip: {
            shared: true,
        },
        legend: {
            align: "center",
            x: 0,
            verticalAlign: "top",
            y: 10,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                "rgba(255,255,255,0.25)",
            itemDistance: 40,
            itemStyle: {
                fontSize: "15px",
            },
        },
        series: [
            {
                name: "體感高溫",
                data: maxAT,
                color: "#ff8c00",
            },
            {
                name: "體感低溫",
                data: minAT,
                color: "#009acd",
            },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                            x: 0,
                            y: 0,
                        },
                        yAxis: [
                            {
                                labels: {
                                    align: "right",
                                    x: 0,
                                    y: -6,
                                },
                                showLastLabel: false,
                            },
                        ],
                    },
                },
            ],
        },
    })
}
