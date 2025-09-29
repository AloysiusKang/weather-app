import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="cta">
        <h1>How's the sky looking today?</h1>
        <div>
          <input type="text" name="" id="" />
          <button type="button"></button>
        </div>
      </section>
      <section className="main-weather">
        <div className="weather-info">
          <div className="weather-info__container">
            <div className="">
              <h2>Berlin, Germany</h2>
              <p>Tuesday, Aug 5 2025</p>
            </div>
            <div className="weather-info__temp">
              <img src="/assets/images/icon-sunny.webp" alt="" />
              <p>20</p>
            </div>
          </div>
          <div className="weather-info__small-container">
            <p>Feels Like</p>
            <p>18</p>
          </div>
          <div className="weather-info__small-container">
            <p>Humidity</p>
            <p>46%</p>
          </div>
          <div className="weather-info__small-container">
            <p>Wind</p>
            <p>14 km/h</p>
          </div>
          <div className="weather-info__small-container">
            <p>Precipitation</p>
            <p>0 mm</p>
          </div>
        </div>
        <div className="daily-forecast">
          <h2>Daily forecast</h2>
          <div className="daily-forecast__content">
            <div className="daily-forecast__container">
              <p>Tue</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>20</p>
                <p>14</p>
              </div>
            </div>
            <div className="daily-forecast__container">
              <p>Wed</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>21</p>
                <p>15</p>
              </div>
            </div>
            <div className="daily-forecast__container">
              <p>Thu</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>24</p>
                <p>14</p>
              </div>
            </div>
            <div className="daily-forecast__container">
              <p>Fri</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>25</p>
                <p>13</p>
              </div>
            </div>
            <div className="daily-forecast__container">
              <p>Sat</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>21</p>
                <p>15</p>
              </div>
            </div>
            <div className="daily-forecast__container">
              <p>Sun</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>25</p>
                <p>16</p>
              </div>
            </div>
            <div className="daily-forecast__container">
              <p>Mon</p>
              <img src="/assets/images/icon-storm.webp" alt="" />
              <div className="daily-forecast__wrapper">
                <p>24</p>
                <p>15</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hourly-forecast">
          <div className="hourly-forecast__header">
            <h2>Hourly forecast</h2>
            <button type="button">
              Tuesday 
              <img src="/assets/images/icon-dropdown.svg" alt="" />
            </button>
          </div>
          <div className="hourly-forecast__list">
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
          </div>
        </div>
      </section>
    </>
  );
}
