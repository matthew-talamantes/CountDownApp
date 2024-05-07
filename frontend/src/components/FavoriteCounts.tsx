import FocusCountdown from "@/components/FocusCountdown";
import FavoriteCountCard from "@/components/FavoriteCountCard";


export default function FavoriteCounts() {

    const favoriteCount = {
        title: "Family Beach Trip",
        dateTime: "2024-06-21T00:00:00.00-04:00",
        timeZone: "US/Eastern",
        description: "Beach trip with the family.",
        created_at: "2024-06-21T13:12:24.604664-04:00",
        created_by: "user1",
        updated_at: null,
        updated_by: null,
        public_link: false,
        shared_with: [],
    };

    const favoriteCounts = [
        {
            title: "Family Beach Trip",
            dateTime: "2024-06-21T00:00:00.00-04:00",
            timeZone: "US/Eastern",
            description: "Beach trip with the family.",
            created_at: "2024-06-21T13:12:24.604664-04:00",
            created_by: "user1",
            updated_at: null,
            updated_by: null,
            public_link: false,
            shared_with: [],
        },
        {
            title: "Family Beach Trip",
            dateTime: "2024-06-21T00:00:00.00-04:00",
            timeZone: "US/Eastern",
            description: "Beach trip with the family.",
            created_at: "2024-06-21T13:12:24.604664-04:00",
            created_by: "user1",
            updated_at: null,
            updated_by: null,
            public_link: false,
            shared_with: [],
        },
        {
            title: "Family Beach Trip",
            dateTime: "2024-06-21T00:00:00.00-04:00",
            timeZone: "US/Eastern",
            description: "Beach trip with the family.",
            created_at: "2024-06-21T13:12:24.604664-04:00",
            created_by: "user1",
            updated_at: null,
            updated_by: null,
            public_link: false,
            shared_with: [],
        },
        {
            title: "Family Beach Trip",
            dateTime: "2024-06-21T00:00:00.00-04:00",
            timeZone: "US/Eastern",
            description: "Beach trip with the family.",
            created_at: "2024-06-21T13:12:24.604664-04:00",
            created_by: "user1",
            updated_at: null,
            updated_by: null,
            public_link: false,
            shared_with: [],
        },
        {
            title: "Family Beach Trip",
            dateTime: "2024-06-21T00:00:00.00-04:00",
            timeZone: "US/Eastern",
            description: "Beach trip with the family.",
            created_at: "2024-06-21T13:12:24.604664-04:00",
            created_by: "user1",
            updated_at: null,
            updated_by: null,
            public_link: false,
            shared_with: [],
        },
        {
            title: "Family Beach Trip",
            dateTime: "2024-06-21T00:00:00.00-04:00",
            timeZone: "US/Eastern",
            description: "Beach trip with the family.",
            created_at: "2024-06-21T13:12:24.604664-04:00",
            created_by: "user1",
            updated_at: null,
            updated_by: null,
            public_link: false,
            shared_with: [],
        },
    ];


    return (
        <div className="container mx-auto my-8 min-h-[85dvh] flex flex-col justify-around items-center gap-6">
            <section id="favorite-count">
                <FocusCountdown countDown={favoriteCount} />
            </section>
            <section id="favorite-counts" className="flex flex-col md:flex-row md:flex-wrap justify-start md:justify-around items-center gap-4">
                {favoriteCounts.map((countDown, index) => {
                    return <FavoriteCountCard key={index} countDown={countDown} />;
                })}
            </section>
        </div>
    );
}