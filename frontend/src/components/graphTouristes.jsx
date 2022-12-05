import React from "react";
import axios from "axios";
import "./touristes.css";
import "./touriste";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BACKEND_BASE_URL_TOURISTE = "http://localhost:3001/touristes/";
export default class GraphTouristes extends React.Component {
  constructor() {
    super();
    this.state = {
      touristes: [],
    };
  }

  componentDidMount() {
    this.getListTouriste();
  }

  getListTouriste = () => {
    axios.get(BACKEND_BASE_URL_TOURISTE).then((data) => {
      data.data &&
        data.data.touristes &&
        this.setState({ touristes: data.data.touristes });
    });
  };

  render() {
    const { touristes } = this.state;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={100}
          height={50}
          data={touristes}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="continent" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tauxTouriste" fill="#407b98" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

/*

<ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={touristes}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5197ac" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#5197ac" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2b829c" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2b829c" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="continent" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="tauxTouriste"
            stroke="#02475c"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>*/
