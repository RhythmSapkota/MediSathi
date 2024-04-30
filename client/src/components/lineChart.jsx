import React from 'react'
import Chart from 'react-apexcharts'

const LineChart = ({ title, seriesData, categoriesData }) => {
    const options = {
        series: [{
          name: seriesData?.name,
          data: seriesData?.data
      }],
        chart: {
        height: 350,
        type: 'line',
        foreColor:"var(--text-secondary-color)",
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
            export: {
              csv: {
                filename: "bookings_/month",
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'value',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                }
              },
              svg: {
                filename: "bookings_/month",
              },
              png: {
                filename: "bookings_/month",
              }
            },
            autoSelected: 'zoom' 
          },
        zoom: {
          enabled: true
        }
      },
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: true,
        style: {
          fontSize: '12px',
        },
        onDatasetHover: {
            highlightDataSeries: true,
        },
        x:{
            show:false
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        items: {
           display: "flex",
        },
    },
      title: {
        text: title,
        style:{
            color:"var(--text-secondary-color)",
            fontSize:"1.4rem",
        },
        offsetY: 25,
        align: 'left'
      },
      grid: {
        show:true,
        strokeDashArray: 3,
      },
      xaxis: {
        categories: categoriesData?.data,
        offsetX:10
      },
      yaxis:{
        show:false,
        tickAmount: 0.5,
        min: 0,
      }
      };

    return (
        <div>
            <Chart options={options} series={options.series} type="line" height={"520px"} />
        </div>
    )
}

export default LineChart
