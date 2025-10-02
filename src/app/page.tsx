import Image from "next/image";

export default function Home() {
  return (
    <section className="home">
      <section className="cta">
        <h1 className="text-preset-2">How's the sky looking today?</h1>
        <div className="cta__search-bar">
          <input
            className="text-preset-5-medium"
            type="text"
            name=""
            id=""
            placeholder="Search for a place"
          />
          <button type="button" className="btn text-preset-5-medium">
            Search
          </button>
        </div>
      </section>
      <section className="weather-info">
        <div className="weather-info__container col-span-full">
          <div className="">
            <h2 className="text-preset-4">Berlin, Germany</h2>
            <p className="text-preset-6">Tuesday, Aug 5 2025</p>
          </div>
          <div className="weather-info__temp">
            <img src="/assets/images/icon-sunny.webp" alt="" />
            <p className="text-preset-1">20</p>
          </div>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Feels Like</p>
          <p className="text-preset-3">18</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Humidity</p>
          <p className="text-preset-3">46%</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Wind</p>
          <p className="text-preset-3">14 km/h</p>
        </div>
        <div className="weather-info__small-container">
          <p className="text-preset-6">Precipitation</p>
          <p className="text-preset-3">0 mm</p>
        </div>
      </section>
      <section className="daily-forecast">
        <h2>Daily forecast</h2>
        <div className="daily-forecast__content">
          <div className="daily-forecast__container">
            <p className="text-preset-6">Tue</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper text-preset-7">
              <p>20</p>
              <p>14</p>
            </div>
          </div>
          <div className="daily-forecast__container">
            <p className="text-preset-6">Wed</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper text-preset-7">
              <p>21</p>
              <p>15</p>
            </div>
          </div>
          <div className="daily-forecast__container">
            <p className="text-preset-6">Thu</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper text-preset-7">
              <p>24</p>
              <p>14</p>
            </div>
          </div>
          <div className="daily-forecast__container">
            <p className="text-preset-6">Fri</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper text-preset-7">
              <p>25</p>
              <p>13</p>
            </div>
          </div>
          <div className="daily-forecast__container">
            <p className="text-preset-6">Sat</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper text-preset-7">
              <p>21</p>
              <p>15</p>
            </div>
          </div>
          <div className="daily-forecast__container">
            <p className="text-preset-6">Sun</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper">
              <p>25</p>
              <p>16</p>
            </div>
          </div>
          <div className="daily-forecast__container">
            <p className="text-preset-6">Mon</p>
            <img src="/assets/images/icon-storm.webp" alt="" />
            <div className="daily-forecast__wrapper text-preset-7">
              <p>24</p>
              <p>15</p>
            </div>
          </div>
        </div>
      </section>
      <section className="hourly-forecast">
        <div className="hourly-forecast__header">
          <h2 className="text-preset-5">Hourly forecast</h2>
          <button type="button" className="text-preset-7 btn-dropdown">
            Tuesday
            <img src="/assets/images/icon-dropdown.svg" alt="" />
          </button>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>3 PM</p>
          <p>20</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>4 PM</p>
          <p>20</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>5 PM</p>
          <p>20</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>6 PM</p>
          <p>19</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>7 PM</p>
          <p>18</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>8 PM</p>
          <p>18</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>9 PM</p>
          <p>17</p>
        </div>
        <div className="hourly-forecast__container">
          <img src="/assets/images/icon-snow.webp" alt="" />
          <p>10 PM</p>
          <p>17</p>
        </div>
      </section>
    </section>
  );
}
