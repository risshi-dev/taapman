import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import moment from "moment";
import "./App.css";
import "./mobile.css";
function App() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [dis, setDis] = useState(false);
  const [f, setF] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState({
    main: {},
    data: {},
    weather: {},
    sys: {},
  });
  const [fore, setFore] = useState({
    main: [],
    dt_txt: [],
    description: [],
    weather: [],
  });
  function online() {
    if (navigator.onLine === false) alert("You're Offline");
  }
  useEffect(() => {
    online();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);
  function showPosition(position) {
    setX(parseFloat(position.coords.latitude));
    setY(parseFloat(position.coords.longitude));
  }
  function find() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&APPID=7e701848cc7069512b1d4c76cf8c8523&units=metric`
    )
      .then((data) => data.json())
      .then((data) =>
        setData({
          main: data.main,
          data: data,
          weather: data.weather[0],
          sys: data.sys,
        })
      )
      .then(setDis(true));

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&appid=7e701848cc7069512b1d4c76cf8c8523&units=metric`
    )
      .then((res) => res.json())
      .then((res) =>
        setFore({
          main: [
            res.list[10].main,
            res.list[18].main,
            res.list[26].main,
            res.list[34].main,
            res.list[39].main,
          ],
          dt_txt: [
            res.list[10].dt_txt,
            res.list[18].dt_txt,
            res.list[26].dt_txt,
            res.list[34].dt_txt,
            res.list[39].dt_txt,
          ],
          description: [
            res.list[10].weather[0].id,
            res.list[18].weather[0].id,
            res.list[26].weather[0].id,
            res.list[34].weather[0].id,
            res.list[39].weather[0].id,
          ],
          weather: [
            res.list[10].weather[0].main,
            res.list[18].weather[0].main,
            res.list[26].weather[0].main,
            res.list[34].weather[0].main,
            res.list[39].weather[0].main,
          ],
        })
      )
      .then(setF(true));
  }

  function search(event) {
    var code = event.keyCode || event.which;

    if (code === 13 || event.type === "click") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=7e701848cc7069512b1d4c76cf8c8523&units=metric`
      )
        .then((res) => res.json())
        .then((data) =>
          setData({
            main: data.main,
            data: data,
            weather: data.weather[0],
            sys: data.sys,
          })
        )
        .then(setDis(true))
        .then(setInput(""));

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=7e701848cc7069512b1d4c76cf8c8523&units=metric`
      )
        .then((res) => res.json())
        .then((res) =>
          setFore({
            main: [
              res.list[10].main,
              res.list[18].main,
              res.list[26].main,
              res.list[34].main,
              res.list[39].main,
            ],
            dt_txt: [
              res.list[10].dt_txt,
              res.list[18].dt_txt,
              res.list[26].dt_txt,
              res.list[34].dt_txt,
              res.list[39].dt_txt,
            ],
            description: [
              res.list[10].weather[0].id,
              res.list[18].weather[0].id,
              res.list[26].weather[0].id,
              res.list[34].weather[0].id,
              res.list[39].weather[0].id,
            ],
            weather: [
              res.list[10].weather[0].main,
              res.list[18].weather[0].main,
              res.list[26].weather[0].main,
              res.list[34].weather[0].main,
              res.list[39].weather[0].main,
            ],
          })
        )
        .then(setF(true));
    }
  }

  return (
    <div className="App">
      <h1>Taapman</h1>

      <div id="input">
        <div>
          <input
            id="in"
            placeholder="Enter City..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={search}
          ></input>
          <button disabled={input === ""} onClick={search}>
            Search
          </button>
          <button onClick={find} disabled={input !== ""}>
            Auto
          </button>
        </div>
      </div>
      <div style={{ marginTop: "3rem" }}>
        {dis === true ? (
          <div className="card">
            <div id="shadow">
              <div id="date">
                <span id="da">{moment().format("dddd")}</span>{" "}
                <span>{moment().format("D MMM ")}</span>
              </div>
              <div className="cont">
                <div id="city">
                  <h2 style={{ fontSize: "1.4rem" }}>
                    {`${data.data.name}, ${data.sys.country}`}
                  </h2>
                  <div
                    style={{
                      fontSize: "5rem",
                      fontWeight: "700",
                      textShadow: "5px 5px 14px #000",
                    }}
                  >
                    {parseInt(data.main.temp)}
                    <span style={{ fontSize: "4.5rem" }}>°C</span>
                  </div>
                </div>
                <div id="ico">
                  <div>
                    <i className={`owf owf-${data.weather.id} icon`}></i>
                  </div>
                  <div id="info">
                    <div style={{ marginRight: "1rem" }}>
                      <ArrowUpwardIcon></ArrowUpwardIcon>
                      {parseInt(data.main.temp_max)}{" "}
                    </div>
                    <div style={{ marginRight: "1rem" }}>
                      <ArrowDownwardIcon></ArrowDownwardIcon>
                      {parseInt(data.main.temp_min)}{" "}
                    </div>
                    <div style={{ fontVariant: "all-petite-caps" }}>
                      {data.weather.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="force">{f === true ? <Forecast props={fore} /> : ""}</div>
    </div>
  );
}

export default App;
