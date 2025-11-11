import {createContext, ReactNode, useState} from "react";
import commonConstant from "../common-constant.json";

export type Location = {
    country:string,
    name:string,
    latitude:number,
    longitude:number,
};

export type LocationContextType = {
  currLocation:Location,
  setCurrLocation:React.Dispatch<React.SetStateAction<Location>>
};

export const LocationContext = createContext<LocationContextType>({
  currLocation: {
    country: "Indonesia",
    name: "Jakarta",
    latitude: -6.1818,
    longitude: 106.8223,
  },
  setCurrLocation: () => {}
});

export function LocationContextProvider({children}: {children: ReactNode}){
  const [location, setLocation] = useState<Location>({
    country: "Indonesia",
    name: "Jakarta",
    latitude: -6.1818,
    longitude: 106.8223,
  });

  return (
    <LocationContext.Provider value={{
      currLocation: location,
      setCurrLocation: setLocation,
    }}>
      {children}
    </LocationContext.Provider>
  )
}


export const getCurrentLocation = async (setLocation:React.Dispatch<React.SetStateAction<Location>>) => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos:any) {
      const crd = pos.coords;
      // console.log(crd)
      setLocation((prev) => ({...prev, latitude: crd.latitude, longitude: crd.longitude}));
    }

    function error(err:any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error, options);
    }else{
      console.log("User did not gave permision")
      return;
    }
  }

 