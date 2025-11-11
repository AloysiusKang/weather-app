"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { UnitSettingsProvider } from '@/context/UnitSettingsContext'
import React from 'react'

export default function page() {
  return (
    <UnitSettingsProvider>
      <Header/>
      <section>
        <h1>About Page</h1>
      </section>
      <Footer/>
    </UnitSettingsProvider>
  )
}
