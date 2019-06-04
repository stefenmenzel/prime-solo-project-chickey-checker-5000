import React, {Component} from 'react';
import {connect} from 'react-redux';
import { XYPlot, XAxis, YAxis, HorizontalGridLines,RectSeries, ChartLabel, HeatmapSeries, MarkSeries, LineSeries, VerticalBarSeries, VerticalRectSeries, VerticalGridLines} from 'react-vis';
import {Scatter, Bar} from 'react-chartjs-2';
import moment from 'moment';

import './HistoricData.css';
// import '../../../node_modules/react-vis/dist/style.css';
import 'react-vis/dist/style.css';
import verticalGridLines from 'react-vis/dist/plot/vertical-grid-lines';

const timestamp = new Date('May 23 2017').getTime();
const ONE_DAY = 86400000;

const DATA = [
    { x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1 },
    { x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1 },
    { x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1 },
    { x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2 },
    { x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2 },
    { x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1 },
    { x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5 },
    { x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1 }
].map(el => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));

class HistoricData extends Component{

    state = {
        // startDate: new Date().toISOString().substr(0,10),
        // endDate: new Date().toISOString().substr(0,10)
        
        // setting this up with test data
        startDate: new Date('2018-06-01').toISOString().substr(0,10),
        endDate: new Date('2018-07-01').toISOString().substr(0,10),
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_HISTORIC_DATA', payload: this.state});
    }

    // [
    //     { x: 1, y: 10 },
    //     { x: 2, y: 5 },
    //     { x: 3, y: 15 }
    // ]        

    compileData = (dataType) => {
        let data = [];
        if(this.props.historicData.length){
            for(let i = 0; i < this.props.historicData.length; i++){
                // let date = this.props.historicData[i].date_time.getDate();
                let date = this.props.historicData[i].date_time;
                let date2 = new Date(this.props.historicData[i].date_time);
                // date2.setDate(date2.getDate() + .025)
                let date3 = new Date(this.props.historicData[i].date_time);
                // date3.setDate(date3.getDate() - .025)
                date3.setDate(date3.getMinutes() - 10)
                let test = date2.getFullYear();
                let test2 = date2.getDate();
                let test3 = date2.getMonth();
                let testString = `${test3}/${test2}/${test}`
                let testString2 = `${test3}/${test2}`;
                // console.log('current loop date_time:', date);
                // console.log('current date_time2 loop:', date2);
                // console.log('trying to get the year from date2:', test);
                // console.log("trying to get the date from date2:", test2);
                // console.log("current date in loop:", testString);
                // // let date = this.props.historicData.date_time;
                // console.log(`current loop ${[dataType]}: ${this.props.historicData[i][dataType]}`);
                //let date = 1;
                data.push({x: date2, x0: date3, y: parseFloat(this.props.historicData[i][dataType])});
                //x0: date2.toISOString().substr(0,10),
            }
        }
        console.log('data from compileData:', data);
        return data;
    }

    compileData2 = (dataType) => {
        let data = [];
        if(this.props.historicData.length){
            for(let i = 0; i < this.props.historicData.length; i++){
                let date = new Date(this.props.historicData[i].date_time);
                data.push({x: moment.utc(date).format('YYYY/MM/DD HH:mm:ss'), y: parseFloat(this.props.historicData[i][dataType])});
            }
        }
        console.log('data from compileData Two electric boogaloo:', data);
        return data;
    }

    fetchData = (event) => {
        event.preventDefault();
        console.log('handling submit', this.state);
        this.props.dispatch({type: 'FETCH_HISTORIC_DATA', payload: this.state})
    }

    handleChange = (propertyToChange, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        })
    }

    render(){
        console.log('current historic data:', this.props.historicData);
        console.log('current compile data:', this.compileData());
        return(
            <div>
                <h1>Historic Data</h1>
                <form onSubmit={this.fetchData}>
                    <label htmlFor="startDate">Start Date</label>
                    <input onChange={(e) => this.handleChange("startDate", e)} value={this.state.startDate} name="startDate" type="date" />

                    <label htmlFor="endDate">End Date</label>
                    <input onChange={(e) => this.handleChange('endDate', e)} value={this.state.endDate} name="endDate" type="date" />

                    <button type="submit">Fetch Data</button>
                </form>

                <div className="chartDiv">
                    <h3>Temperature chart.js</h3>
                    <Scatter
                        data={{
                            datasets: [{
                                label: 'Temperature over Time',
                                fill: false,
                                borderColor: 'green',
                                pointBackgroundColor: '#000',
                                pointBorderColor: '#000',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointRadius: 3,
                                pointHitRadius: 10,
                                data: this.compileData2('temp')
                            }]
                        }}
                        options={
                            {
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        time: { parser: 'YYYY/MM/DD HH:mm:ss' },
                                        distribution: 'series'
                                    }]
                                },                                                                
                            }
                        }
                    />
                </div>  

                <div className="chartDiv">
                    <h3>Humidity chart.js</h3>
                    <Bar
                        data={{
                            datasets: [{
                                label: 'Humidity over time',
                                fill: false,
                                backgroundColor: 'red',                                
                                fontSize: 10,
                                fontStyle: 'bold',
                                fontColor: '#fff',
                                textAlign: 'center',
                                xPadding: 4,
                                yPadding: 4,
                                position: 'top',
                                enabled: true,
                                content: "Threshhold",
                                data: this.compileData2('humidity')
                            
                            }]
                        }}
                        options={
                            {
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        time: {parser: 'YYYY/MM/DD HH:mm:ss'},
                                        distribution: 'series'
                                    }]
                                }
                            }
                        }
                    />
                </div>              

                <h3>Temperature</h3>
                <XYPlot
                    xType="time"
                    width={300}
                    height={300}              
                    yDomain={[0,100]}
                    >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <MarkSeries
                        data={this.compileData('temp')} 
                        style={{stroke: '0.25'}}
                    />
                    <XAxis title="reading date" />
                    <YAxis title="Temperature in °F" />
                </XYPlot>

                <h3>Humidity</h3>
                <XYPlot
                    xType="time"
                    margin={{left:50, botton: 100}}                    
                    width={300}
                    height={300}
                    xDomain={[new Date(this.state.startDate),new Date(this.state.endDate)]}
                    yDomain={[0,1]}
                >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <VerticalRectSeries 
                        data={this.compileData('humidity')}
                        barWidth={.5}
                        columnWidth={.5}
                        // style={{ stroke-width: 1 }}
                        style={{strokeWidth: '.025',
                                stroke: '#fff'}}
                    />
                    <XAxis title="reading date" />
                    <YAxis title="Humidity in %" />
                    {/* <ChartLabel 
                        text="reading date"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={0.25}
                        yPercent={1.01}
                    /> */}

                    {/* <ChartLabel
                        text="Y axis"
                        className="alt-y-label"
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                        }}
                    /> */}
                </XYPlot>


                <XYPlot
                    xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
                    yDomain={[0.1, 2.1]}
                    xType="time"
                    width={300}
                    height={300} >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalRectSeries data={DATA} style={{ stroke: '#fff' }} />
                </XYPlot>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { 
        historicData: reduxState.currentHistoricData
    };
}

export default connect(mapStateToProps)(HistoricData);