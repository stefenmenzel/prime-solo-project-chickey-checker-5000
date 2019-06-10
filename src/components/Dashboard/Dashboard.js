import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Grid} from '@material-ui/core';
import moment from 'moment-timezone';

import './Dashboard.css';

class Dashboard extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_DATA'});
        this.props.dispatch({ type: 'FETCH_ALERTS' });        
    }

    formatData = (dataType, data) => {
        let value = '';
        switch (dataType) {
            case 'temperature':
            case 'heatIndex':
                value = `${data} °F`
                break;
            case 'humidity':
            case 'light':
                value = `${data} %`
                break;

            default:
                break;
        }
        return value;
    }

    render(){        
        return(
            <div>                
                {/* <h1>Dashboard</h1>
                <pre>{JSON.stringify(this.props.currentData)}</pre> */}
                
                {this.props.currentData.length &&
                    <Grid container>
                        <Grid container justify="center">
                            <Grid item xs={11}>
                                <Typography variant="h3" style={{marginTop: '5%', marginBottom: '5%'}}>Dashboard</Typography>
                            </Grid>
                            {/* Temperature */}
                            <Grid item style={{margin:'20px'}}>
                                <Card className="cc5Card">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="images/Temperature.png"
                                            style={{ maxHeight: '256px', maxWidth: '256px' }}
                                        />
                                        <CardContent>
                                            <Typography className='cc5DashboardItem' gutterBottom variant="h5" component="h2">
                                                Temperature
                                            </Typography>
                                            <Typography className='cc5DashboardItem' variant="h4" color="textSecondary" component="p">
                                                {this.formatData('temperature', this.props.currentData[0].temp)}
                                                {/* {this.props.currentData[0].temp} */}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>                        
                            </Grid>

                            {/* HeatIndex */}
                            <Grid item style={{ margin: '20px' }}>
                                <Card className="cc5Card">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="images/heatIndex.png"
                                            style={{ maxHeight: '256px', maxWidth: '256px' }}
                                        />
                                        <CardContent>
                                            <Typography className='cc5DashboardItem' gutterBottom variant="h5" component="h2">
                                                Heat Index
                                            </Typography>
                                            <Typography className='cc5DashboardItem' variant="h4" color="textSecondary" component="p">
                                                {this.formatData('heatIndex', this.props.currentData[0].heatIndex)}
                                                {/* {this.props.currentData[0].heatIndex} */}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            {/* Humidity */}
                            <Grid item style={{ margin: '20px' }}>
                                <Card className="cc5Card">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/images/Humidity.png"
                                            style={{ maxHeight: '256px', maxWidth: '256px' }}
                                        />
                                        <CardContent>
                                            <Typography className='cc5DashboardItem' gutterBottom variant="h5" component="h2">
                                                Humidity
                                            </Typography>
                                            <Typography className='cc5DashboardItem' variant="h4" color="textSecondary" component="p">
                                                {this.formatData('humidity', this.props.currentData[0].humidity)}
                                                {/* {this.props.currentData[0].humidity} */}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            {/* Light */}
                            <Grid item style={{ margin: '20px' }}>
                                <Card className="cc5Card">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"                                            
                                            image="/images/LightLevel.png"
                                            style={{maxHeight: '256px', maxWidth: '256px'}}
                                        />
                                        <CardContent>
                                            <Typography className='cc5DashboardItem' gutterBottom variant="h5" component="h2">
                                                Light level
                                            </Typography>
                                            <Typography className='cc5DashboardItem' variant="h4" color="textSecondary" component="p">
                                                {this.formatData('light', this.props.currentData[0].light)}
                                                {/* {this.props.currentData[0].light} */}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>                            
                        </Grid>
                    </Grid>                                            
                }
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { 
        currentData: reduxState.currentData,
        alerts: reduxState.alerts,
        user: reduxState.user,
    };
}

export default connect(mapStateToProps)(Dashboard);