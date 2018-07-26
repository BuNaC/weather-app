import React, { Component } from "react";
import { withRouter } from 'react-router-dom'


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/weather', { city: this.state.value });
        this.setState({value: ""})
      }

    render() {
        return (
        <form className="search" onSubmit={this.handleSubmit}>
        <input className="search-text" type="text" value={this.state.value} onChange={this.handleChange} />
        <input className="btn" type="submit" disabled={!this.state.value} value="Get Weather" />
      </form>

        )
    }
}

export default withRouter(Search)