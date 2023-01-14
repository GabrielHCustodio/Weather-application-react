import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaWind } from "react-icons/fa";

import api from "./services/api"

import "./App.css";

function App() {
  const key = "273be115bfd9eef0f58d2b343dfe2c19"
  const [city, setCity] = useState("")
  const [data, setData] = useState({})

  async function handleSearchCity() {
    try {
      const response = await api.get(`?q=${city}&units=metric&appid=${key}&lang=pt_br`)
      setData(response.data)
      console.log(response.data)
      setCity("")
    } catch (error) {
      alert('Erro')
      setCity("")
    }
  }

  return (
    <div className="global">
      <div className="container">
        <h1 className="title">Pesquise o clima aqui</h1>
        <div className="containerInputs">
          <input
            type="text"
            placeholder="Informe a cidade..."
            value={city}
            onChange={(e) => {setCity(e.target.value)}}
          />
          <button className="buttonSearch" onClick={handleSearchCity}>
            <FaSearch color="#fff" />
          </button>
        </div>

        {Object.keys(data).length > 0 && (
          <div className="containerInformations">
          <h2 className="location">
            <FaMapMarkerAlt size={20} />
            <span>{data.name}</span>
            <img src="`https://countryflagsapi.com/png/${data.sys.country}`" alt="" />
          </h2>

          <p className="temperature">
            <span>{data.main.temp}</span>
            &deg;C
          </p>

          <p className="description">
            <span>{data.weather.description}</span>
            <img src={"`https://openweathermap.org/img/wn/${data.weather.icon}.png`"} alt="" />
          </p>

          <p className="windSpeed">
            <FaWind />
            <span>{data.wind.speed}%</span>
          </p>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
