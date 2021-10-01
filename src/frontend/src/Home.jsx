import React, { useEffect, useState } from "react";
import { Box, Heading, Text, DataChart } from "grommet";
import axios from "axios";

const Home = () => {
  const [timeseriesData, setTimeseriesData] = useState([]);

  useEffect(async () => {
    const res = await axios.get("http://localhost:3000/aggregates/timeseries");
    console.log(res);
    setTimeseriesData(res.data);
  }, []);
  return (
    <Box>
      <Heading level={3}>Tweet Count Time Series</Heading>
      <Box>
        <DataChart
          alignSelf="start"
          size={{
            height: "medium",
            width: "large",
          }}
          detail={true}
          data={timeseriesData}
          series={[
            {
              property: "date",
              render: (val, datum, index) => new Date(val).toDateString(),
            },
            "count",
          ]}
          chart={[
            {
              property: "count",
              type: "line",
              opacity: "medium",
              thickness: "xsmall",
            },
            {
              property: "count",
              type: "point",
              point: "circle",
              thickness: "xsmall",
              round: true,
            },
          ]}
          guide={{ x: { granularity: "fine" } }}
          axis={{
            x: {
              property: "date",
            },
            y: {
              property: "count",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
