import getArgs from "./helpers/args.js";
import { getIcons, getWeather } from "./services/api.services.js";
import {
  printError,
  printHelp,
  printSucces,
  printWeather,
} from "./services/log.services.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKENDICTIONARY,
} from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Doesnt token exitst");
    return;
  }
  try {
    await saveKeyValue(TOKENDICTIONARY.token, token);
    printSucces("Token was saved");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Doesn't city exitst");
    return;
  }
  try {
    await saveKeyValue(TOKENDICTIONARY.city, city);
    printSucces("City was saved");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city =
      (await process.env.CITY) ?? (await getKeyValue(TOKENDICTIONARY.city));
    const response = await getWeather(city);
    printWeather(response, getIcons(response.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 404) {
      printError("City not found");
    } else if (error?.response?.status === 401) {
      printError("Invalid token");
    } else {
      printError(error.message);
    }
  }
};

const startCLI = () => {
  const args = getArgs(process.argv);
  //   printSucces("good job");
  //   printError("no ok");
  if (args.h) {
    //help

    return printHelp();
  }
  if (args.s) {
    //save city
    return saveCity(args.s);
  }
  if (args.t) {
    //save token
    return saveToken(args.t);
  }
  //   result
  getForcast();
};

startCLI();
