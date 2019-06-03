import React, {Component} from 'react';
import {connect} from 'react-redux';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, HeatmapSeries, MarkSeries, LineSeries} from 'react-vis';

import '../../../node_modules/react-vis/dist/style.css';

class HistoricData extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_HISTORIC_DATA'});
    }

    // [
    //     { x: 1, y: 10 },
    //     { x: 2, y: 5 },
    //     { x: 3, y: 15 }
    // ]

    compileData = () => {
        let data = [];
        if(this.props.historicData.length){
            for(let i = 0; i < this.props.historicData.length; i++){
                // let date = this.props.historicData[i].date_time.getDate();
                let date = this.props.historicData[i].date_time;
                let date2 = new Date(this.props.historicData[i].date_time);
                let test = date2.getFullYear();
                let test2 = date2.getDate();
                let test3 = date2.getMonth();
                let testString = `${test3}/${test2}/${test}`
                console.log('current loop date_time:', date);
                console.log('current date_time2 loop:', date2);
                console.log('trying to get the year from date2:', test);
                console.log("trying to get the date from date2:", test2);
                console.log("current date in loop:", testString);
                // let date = this.props.historicData.date_time;
                console.log('current loop temp:', this.props.historicData[i].temp);
                //let date = 1;
                data.push({x: new Date(date2), y: this.props.historicData[i].temp});
            }
        }
        console.log('data from compileData:', data);
        return data;
    }

    render(){
        console.log('current historic data:', this.props.historicData);
        console.log('current compile data:', this.compileData());
        return(
            <div>
                <h1>Historic Data</h1>
                You have reached the Historic Data page, sort of a museum of Chickeynfo

                <XYPlot
                    xType="time"
                    width={300}
                    height={300}S                    
                    yDomain={[0,100]}
                    >
                    <HorizontalGridLines />                    
                    <MarkSeries
                        data={this.compileData()} />
                    <XAxis title="X Axis" />
                    <YAxis title="Y Axis" />
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