"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import WeatherInfo from '@/components/WeatherInfo'
import WeatherSearch from '@/components/WeatherSearch'
import { LocationContextProvider } from '@/context/LocationContext'
import { UnitSettingsProvider } from '@/context/UnitSettingsContext'
import React from 'react'

export default function page() {
  return (
    <UnitSettingsProvider>
      <LocationContextProvider>
        <Header/>
        <section>
          <WeatherSearch/>
          <WeatherInfo/>
          <WeatherSearch/>
          <WeatherInfo/>
        </section>
        <Footer/>
      </LocationContextProvider>
    </UnitSettingsProvider>
  )
}
