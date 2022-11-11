import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField'
import { Autocomplete } from "@mui/material";
import axios from "axios";


interface cityResponse {
    "Key": string,
    "EnglishName": string,
    "Country": {
        "EnglishName": string
        "ID": string,
    },
    "AdministrativeArea": {
        "EnglishName": string,
    },
}

export type Option = {
    countryName:string,
    countryId:string,
    cityName:string,
    state:string,
    key:string
}

interface MyTextFieldProps {
    setSelectedOption:(opt:Option|undefined)=>void,
    setError:(error:string)=>void
}




const MyTextField = ({setSelectedOption,setError}:MyTextFieldProps) => {

    const [query, setQuery] = useState('')
    const [options, setOptions] = useState<Option[]>([])
    

    useEffect(() => {
        setError('')
        if (query === '') return
        const timer = setTimeout(()=>{
            axios.get<cityResponse[]>('/locations/v1/cities/search', {
                params: {
                    apikey: process.env.REACT_APP_API_KEY,
                    q: query,
                }
    
            }).then(e => {
                const citiesData = e.data.map(cityData => {
                    return {
                        countryName:cityData.Country.EnglishName,
                        countryId:cityData.Country.ID,
                        cityName:cityData.EnglishName,
                        state:cityData.AdministrativeArea.EnglishName,
                        key:cityData.Key
                    }
                })
                setOptions(citiesData)
            }).catch(e => {
                setError("something went wrong")
            })
        },500)

        return ()=>{
            clearTimeout(timer)
        }
        
    }, [query])

    return <Autocomplete
        options={options}
        getOptionLabel={(option) => {
            return `City: "${option.cityName}" State: "${option.state}" Country: "${option.countryName}"`
        }}
        onChange={(e,v,r)=>{
           if(r==='selectOption' && v){
            setSelectedOption(v)
           }
           if(r==='clear'){
            setSelectedOption(undefined)
            setQuery('')
           }
        }}
        fullWidth
        disablePortal
        renderInput={(params) => <TextField {...params} label="Enter City Name" fullWidth />}
        onInputChange={(e, v, r) => {
            if(r==="input")
            {
                console.log(v)
                setQuery(v)
            }
        }}
    />
}

export default MyTextField;