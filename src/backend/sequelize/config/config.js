module.exports = {
  development: {
    username: "tattle",
    password: "tattle_pw",
    database: "findash",
    host: "127.0.0.1",
    port: 3306 /* default port for mysql is 3306, update it if you are using another port */,
    dialect: "mysql",
  },
  test: {
    username: "tattle",
    password: "tattle_pw",
    database: "findash",
    host: "127.0.0.1",
    port: 3306 /* default port for mysql is 3306, update it if you are using another port */,
    dialect: "mysql",
  },
  staging: {
    username: "root",
    password: null,
    database: "findash",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "findash",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
