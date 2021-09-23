import React, { useState } from "react";

import { Router, Link } from "@reach/router";
import { Box, Grommet, Heading, Text } from "grommet";
import Home from "./Home";
import Timeline from "./Timeline";
import TimelineTweet from "./TimelineTweet";
import Explore from "./Explore";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grommet full>
      <Box className="App" fill>
        <Box width={"800px"} alignSelf={"center"}>
          <Box direction={"row"} gap={"small"} pad={"medium"}>
            <Link to="/">
              <Text size={"small"}>Home</Text>
            </Link>
            <Link to="timeline">
              <Text size={"small"}>Timeline</Text>
            </Link>
            <Link to="explore">
              <Text size={"small"}>Explore</Text>
            </Link>
          </Box>
          <Box pad={"medium"}>
            <Router>
              <Home path="/" />
              <Timeline path="timeline" />
              <TimelineTweet path="timeline/:tweetId" />
              <Explore path="explore" />
            </Router>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
