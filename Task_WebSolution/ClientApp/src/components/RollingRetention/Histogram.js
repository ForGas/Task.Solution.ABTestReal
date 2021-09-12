import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

const Histogram = (props) => {
    const userDataForVis = props;
    const days = 30;

    return (
        userDataForVis == null
        ? <div></div>
        : <div className="main_retention">
            <span className="main_head">Histogram</span>

            <div className="block-center">
                <XYPlot
                    width={850}
                    height={600}
                    color={'#ff5733'}
                    opacity={1}
                    xDomain={[0, days]}
                    yDomain={[0, 100]}
                >             
                    <XAxis title="Day" style={{text: {stroke: 'none', fill: '#1923f0', fontWeight: 600}}} />

                    <YAxis
                    title="User"
                        tickFormat = {percent => `${percent}%` }
                        style={{text: {stroke: 'none', fill: '#471a04', fontWeight: 700}}} 
                    />
                    
                    <VerticalBarSeries data={userDataForVis} barWidth={1} style={{stroke: '#574810', strokeWidth: 1}}/>
                    <HorizontalGridLines style={{stroke: 'black', strokeWidth: 0.2}} />
                </XYPlot>

            </div>
        </div>
    )
}

export default Histogram;