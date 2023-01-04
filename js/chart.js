/*  chart設定*/
export function chartGenerate(city = "台北", dist = "信義區", temperature, rh) {
    Highcharts.setOptions({
        time: {
            timezoneOffset: -480,
        },
        lang: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月"],
            shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        },
    })

    let chart = Highcharts.chart("container", {
        chart: {
            zoomType: "xy",
        },
        time: { timezoneOffset: -480 },
        title: {
            text: `${city}${dist}`,
            align: "left",
        },
        subtitle: {
            text: "Source: 中央氣象局",
            align: "left",
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
                pointStart: new Date("2023/1/").getTime(),
                pointInterval: 24 * 3600 * 1000, // one day
            },
        },
        yAxis: [
            {
                // Primary yAxis
                labels: {
                    format: "{value}°C",
                    style: {
                        color: Highcharts.getOptions().colors[7],
                    },
                },
                title: {
                    text: "溫度（°C）",
                    style: {
                        color: Highcharts.getOptions().colors[7],
                    },
                },
            },
            {
                // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: "降雨量 (mm)",
                    style: {
                        color: Highcharts.getOptions().colors[0],
                    },
                },
                labels: {
                    format: "{value} mm",
                    style: {
                        color: Highcharts.getOptions().colors[0],
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
                        color: Highcharts.getOptions().colors[4],
                    },
                },
                labels: {
                    format: "{value} %",
                    style: {
                        color: Highcharts.getOptions().colors[4],
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
        },
        series: [
            {
                name: "Rainfall",
                type: "column",
                yAxis: 1,
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6],
                tooltip: {
                    valueSuffix: " mm",
                },
            },
            {
                name: "平均相對濕度",
                type: "spline",
                yAxis: 2,
                data: rh,
                color: "#8085e5",
                marker: {
                    enabled: false,
                },
                tooltip: {
                    valueSuffix: " &",
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
                color: "#2eaed0",
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
                                showLastLabel: false,
                            },
                            {
                                labels: {
                                    align: "left",
                                    x: 0,
                                    y: -6,
                                },
                                showLastLabel: false,
                            },
                            {
                                visible: false,
                            },
                        ],
                    },
                },
            ],
        },
    })
}
