"use client";
import Image from "next/image";
import useSWR from "swr"
import NowPlaying from "./components/NowPlaying";
import RecentlyPlayed from "./components/RecentlyPlayedTracks";
import TopArtists from "./components/TopFive";

export default function Home() {
  return (
    <main className="p-12">
      <NowPlaying />
      <RecentlyPlayed />
      <TopArtists />
    </main>
  );
}
