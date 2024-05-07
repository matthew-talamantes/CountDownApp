"use client";

const getTwelveHourTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const twelveHour = hours % 12 || 12;
    return `${twelveHour}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};

export default getTwelveHourTime;