import axios from "axios";

const API_KEY = "1159e106adfb42a30b4745bcf489d2c6"

export const weatherFetch = (city) => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

export const dialyForecast = (city) => axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
