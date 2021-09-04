import React from 'react';
import {curveCatmullRom} from 'd3-shape';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';

const Metrics = (props) => {
    const userDataForVis = props;
    const days = 30;

    return (
        userDataForVis == null
        ? <div></div>
        : <div>
            <XYPlot width={700} height={300}
                xDomain={[0, days]}
                yDomain={[0, 100]}
                >

                <VerticalGridLines style={{stroke: 'violet', strokeWidth: 1}} />
                <HorizontalGridLines style={{stroke: 'orange', strokeWidth: 1}} />

                <XAxis title="Day"
                    style={{text: {stroke: 'none', fill: '#471a04', fontWeight: 600}}} 
                    />
                <YAxis 
                    title="User" tickFormat = {percent => `${percent}%` }
                    style={{text: {stroke: 'none', fill: '#471a04', fontWeight: 600}}}
                />

                <LineSeries data={userDataForVis} curve={curveCatmullRom.alpha(0.1)} />
            </XYPlot>
        </div>
    )
}

export default Metrics;