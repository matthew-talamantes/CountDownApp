"use client";

import React from 'react';
import getTwelveHourTime from '@/utils/getTwelveHourTime';
import MONTHS from '@/utils/months';
import useCountdown from '@/utils/useCountdown';

export default function FavoriteCountCard({ countDown: { title, dateTime, timeZone } }) {
    const date = new Date(Date.parse(dateTime));
    const { sign, daysLeft, hoursLeft, minutesLeft, secondsLeft } = useCountdown(date);
    const dateOptions = { hour12: true, timeZone: timeZone, hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric', year: 'numeric', timeZoneName: 'short' };

    return (
        <article className="flex flex-col justify-start items-center gap-2">
            <div className="flex flex-col justify-start items-start gap-1 w-full">
                <h3 className="text-[1.69rem] font-normal text-base-content">{title}</h3>
                <h4 className="text-base font-medium text-base-content">{date.toLocaleString('en-US', { hour12: true, timeZone: timeZone, hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric', year: 'numeric', timeZoneName: 'short' })}</h4>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
                {sign === '-' && <h2 className="text-[1.18rem] font-semibold text-base-content">{sign}</h2>}
                <h2 className="text-[1.18rem] font-semibold text-base-content">{daysLeft} Days</h2>
                <h2 className="text-[1.18rem] font-semibold text-base-content">{hoursLeft} Hours</h2>
                <h2 className="text-[1.18rem] font-semibold text-base-content">{minutesLeft} Minutes</h2>
                <h2 className="text-[1.18rem] font-semibold text-base-content">{secondsLeft} Seconds</h2>
            </div>
        </article>
    );
}