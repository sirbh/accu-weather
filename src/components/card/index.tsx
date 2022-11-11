import * as React from 'react';
import { Card, Chip, Typography } from '@mui/material';

interface BasicCardProps {
    cityName?: string,
    countryLabel?: string,
    temperature?: number,
    phrase?: string,
    iconNumber?: number
}

export default function BasicCard({ cityName, countryLabel, temperature, phrase, iconNumber }: BasicCardProps) {
    return (
        <Card variant='outlined' sx={{ minWidth: 300, padding: '20px 30px' }}>
            <Typography sx={{ display: 'inline', fontSize: 40 }}>
                {cityName}
            </Typography>
            <Chip label={countryLabel} sx={{ margin: '0px 0px 30px 10px', width: '50px' }} color='primary'></Chip>
            <div></div>
            <Typography variant='h1' sx={{ display: 'inline', position: 'relative' }}>
                {temperature}<span style={{ position: 'absolute', fontSize: 40, left: 110, top: 9 }}>°C</span>
            </Typography>
            <img src={`https://developer.accuweather.com/sites/default/files/${iconNumber?.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-s.png`} alt='icon' style={{ display: 'block' }} width='125px'></img>
            <Typography sx={{ textTransform: 'uppercase', color: 'gray', marginLeft:'20px' }}>
                {phrase}
            </Typography>
        </Card>
    );
}
