import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { weatherFetch } from "../ultis/api"
import Loading from "./Loading";
import moment from "moment";
import WeatherModal from "./WeatherModal";


const WeatherVisual = (props) => {
    const date = moment(props.weather.time).format("D MMMM YYYY, HH:mm:ss");
    const wIcon = `http://openweathermap.org/img/w/${props.weather.icon}.png`
   return ( <div className="weather">
        <p className="city">{props.weather.city}</p>
        <div className="clock">{date}</div>
        <p className="condition">{props.weather.description}</p>
        {props.weather.icon && <img className="weather-img" src={wIcon} alt=""/>}
        <p className="temp">{Math.round(props.weather.temp)}°C</p>
        <WeatherModal dailyForecast={props.dailyForecast}/>
</div>
)
}

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            temp: "",
            icon: "",
            description: "",
            location: this.props.location.state.city,
            time: moment().valueOf()
        }
        this.handleError = this.handleError.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }

    getWeather() {
        weatherFetch(this.state.location).then((response) => {
           this.setState({ 
               city: response.data.name,
               temp: response.data.main.temp,
               icon: response.data.weather[0].icon,
               description: response.data.weather[0].description,
               error: ""          
            })
        }).catch(err => {
            console.log(err)
            return this.setState({ error: "We cannot find this city, please try again"})
        }) 
    }

   

    handleError(event) {
        event.preventDefault();
        this.props.history.push("./");
    }

    componentDidMount() {   
       this.getWeather()
       this.interval = setInterval(() => this.setState(function(prevState) {
           return {
                time: moment().valueOf()
           }
       }), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }

    async componentDidUpdate(prevProps) {
        if (this.props.location.state.city !== prevProps.location.state.city) {
            await this.setState({ location: this.props.location.state.city })
            this.getWeather()
        }

    }

    render() {
        return (
            <div>
                {this.state.error 
                    ?   <div className="error">
                            <p>{this.state.error}</p>
                            <button className="btn" onClick={this.handleError}>Return</button>
                        </div>

                    : (
                        !this.state.city 
                        ? <Loading /> 
                        : <WeatherVisual dailyForecast={this.state.city} weather={this.state} />
                      )
                }
            </div>
        )        
    }

} 


export default withRouter(Weather)