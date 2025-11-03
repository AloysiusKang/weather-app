import {createContext} from "react";
import commonConstant from "../common-constant.json";

export type UnitSettings = {
  temperature: string;
  wind_speed: string;
  precipitation: string;
};

export type UnitSettingsContextType = {
  unitSettings:UnitSettings,
  setUnitSettingsContext:React.Dispatch<React.SetStateAction<UnitSettings>>
};

export const UnitSettingsContext = createContext<UnitSettingsContextType>({
  unitSettings: {
    temperature: commonConstant.TEMPERATURE_CELSIUS,
    wind_speed: commonConstant.WINDSPEED_KM,
    precipitation: commonConstant.PRECIPITATION_MM,
  },
  setUnitSettingsContext: () => {}
});