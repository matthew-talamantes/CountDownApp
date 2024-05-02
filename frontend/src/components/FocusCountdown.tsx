"use client";

import React from 'react';
import getTwelveHourTime from '@/utils/getTwelveHourTime';
import MONTHS from '@/utils/months';
import useCountdown from '@/utils/useCountdown';

export default function FocusCountdown({ title, dateTime }) {
    const date = new Date(Date.parse(dateTime));
    const { sign, daysLeft, hoursLeft, minutesLeft, secondsLeft } = useCountdown(date);
    // console.log(sign);
    return (
        <article>
            <div>
                <h3>{title}</h3>
                <h4>{getTwelveHourTime(date)} {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h4>
            </div>
            <div>
                {sign === '-' && (<div><h1>{sign}</h1></div>)}
                <div>
                    <h1>{daysLeft}</h1>
                    <p>Days</p>
                </div>
                <div>
                    <h1>{hoursLeft}</h1>
                    <p>Hours</p>
                </div>
                <div>
                    <h1>{minutesLeft}</h1>
                    <p>Minutes</p>
                </div>
                <div>
                    <h1>{secondsLeft}</h1>
                    <p>Seconds</p>
                </div>
            </div>
        </article>
    );
}