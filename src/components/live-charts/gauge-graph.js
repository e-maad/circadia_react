import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'

const GaugeGraph = ({ getData, intervalAfterUpdate }) => {

    const [gaugeValue, setGuageValue] = useState(0);

    useEffect(() => {
        setInterval(() => {
            updateData();
        }, intervalAfterUpdate * 1000);
        updateData();
    }, [])

    const updateData = () => {
        getData().then(res => {
            setGuageValue(res);
        }).catch(err => {
            console.log(err)
        })
    }

    return <>
        <GaugeChart id="gauge-chart"
            nrOfLevels={40}
            arcsLength={[0.5, 0.5, 0.5]}
            colors={['#5BE12C', '#F5CD19', '#EA4228']}
            percent={gaugeValue}
            arcPadding={0.01}
            textColor='black'
            animate={true}
            animDelay={0}
            formatTextValue={value => Math.round(value * 160 / 100) + ' MPH'}
        />
        <h1>Speedometer</h1>
    </>
}

export default GaugeGraph;