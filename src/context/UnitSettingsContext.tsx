import {createContext, ReactNode, useState} from "react";
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

export function UnitSettingsProvider({children}: {children: ReactNode}){
  const [unitSettings, setUnitSettings] = useState<UnitSettings>({
    temperature: commonConstant.TEMPERATURE_CELSIUS,
    wind_speed: commonConstant.WINDSPEED_KM,
    precipitation: commonConstant.PRECIPITATION_MM,
  });

  return (
    <UnitSettingsContext.Provider value={{
      unitSettings: unitSettings,
      setUnitSettingsContext: setUnitSettings,
    }}>
      {children}
    </UnitSettingsContext.Provider>
  )
}