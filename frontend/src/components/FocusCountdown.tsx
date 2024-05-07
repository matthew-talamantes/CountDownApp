"use client";

import React from 'react';
import getTwelveHourTime from '@/utils/getTwelveHourTime';
import MONTHS from '@/utils/months';
import useCountdown from '@/utils/useCountdown';

export default function FocusCountdown({ countDown: { title, dateTime, timeZone } }) {
    const date = new Date(Date.parse(dateTime));
    const [time, setTime] = React.useState(getTwelveHourTime(date));
    const { sign, daysLeft, hoursLeft, minutesLeft, secondsLeft } = useCountdown(date);
    // console.log(sign);
    return (
        <article className="container max-w-[48.5rem] mx-auto bg-base-300 rounded p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h3 className="text-3xl font-semibold text-base-content">{title}</h3>
                <h4 className="text-2xl font-normal text-base-content">{time} {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()} {timeZone}</h4>
            </div>
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-center md:items-start gap-4">
                {sign === '-' && (<div className="grow-0"><h1 className="text-8xl font-semibold text-base-content">{sign}</h1></div>)}
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-8xl font-semibold text-base-content">{daysLeft}</h1>
                    <p className="text-[2.5rem] font-normal text-base-content">Days</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-8xl font-semibold text-base-content">{hoursLeft}</h1>
                    <p className="text-[2.5rem] font-normal text-base-content">Hours</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-8xl font-semibold text-base-content">{minutesLeft}</h1>
                    <p className="text-[2.5rem] font-normal text-base-content">Minutes</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-8xl font-semibold text-base-content">{secondsLeft}</h1>
                    <p className="text-[2.5rem] font-normal text-base-content">Seconds</p>
                </div>
            </div>
        </article>
    );
}