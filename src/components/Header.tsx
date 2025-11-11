import React, { useContext, useState } from "react";
import {
  UnitSettingsContext,
  UnitSettingsContextType,
} from "../context/UnitSettingsContext";
import commonConstant from "../common-constant.json";
import Link from "next/link";

export default function Header() {
  const { unitSettings, setUnitSettingsContext } =
    useContext<UnitSettingsContextType>(UnitSettingsContext);
  const [dropdown, setDropdown] = useState({
    is_dropdown_hidden: true,
    current_toggle_unit: commonConstant.TOGGLE_METRIC,
  });
  const [isDropdownHidden, setIsDropdownHidden] = useState<boolean>(true);

  const toggleUnit = async () => {
    if (dropdown.current_toggle_unit === commonConstant.TOGGLE_METRIC) {
      setUnitSettingsContext({
        temperature: commonConstant.TEMPERATURE_FAHRENHEIT,
        wind_speed: commonConstant.WINDSPEED_MP,
        precipitation: commonConstant.PRECIPITATION_INCHES,
      });
      setDropdown((oldDropdown) => ({
        ...oldDropdown,
        current_toggle_unit: commonConstant.TOGGLE_IMPERIAL,
      }));
    } else {
      setUnitSettingsContext({
        temperature: commonConstant.TEMPERATURE_CELSIUS,
        wind_speed: commonConstant.WINDSPEED_KM,
        precipitation: commonConstant.PRECIPITATION_MM,
      });
      setDropdown((oldDropdown) => ({
        ...oldDropdown,
        current_toggle_unit: commonConstant.TOGGLE_METRIC,
      }));
    }
  };

  return (
    <header>
      <img src="/assets/images/logo.svg" alt="weather-now-logo" />
      <div className="nav">
        <Link className="nav__link text-preset-7" href={"/"}>Weather</Link>
        <Link className="nav__link text-preset-7" href={"/about"}>About</Link>
        <Link className="nav__link text-preset-7" href={"/compare-weather"}>Compare</Link>
      </div>
      <div className="unit-dropdown">
        <button
          className="unit-dropdown__btn"
          onClick={() =>
            isDropdownHidden
              ? setIsDropdownHidden(false)
              : setIsDropdownHidden(true)
          }
        >
          <img src="/assets/images/icon-units.svg" alt="unit-icon" />
          Units
          <img src="/assets/images/icon-dropdown.svg" alt="dropdown-icon" />
        </button>

        <div className={`unit-dropdown__content ${isDropdownHidden && "hide"}`}>
          <p
            className="unit-dropdown__option text-preset-7"
            onClick={() => toggleUnit()}
          >
            {dropdown.current_toggle_unit === commonConstant.TOGGLE_METRIC
              ? "Switch to imperial"
              : "Switch to metric"}
          </p>
          <p className="text-preset-8">Temperature</p>
          <p
            className={`unit-dropdown__option text-preset-7 ${
              unitSettings.temperature === commonConstant.TEMPERATURE_CELSIUS &&
              "unit-dropdown__active"
            }`}
            onClick={() =>
              setUnitSettingsContext((s) => ({
                ...s,
                temperature: commonConstant.TEMPERATURE_CELSIUS,
              }))
            }
          >
            Celcius
            {unitSettings.temperature ===
              commonConstant.TEMPERATURE_CELSIUS && (
              <span>
                <img src="/assets/images/icon-checkmark.svg" alt="" />
              </span>
            )}
          </p>
          <p
            className={`unit-dropdown__option text-preset-7 ${
              unitSettings.temperature ===
                commonConstant.TEMPERATURE_FAHRENHEIT && "unit-dropdown__active"
            }`}
            onClick={() =>
              setUnitSettingsContext((s) => ({
                ...s,
                temperature: commonConstant.TEMPERATURE_FAHRENHEIT,
              }))
            }
          >
            Fahrenheit
            {unitSettings.temperature ===
              commonConstant.TEMPERATURE_FAHRENHEIT && (
              <span>
                <img src="/assets/images/icon-checkmark.svg" alt="" />
              </span>
            )}
          </p>
          <div className="unit-dropdown__line"></div>
          <p className="text-preset-8">Wind Speed</p>
          <p
            className={`unit-dropdown__option text-preset-7 ${
              unitSettings.wind_speed === commonConstant.WINDSPEED_KM &&
              "unit-dropdown__active"
            }`}
            onClick={() =>
              setUnitSettingsContext((s) => ({
                ...s,
                wind_speed: commonConstant.WINDSPEED_KM,
              }))
            }
          >
            km/h
            {unitSettings.wind_speed === commonConstant.WINDSPEED_KM && (
              <span>
                <img src="/assets/images/icon-checkmark.svg" alt="" />
              </span>
            )}
          </p>
          <p
            className={`unit-dropdown__option text-preset-7 ${
              unitSettings.wind_speed === commonConstant.WINDSPEED_MP &&
              "unit-dropdown__active"
            }`}
            onClick={() =>
              setUnitSettingsContext((s) => ({
                ...s,
                wind_speed: commonConstant.WINDSPEED_MP,
              }))
            }
          >
            mph
            {unitSettings.wind_speed === commonConstant.WINDSPEED_MP && (
              <span>
                <img src="/assets/images/icon-checkmark.svg" alt="" />
              </span>
            )}
          </p>
          <div className="unit-dropdown__line"></div>
          <p className="text-preset-8">Precipitation</p>
          <p
            className={`unit-dropdown__option text-preset-7 ${
              unitSettings.precipitation === commonConstant.PRECIPITATION_MM &&
              "unit-dropdown__active"
            }`}
            onClick={() =>
              setUnitSettingsContext((s) => ({
                ...s,
                precipitation: commonConstant.PRECIPITATION_MM,
              }))
            }
          >
            Millimeters (mm)
            {unitSettings.precipitation === commonConstant.PRECIPITATION_MM && (
              <span>
                <img src="/assets/images/icon-checkmark.svg" alt="" />
              </span>
            )}
          </p>
          <p
            className={`unit-dropdown__option text-preset-7 ${
              unitSettings.precipitation ===
                commonConstant.PRECIPITATION_INCHES && "unit-dropdown__active"
            }`}
            onClick={() =>
              setUnitSettingsContext((s) => ({
                ...s,
                precipitation: commonConstant.PRECIPITATION_INCHES,
              }))
            }
          >
            Inches (in)
            {unitSettings.precipitation ===
              commonConstant.PRECIPITATION_INCHES && (
              <span>
                <img src="/assets/images/icon-checkmark.svg" alt="" />
              </span>
            )}
          </p>
        </div>
      </div>
    </header>
  );
}
