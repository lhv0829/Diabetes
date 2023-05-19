import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { firestore } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { sort } from './constants/constants';


const WeeklyChart = ({sort , date, isChart} : {sort:sort, date:Date, isChart:boolean}) => {
  const email = localStorage.getItem('Email') as string;
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [data, setData] = useState({});

  const getBloodSugarData = (date:Date, data) => {
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
  const getFoodData = (date:Date, data) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 5);
  
    const foodData = [];
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().slice(0, 10);
      const dayData = data[dateString] || {};
      foodData.push(dayData.foodCalories || null);
    }
  
    return foodData;
  };
  const getExerciseData = (date:Date, data) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 5);
  
    const exerciseData = [];
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().slice(0, 10);
      const dayData = data[dateString] || {};
      exerciseData.push(dayData.exerciseCalories || null);
    }
  
    return exerciseData;
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

  // const bloodSugarData = getBloodSugarData(date, data);
  const labels = [];
  
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().slice(0, 10);
    labels.push(dateString);
  }
  let sortData;
  let sortLabel= '';
  if(sort === 'food'){
    sortLabel = 'Food Calories';
    sortData = getFoodData(date, data);
  } else if(sort === 'bloodSugar') {
    sortLabel = 'Blood Sugar';
    sortData = getBloodSugarData(date, data);
  } else if(sort === 'exercise') {
    sortLabel = 'Exercise Consumption Calories'
    sortData = getExerciseData(date, data);
  }

  const tempData = {
    labels,
    datasets: [{
      label: sortLabel,
      data: sortData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4
    }]
  };

  if(sort === 'total'){
    const firstLabel = 'Blood Sugar';
    const secondLabel = 'Food Calories';
    const thirdLabel = 'Exercise Consumption Calories'
    const bloodsugarData = getBloodSugarData(date, data);
    const foodData = getFoodData(date, data);
    const exerciseData = getExerciseData(date, data);

    tempData.datasets = [
      {
        label: firstLabel,
        data: bloodsugarData,
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      },
      {
        label: secondLabel,
        data: foodData,
        borderColor: documentStyle.getPropertyValue('--pink-500'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      },
      {
        label: thirdLabel,
        data: exerciseData,
        borderColor: documentStyle.getPropertyValue('--green-500'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      }
    ];
  } 

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
  }, [date, isChart]);
  return(
    <>
      {isChart && <div className="">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>}
    </>
  )
};

export default WeeklyChart;