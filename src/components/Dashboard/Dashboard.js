import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Grid} from '@material-ui/core';
import moment from 'moment-timezone';

class Dashboard extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_DATA'});
        this.props.dispatch({ type: 'FETCH_ALERTS' });        
    }

    render(){        
        return(
            <div>    
                <h1>Dashboard</h1>            
                <pre>{JSON.stringify(this.props.currentData)}</pre>
                
                {(this.props.currentData.length) ?
                    <Grid container>
                        <Grid container justify="center">

                            {/* Temperature */}
                            <Grid item style={{margin:'20px'}}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="images/Temperature.png"
                                            style={{ maxHeight: '256px', maxWidth: '256px' }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Temperature
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {this.props.currentData[0].temp}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>                        
                            </Grid>

                            {/* HeatIndex */}
                            <Grid item style={{ margin: '20px' }}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="images/heatIndex.png"
                                            style={{ maxHeight: '256px', maxWidth: '256px' }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Heat Index
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {this.props.currentData[0].heatIndex}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            {/* Humidity */}
                            <Grid item style={{ margin: '20px' }}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image="/images/Humidity.png"
                                            style={{ maxHeight: '256px', maxWidth: '256px' }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Humidity
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {this.props.currentData[0].humidity}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            {/* Light */}
                            <Grid item style={{ margin: '20px' }}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"                                            
                                            image="/images/LightLevel.png"
                                            style={{maxHeight: '256px', maxWidth: '256px'}}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Light level
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {this.props.currentData[0].light}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>                            
                        </Grid>
                    </Grid>                            
                :
                    <div>Here beith the dashboard</div>
                
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