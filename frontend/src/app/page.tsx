import Navbar from "@/components/Navbar";
import FavoriteCounts from "@/components/FavoriteCounts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <FavoriteCounts />
      </main>
    </>
  );
}
