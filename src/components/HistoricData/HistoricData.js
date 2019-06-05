import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MobileStepper, Paper, Typography, Button, KeyboardArrowLeft, KeyboardArrowRight, SwipeableViews } from '@material-ui/core';
import { Scatter, Bar, Bubble, Line } from 'react-chartjs-2';
import moment from 'moment';

import './HistoricData.css';

class HistoricData extends Component {

    state = {
        // startDate: new Date().toISOString().substr(0,10),
        // endDate: new Date().toISOString().substr(0,10)

        // setting this up with test data
        startDate: new Date('2018-06-01').toISOString().substr(0, 10),
        endDate: new Date('2018-07-01').toISOString().substr(0, 10),
        activeStep: 0,
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_HISTORIC_DATA', payload: { startDate: this.state.startDate, endDate: this.state.endDate } });
    }
    compileData = (dataType) => {
        let data = [];

        //these were all experiments in date manipulation. keeping this for now for reference.
        // let date = this.props.historicData[i].date_time;
        // let date2 = new Date(this.props.historicData[i].date_time);
        // // date2.setDate(date2.getDate() + .025)
        // let date3 = new Date(this.props.historicData[i].date_time);
        // // date3.setDate(date3.getDate() - .025)
        // date3.setDate(date3.getMinutes() - 10)
        // let test = date2.getFullYear();
        // let test2 = date2.getDate();
        // let test3 = date2.getMonth();
        // let testString = `${test3}/${test2}/${test}`
        // let testString2 = `${test3}/${test2}`;


        if (this.props.historicData.length) {
            for (let i = 0; i < this.props.historicData.length; i++) {
                let date = new Date(this.props.historicData[i].date_time);
                data.push({ x: moment.utc(date).format('YYYY/MM/DD HH:mm:ss'), y: parseFloat(this.props.historicData[i][dataType]) });
            }
        }
        console.log('data from compileData Two electric boogaloo:', data);
        return data;
    }

    fetchData = (event) => {
        event.preventDefault();
        // console.log('handling submit', this.state);
        this.props.dispatch({ type: 'FETCH_HISTORIC_DATA', payload: { startDate: this.state.startDate, endDate: this.state.endDate } })
    }

    handleNext = () => {
        this.setState({
            ...this.state,
            activeStep: 
            (this.state.activeStep + 1 > 3) 
            ? 
                0
            :
                this.state.activeStep + 1
        })
    }

    handleBack = () => {
        this.setState({
            ...this.state,
            activeStep: 
            (this.state.activeStep - 1 < 0)
            ?
                3
            :
                this.state.activeStep - 1
        })
    }

    handleChange = (propertyToChange, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        })
    }

    charts = () => {
        return [
            <div className="chartDiv">
                <h3>Temperature</h3>
                <Bubble
                    data={{
                        datasets: [{
                            label: `Temperature: ${this.state.startDate} - ${this.state.endDate}`,
                            fill: true,
                            borderColor: 'green',
                            pointBackgroundColor: 'green',
                            pointBorderColor: '#000',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointRadius: 3,
                            pointHitRadius: 10,
                            data: this.compileData('temp')
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
            </div>,

            <div className="chartDiv">
                <h3>Humidity</h3>
                <Bar
                    data={{
                        datasets: [{
                            label: `Humidity: ${this.state.startDate} - ${this.state.endDate}`,
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
                            data: this.compileData('humidity')

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
                            }
                        }
                    }
                />
            </div>,

            <div className="chartDiv">
                <h3>Heat Index</h3>
                <Bubble
                    data={{
                        datasets: [{
                            label: `Heat Index: ${this.state.startDate} - ${this.state.endDate}`,
                            fill: true,
                            borderColor: 'green',
                            pointBackgroundColor: 'green',
                            pointBorderColor: '#000',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointRadius: 3,
                            pointHitRadius: 10,
                            data: this.compileData('heatIndex')
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
            </div>,

            <div className="chartDiv">
                <h3>Light</h3>
                <Line
                    data={{
                        datasets: [{
                            label: `Light levels: ${this.state.startDate} - ${this.state.endDate}`,
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
                            data: this.compileData('light')

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
                            }
                        }
                    }
                />
            </div>

        ]
    }

    render() {
        return (
            <div>
                <h1>Historic Data</h1>
                <form onSubmit={this.fetchData}>
                    <label htmlFor="startDate">Start Date</label>
                    <input onChange={(e) => this.handleChange("startDate", e)} value={this.state.startDate} name="startDate" type="date" />

                    <label htmlFor="endDate">End Date</label>
                    <input onChange={(e) => this.handleChange('endDate', e)} value={this.state.endDate} name="endDate" type="date" />

                    <button type="submit">Fetch Data</button>
                </form>

                {this.charts()[this.state.activeStep]}
                <MobileStepper
                    steps={4}
                    position="static"
                    variant="text"
                    activeStep={this.state.activeStep}
                    nextButton={
                        <Button size="small" onClick={this.handleNext}>
                            NEXT
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack}>
                            BACK
                        </Button>
                    }
                />

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