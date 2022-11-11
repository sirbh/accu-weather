import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField'
import { Autocomplete, AutocompleteProps } from "@mui/material";
import { queryAllByAltText } from "@testing-library/react";
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
    setSelectedOption:(opt:Option|undefined)=>void
}




const MyTextField = ({setSelectedOption}:MyTextFieldProps) => {

    const [query, setQuery] = useState('')
    const [options, setOptions] = useState<Option[]>([])
    

    useEffect(() => {
        if (query === '') return
        const timer = setTimeout(()=>{
            axios.get<cityResponse[]>('/locations/v1/cities/search', {
                params: {
                    apikey: 'SKnQENTsR7VAr5pGpvzdvlRvwZw6PC2F',
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
                console.log(citiesData)
            }).catch(e => {
                console.log(e)
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