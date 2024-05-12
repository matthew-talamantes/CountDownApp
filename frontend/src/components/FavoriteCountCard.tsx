"use client";

import React from 'react';
import getTwelveHourTime from '@/utils/getTwelveHourTime';
import MONTHS from '@/utils/months';
import useCountdown from '@/utils/useCountdown';

export default function FavoriteCountCard({ countDown }) {
    const [date, setDate] = React.useState(new Date());
    const { sign, daysLeft, hoursLeft, minutesLeft, secondsLeft } = useCountdown(date);
    const dateOptions = { hour12: true, timeZone: countDown.timeZone, hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric', year: 'numeric', timeZoneName: 'short' };

    React.useEffect(() => {
        const dateValue = new Date(Date.parse(countDown.localizedDateTime));
        setDate(dateValue);
    }, [countDown.localizedDateTime]);

    return (
        <article className="w-[25rem] flex flex-col justify-start items-center gap-2 bg-base-300 rounded p-3">
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-1 w-full">
                <h3 className="text-xl font-normal text-base-content">{countDown.title}</h3>
                <h4 className="text-sm font-medium text-base-content">{date.toLocaleString('en-US', { hour12: true, timeZone: countDown.timeZone, hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric', year: 'numeric', timeZoneName: 'short' })}</h4>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
                {sign === '-' && <h2 className="text-[1.05rem] font-semibold text-base-content">{sign}</h2>}
                <h2 className="text-[1.05rem] font-semibold text-base-content">{daysLeft} Days</h2>
                <h2 className="text-[1.05rem] font-semibold text-base-content">{hoursLeft} Hours</h2>
                <h2 className="text-[1.05rem] font-semibold text-base-content">{minutesLeft} Minutes</h2>
                <h2 className="text-[1.05rem] font-semibold text-base-content">{secondsLeft} Seconds</h2>
            </div>
        </article>
    );
}