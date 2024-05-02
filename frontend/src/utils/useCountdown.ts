"use client";
import { useEffect, useState } from "react";

export default function useCountdown(dateTime: Date) {
    const [now, setNow] = useState(new Date());
    const [sign, setSign] = useState('');
    const [daysLeft, setDaysLeft] = useState(0);
    const [hoursLeft, setHoursLeft] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
            if (dateTime - now < 0) {
                setSign('-');
            } else {
                setSign('+');
            }
            setDaysLeft(Math.floor(Math.abs((dateTime - now) / (1000 * 60 * 60 * 24))));
            setHoursLeft(Math.floor(Math.abs((dateTime - now) / (1000 * 60 * 60) % 24)));
            setMinutesLeft(Math.floor(Math.abs((dateTime - now) / (1000 * 60) % 60)));
            setSecondsLeft(Math.floor(Math.abs((dateTime - now) / 1000 % 60)));
        }, 1000);
        return () => clearInterval(interval);
    });

    return { sign: sign, daysLeft: daysLeft, hoursLeft: hoursLeft, minutesLeft: minutesLeft, secondsLeft: secondsLeft };
}