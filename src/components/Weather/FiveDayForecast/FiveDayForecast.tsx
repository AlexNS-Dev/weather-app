
import { useEffect } from 'react'
import Card from '../../Card/Card'
import useWeatherStore from '../../stores/weatherStore'
import './FiveDayForecast.css'
import { FiveDayForecastData } from '../../../types'

const FiveDayForecast = () => {
    const forecastData = useWeatherStore((state) => state.fiveDayForecastData)
    const fetchForecast = useWeatherStore((state) => state.fetchFiveDayForecast)
    const currentLocation = useWeatherStore((state) => state.currentLocation)

    const formatDate = (date: Date) => {
        const monthFormattedDate = date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
        })
        const weekDayFormattedDate = date.toLocaleDateString('es-ES', {
            weekday: 'long',
        })
        return { monthFormattedDate, weekDayFormattedDate }
    }

    useEffect(() => {
        fetchForecast(currentLocation)
    }, [currentLocation])

    if (!forecastData) return

    const dailyForecast = forecastData.filter((forecast: FiveDayForecastData) => 
        forecast.dt_txt.includes('12:00:00') // Seleccionar solo las entradas que ocurren a las 12:00 PM
    ).slice(0, 5)

    return (
        <div className='FiveDayForecast'>
            <h3>5 Day Forecast</h3>
            <Card
                className='panel'
                padding='2em'
                backgroundColor='var(--card-bg)'
            >
                <ul>
                    {dailyForecast.map((forecastItem: FiveDayForecastData, index: number) => {
                        const forecastDate = new Date(forecastItem.dt_txt)
                        const { monthFormattedDate, weekDayFormattedDate } = formatDate(forecastDate);

                        return (
                            <li className='list-item' key={index}>
                                <div className='temperature'>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
                                        alt="Weather icon"
                                    />
                                    <span>{Math.round(forecastItem.main.temp)}°C</span>
                                </div>
                                <span className="month-date">{monthFormattedDate}</span>
                                <span className="weekday">{weekDayFormattedDate}</span>
                            </li>
                        )
                    })}
                </ul>
            </Card>
        </div>
    )
}

export default FiveDayForecast