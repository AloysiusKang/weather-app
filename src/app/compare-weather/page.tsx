"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import WeatherInfo from '@/components/WeatherInfo'
import WeatherSearch from '@/components/WeatherSearch'
import { Location, LocationContext, LocationContextProvider } from '@/context/LocationContext'
import { UnitSettingsProvider } from '@/context/UnitSettingsContext'
import React, { useContext, useState } from 'react'
import styles from "../../assets/css/CompareWeatherPage.module.css"

export default function page() {
  const {currLocation, setCurrLocation} = useContext(LocationContext);
  const [firstLocation, setFirstLocation] = useState<Location>(currLocation);
  const [secondLocation, setSecondLocation] = useState<Location>(currLocation);
  return (
    <UnitSettingsProvider>
      <LocationContextProvider>
        <Header/>
        <section className={styles["compare"]}>
          <div className={styles["compare__container"]}>
            <h2 className={`text-preset-4`}>First Location</h2>
            <WeatherSearch setLocation={setFirstLocation}/>
            <WeatherInfo location={firstLocation}/>
          </div>
          <div className={styles["compare__container"]}>
            <h2 className={`text-preset-4 ${styles["compare__right"]}`}>Second Location</h2>
            <WeatherSearch setLocation={setSecondLocation}/>
            <WeatherInfo location={secondLocation}/>
          </div>
        </section>
        <Footer/>
      </LocationContextProvider>
    </UnitSettingsProvider>
  )
}
