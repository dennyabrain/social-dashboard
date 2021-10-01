const axios = require("axios");

(async function () {
  const res = await axios.get("http://localhost:3000/tweets/query", {
    params: {
      type: "hashtag",
      value: "Staff_Shortage_In_Mahabank",
      pg: 0,
    },
  });

  // const res = await axios.get("http://localhost:3000/tweets/page/0");

  // const res = await axios.get(
  //   "http://localhost:3000/tweet/E5VDE-JX3N3I7nUy4-cBR"
  // );

  console.log(res.data);
})();
