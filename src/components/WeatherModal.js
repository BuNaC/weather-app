import React from 'react';
import Modal from 'react-modal';
import { dialyForecast } from "../ultis/api"


Modal.setAppElement('#root')

export default class WeatherModal extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        modalIsOpen: false,
        location: this.props.dailyForecast,
        forecast: []
      };
  
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
  
    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
      // references are now sync'd and can be accessed.

    }
 
  
    async componentDidUpdate(prevProps) {
      if (this.props.dailyForecast !== prevProps.dailyForecast) {
          await this.setState({ location: this.props.dailyForecast })
          this.getDialyWeather();
      }

  }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    getDialyWeather() {
        dialyForecast(this.state.location).then((response) => {
            this.setState({ forecast: response.data.list })
         }).catch(err => {
             console.log(err)
         }) 
    }
  
    componentDidMount() {   
        this.getDialyWeather()
    }

    render() {
      return (
        <div>
          <button onClick={this.openModal} className="btn">See 5 day weather forecast for <span>{this.state.location}</span></button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Dialy Forecast"
            closeTimeoutMS={200}
            className="modal"
          >
          <div className="frame">
            <div className="scroll">
                <table className="forecast-table">
                <thead>
                    <tr>
                        <th>Day - Hour</th>
                        <th>Temperature</th>
                        <th>Condition</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.forecast.map((period, index) => 
                    <tr key={index}>
                        <td>{period.dt_txt}</td>
                        <td>{Math.round(period.main.temp)}°C</td>
                        <td className="conditions">{period.weather[0].description} <img src={`http://openweathermap.org/img/w/${period.weather[0].icon}.png`} alt=""/></td>
                    </tr>
                    )}
                </tbody>
                </table>
                <button onClick={this.closeModal} className="btn">Close</button> 
            </div>
          </div>
          
          </Modal>
        </div>
      );
    }
  }
  

  