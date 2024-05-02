import FocusCountdown from "@/components/FocusCountdown";


export default function FavoriteCounts() {

    const favoriteCount = {
        title: "Family Beach Trip",
        dateTime: "2024-06-21T08:00:00.00-04:00",
        description: "Beach trip with the family.",
        created_at: "2024-06-21T13:12:24.604664-04:00",
        created_by: "user1",
        updated_at: null,
        updated_by: null,
        public_link: false,
        shared_with: [],
    };


    return (
        <div>
            <section id="favorite-count">
                <FocusCountdown title={favoriteCount.title} dateTime={favoriteCount.dateTime} />
            </section>
            <section id="favorite-counts">
                <article>
                    <div>
                        <h3>New Years Eve</h3>
                        <h5>12:00AM Jan. 1, 2025</h5>
                    </div>
                    <div>
                        <h3>340 Days 12 Hours 10 Minutes 30 Seconds</h3>
                    </div>
                </article>
            </section>
        </div>
    );
}