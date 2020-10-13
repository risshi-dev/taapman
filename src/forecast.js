import React from "react";
import moment from "moment";
function Forecast(props) {
  const t = [];
  props.props.main.map((item) => t.push(parseInt(item.temp)));
  const data = [
    [
      props.props.description[0],
      moment().add(1, "days").format("D MMM"),
      t[0],
      props.props.weather[0],
    ],
    [
      props.props.description[1],
      moment().add(2, "days").format("D MMM"),
      t[1],
      props.props.weather[1],
    ],
    [
      props.props.description[2],
      moment().add(3, "days").format("D MMM"),
      t[2],
      props.props.weather[2],
    ],
    [
      props.props.description[3],
      moment().add(4, "days").format("D MMM"),
      t[3],
      props.props.weather[3],
    ],
    [
      props.props.description[4],
      moment().add(5, "days").format("D MMM"),
      t[4],
      props.props.weather[4],
    ],
  ];
  const d = data.map((item) => (
    <div className="forecard">
      <div className="time">{item[1]}</div>{" "}
      <div>
        <i className={`owf owf-${item[0]} ic`}></i>
      </div>
      <div className="clouds">{item[3]}</div>
      <div className="tmp">
        {item[2]}
        °C
      </div>
    </div>
  ));
  return (
    <div className="con">
      <div className="co">{d}</div>
    </div>
  );
}

export default Forecast;
