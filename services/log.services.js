import chalk from "chalk";
import dedent from "dedent-js";
const printError = (error) => {
  console.log(chalk.bgRed("ERROR") + " " + error);
};

const printSucces = (message) => {
  console.log(chalk.bgGreen("SUCCES") + " " + message);
};
const printHelp = () => {
  console.log(dedent`
    ${chalk.bgCyan("HELP")} 
    -s [CITY] for install city 
    -h for help
    -t [API_KEY] for saving 
  `);
};

const printWeather = (response, icon) => {
  //   console.log(response);

  console.log(dedent`
        ${chalk.bgYellowBright("WEATHER")} CITY weather ${response.name} 
        ${icon}  ${response.weather[0].description}
        Tempature: ${response.main.temp} (feels like ${response.main.feels_like})
        Humidity: ${response.main.humidity} %
        Wind speed: ${response.wind.speed}
        `);
};

export { printError, printSucces, printHelp, printWeather };
