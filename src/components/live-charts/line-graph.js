import React, { useState, useEffect } from 'react'
import CanvasJSReact from '../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const LineGraph = ({ title, axisX, axisY, getData, intervalAfterUpdate = 60 }) => {
    const optionsInitialState = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light3",
        title: {
            text: title
        },
        axisY,
        axisX,
        data: [{ type: 'line', dataPoints: [] }]
    };

    const [optionsState, setOptionsState] = useState(optionsInitialState);

    useEffect(() => {
        setInterval(() => {
            updateData();
        }, intervalAfterUpdate * 1000);
        updateData();
    }, [])


    const updateData = () => {
        getData().then(res => {
            setOptionsState({ ...optionsState, data: [{ ...optionsState.data[0], dataPoints: res }] });
        }).catch(err => {
            console.log(err);
        })
    }

    return <CanvasJSChart id='line-graph' options={optionsState} />
}

export default LineGraph;