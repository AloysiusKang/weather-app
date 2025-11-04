import commonConstant from "../common-constant.json"

export const weatherCode = (weather:number):string => {
    if(commonConstant.WC_SUNNY.includes(weather)){
      return "/assets/images/icon-sunny.webp"
    }
    if(commonConstant.WC_PARTLY_CLOUDY.includes(weather)){
      return "/assets/images/icon-partly-cloudy.webp"
    }
    if(commonConstant.WC_OVERCAST.includes(weather)){
      return "/assets/images/icon-overcast.webp"
    }
    if(commonConstant.WC_FOG.includes(weather)){
      return "/assets/images/icon-drizzle.webp"
    }
    if(commonConstant.WC_DRIZZLE.includes(weather)){
      return "/assets/images/icon-sunny.webp"
    }
    if(commonConstant.WC_RAIN.includes(weather)){
      return "/assets/images/icon-rain.webp"
    }
    if(commonConstant.WC_SNOW.includes(weather)){
      return "/assets/images/icon-snow.webp"
    }
    if(commonConstant.WC_STORM.includes(weather)){
      return "/assets/images/icon-storm.webp"
    }
    return "/assets/images/icon-error.svg";
}