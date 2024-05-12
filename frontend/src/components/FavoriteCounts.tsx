'use client';
import React from 'react';

import FocusCountdown from "@/components/FocusCountdown";
import FavoriteCountCard from "@/components/FavoriteCountCard";


export default function FavoriteCounts() {

    const [favoriteCount, setFavoriteCount] = React.useState({});
    const [profile, setProfile] = React.useState(null);
    const [followingCountdowns, setFollowingCountdowns] = React.useState([]);

    const getFavoriteCount = async () => {
        const favoriteCountRes = await fetch(`/api/countdown/${profile.favoriteCountdown}`);
        const favoriteCount = await favoriteCountRes.json();
        return favoriteCount;
    };

    const getFollowingCounts = async () => {
        const followingCountsRes = await fetch(`/api/countdown/list/?countList=${profile.followingCountdowns}`);
        const followingCounts = await followingCountsRes.json();
        return followingCounts;
    };

    React.useEffect(() => {
        const obtainProfile = async () => {
            const profile = await fetch('/api/getUserProfile/');
            const profileData = await profile.json();
            setProfile(profileData);
        };

        obtainProfile();
    }, []);

    React.useEffect(() => {
        const obtainFavoriteCount = async () => {
            if (profile !== null) {
                const count = await getFavoriteCount();
                setFavoriteCount(count);
            }
        };
        const obtainFollowingCounts = async () => {
            if (profile !== null) {
                const counts = await getFollowingCounts();
                setFollowingCountdowns(counts);
            }
        };

        obtainFavoriteCount();
        obtainFollowingCounts();
    }, [profile]);

    const getFillerCountdowns = () => {
        const fillerArray = new Array(6 - followingCountdowns.length).fill(0);
        return fillerArray.map((_, index) => { return <div className="w-[25rem] min-h-[5.324rem] p-6 flex justify-center items-center bg-base-300 rounded"><span className="flex justify-center items-center text-8xl text-base-300 bg-base-100 rounded">+</span></div> });
    };

    return (
        <div className="container mx-auto my-8 min-h-[85dvh] flex flex-col justify-around items-center gap-6">
            <section id="favorite-count">
                <FocusCountdown countDown={favoriteCount} />
            </section>
            <section id="favorite-counts" className="flex flex-col md:flex-row md:flex-wrap justify-start md:justify-around items-stretch gap-4">
                {followingCountdowns.map((countDown, index) => {
                    return <FavoriteCountCard key={index} countDown={countDown} />;
                })}
                {followingCountdowns.length < 6 && <>{getFillerCountdowns()}</>}
            </section>
        </div>
    );
}