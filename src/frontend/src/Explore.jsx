import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "grommet";
import axios from "axios";
import Tweet from "./components/Tweet";

const languages = [
  { label: "English", code: "en" },
  { label: "Hindi", code: "hi" },
  { label: "Indian", code: "in" },
  { label: "Marathi", code: "mr" },
  { label: "Tamil", code: "ta" },
  { label: "Telugu", code: "tl" },
  { label: "Unknown", code: "und" },
];

const hashtags = [
  "Staff_Shortage_In_Mahabank",
  "BacchoKiSarkaarKaisiHo",
  "DigitalBaalMela2021",
  "digitalbaalmela",
  "littlecoronawarriors",
  "DigitalBaalMela",
  "StopPrivatization",
  "हिंदी_दिवस",
  "Staff_Shortage_in_Mahabank",
];

const entities = [
  "Nirmala Sitharaman",
  "Narendra Modi",
  "Banking",
  "PMO India",
  "Anurag Thakur",
  "Ram Nath Kovind",
  "Amit Shah",
  "United Nations",
  "Business & finance",
  "Recruitment",
];

const Explore = () => {
  const [tweets, setTweets] = useState([]);
  const [label, setLabel] = useState("");

  async function onOptionChange(type, value) {
    console.log({ type, value });
    let fetchedTweets = [];
    switch (type) {
      case "language":
        const resL = await axios.get("http://localhost:3000/tweets/query", {
          params: {
            type,
            value: value.code,
            pg: 0,
          },
        });
        fetchedTweets = resL.data.tweets;
        // console.log(res.data);
        break;
      case "entity":
        const resE = await axios.get("http://localhost:3000/tweets/query", {
          params: {
            type,
            value: value,
            pg: 0,
          },
        });
        console.log(resE);
        fetchedTweets = resE.data.tweets;
        break;
      case "hashtag":
        const resF = await axios.get("http://localhost:3000/tweets/query", {
          params: {
            type,
            value: value,
            pg: 0,
          },
        });
        fetchedTweets = resF.data.tweets;
        break;
      default:
        break;
    }
    setTweets(fetchedTweets);
    setLabel(
      `showing tweets for ${type} : ${value.label ? value.label : value}`
    );
  }

  return (
    <Box>
      <Box direction={"row-responsive"} gap={"small"} align={"center"}>
        <Text weight={"600"} size={"medium"}>
          {" "}
          Language{" "}
        </Text>
        {languages.map((language, ix) => (
          <Box onClick={() => onOptionChange("language", language)}>
            <Text key={ix} size={"small"}>
              {language.label}
            </Text>
          </Box>
        ))}
      </Box>
      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={"600"} size={"medium"}>
          {" "}
          Hashtags{" "}
        </Text>
        {hashtags.map((hashtag, ix) => (
          <Box onClick={() => onOptionChange("hashtag", hashtag)}>
            <Text key={ix} size={"small"}>
              {`#${hashtag}`}
            </Text>
          </Box>
        ))}
      </Box>
      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={"600"} size={"medium"}>
          {" "}
          Entities{" "}
        </Text>
        {entities.map((entity, ix) => (
          <Box onClick={() => onOptionChange("entity", entity)}>
            <Text key={ix} size={"small"}>
              {entity}
            </Text>
          </Box>
        ))}
      </Box>
      <Heading level={5} fill={true}>
        {label}
      </Heading>
      <Tweet tweets={tweets} />
    </Box>
  );
};

export default Explore;
