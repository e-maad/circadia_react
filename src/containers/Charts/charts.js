import React from 'react'
import LineGraph from '../../components/live-charts/line-graph'
import { get2DGraphData, getGaugeGraphData } from '../../services/charts-data-service';
import GaugeGraph from '../../components/live-charts/gauge-graph';
import ScatterGraph from '../../components/live-charts/scatter-chart';
import '../../components/live-charts/charts.css'

const Charts = () => {
    const user = {
        name: 'Immad',
        phone: '00313466881'
    }

    return <div>
        <div className='user-details'>
            <h2>User Name: {user.name}</h2>
            <h2>Phone #: {user.phone}</h2>
        </div>
        <div className='graph-container line-graph'>
            <LineGraph
                axisY={{ title: "Heart Rate" }}
                axisX={{ title: "Time", suffix: "ms" }}
                title="Heart rate by time"
                getData={get2DGraphData}
                intervalAfterUpdate={3}
            />
        </div>

        <div className='graph-container gauge-graph'>
            <GaugeGraph
                getData={getGaugeGraphData}
                intervalAfterUpdate={3}
            />
        </div>

        <div className='graph-container scatter-graph'>
            <ScatterGraph
                axisY={{ title: "Pakistan GDP" }}
                axisX={{ title: "Years", prefix: "year ", interval: 20 }}
                title="Pakistan GDP Forecast"
                getData={get2DGraphData}
            />
        </div>
    </div>
}

export default Charts;