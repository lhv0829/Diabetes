import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { firestore } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";


const Graph = ({date, isChart} : {date:Date, isChart:boolean}) => {
  const email = localStorage.getItem('Email') as string;
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [data, setData] = useState({});

  const getBloodSugarData = (date, data) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 5);
  
    const bloodSugarData = [];
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().slice(0, 10);
      const dayData = data[dateString] || {};
      bloodSugarData.push(dayData.bloodSugar || null);
    }
  
    return bloodSugarData;
  };
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), email);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          setData(doc.data()?.dates);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
    
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 5);

    const bloodSugarData = getBloodSugarData(date, data);
    const labels = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().slice(0, 10);
    labels.push(dateString);
  }

  const tempData = {
    labels,
    datasets: [{
      label: 'Blood Sugar',
      data: bloodSugarData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4
    }]
  };

  setChartData(tempData);
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
    setChartOptions(options);
    console.log(`isChart = ${isChart}`);
}, []);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), email);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          setData(doc.data()?.dates);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
    
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 5);

    const bloodSugarData = getBloodSugarData(date, data);
    const labels = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().slice(0, 10);
    labels.push(dateString);
  }

  const tempData = {
    labels,
    datasets: [{
      label: 'Blood Sugar',
      data: bloodSugarData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4
    }]
  };

  setChartData(tempData);
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
    setChartOptions(options);
    console.log(`isChart = ${isChart}`);
}, [date, isChart]);
  return(
    <>
      {isChart && <div className="">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>}
    </>
  )
};

export default Graph;