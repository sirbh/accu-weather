import { Backdrop, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import MyButton from "../button";
import MyTextField, {Option} from "../inputField";
import Card from '../card'


interface CityForecast {
    DailyForecasts: {
        Day: {
            IconPhrase: string,
            Icon:number,
        },
        Temperature:{
            Maximum:{
                Value:number
            }
        }
    }[]
}

type foreCastData = {
    temperature:number,
    icon:number,
    iconPhrase:string,
}

const Form = () => {
    const [selectedOption,setSelectedOption] = useState<Option>()
    const [open,setOpen] = useState(false)
    const [forecastData,setForecastData] = useState<foreCastData>()
    const [error,setError] = useState('');

    const buttonHandler = useCallback(() => {
        setError('')
        axios.get<CityForecast>(`/forecasts/v1/daily/1day/${selectedOption?.key}`, {
            params: {
                apikey: process.env.REACT_APP_API_KEY,
            }
        }).then(e => {
            const data = e.data.DailyForecasts[0]
            const temp = {
                temperature:data.Temperature.Maximum.Value,
                icon:data.Day.Icon,
                iconPhrase:data.Day.IconPhrase,
            }
            setForecastData(temp)
            setOpen(true)
        }).catch(e => {
            setError('something went wrong')
        })
    }, [selectedOption?.key])


    return <div style={{
        width: '50vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'column',
        marginTop:'50px',
        height:'205px'
    }}>
        <Typography variant="h2">AccuWeather</Typography>
        <MyTextField setSelectedOption={setSelectedOption} setError = {setError}></MyTextField>
        <MyButton onClick={buttonHandler} disabled={selectedOption?.key === ''|| selectedOption?.key===undefined}></MyButton>
        <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={()=>{setOpen(false)}}>
            <Card cityName={selectedOption?.cityName} countryLabel={selectedOption?.countryId} iconNumber={forecastData?.icon} phrase={forecastData?.iconPhrase} temperature={forecastData?.temperature} ></Card>
        </Backdrop>
        <Typography sx={{color:'red',height:'20px'}}>{error===''?'':error}</Typography>
    </div>
}

export default Form;