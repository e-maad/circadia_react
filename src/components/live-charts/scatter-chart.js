import React, { useState, useEffect, useRef } from 'react'
import CanvasJSReact from '../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const ScatterGraph = ({ title, axisX, axisY, getData, intervalAfterUpdate = 60 }) => {
    const optionsInitialState = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light3",
        title: {
            text: title
        },
        axisY,
        axisX,
        data: [{ type: 'scatter', dataPoints: [] }]
    };

    const [optionsState, setOptionsState] = useState(optionsInitialState);

    useEffect(() => {
        setInterval(() => {
            updateData();
        }, intervalAfterUpdate * 1000);
        updateData();
    }, [])


    const updateData = () => {
        getData(120).then(res => {
            setOptionsState({ ...optionsState, data: [{ ...optionsState.data[0], dataPoints: res }] });
        })
    }

    return <CanvasJSChart options={optionsState} />
}

export default ScatterGraph;