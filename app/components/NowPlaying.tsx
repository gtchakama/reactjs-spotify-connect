"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface NowPlayingData {
  isPlaying: boolean;
  title: string;
  album: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await axios.get('/api?type=now-playing');
        setNowPlaying(response.data);
      } catch (error) {
        console.error('Error fetching now playing:', error);
      }
    };

    fetchNowPlaying();
  }, []);

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return <div>Not playing anything right now.</div>;
  }

  return (
    <div className=' bg-slate-50 py-28 m-12 rounded-lg'>
      <div className=" flex flex-col items-center justify-center">

        <div className="relative max-w-xl w-full h-36 bg-white rounded-lg shadow-lg overflow-hidde mb-32">
          <div className="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
            <img src={nowPlaying.albumImageUrl} alt={nowPlaying.title} />

            <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black">

            </div>
          </div>
          <div className="absolute flex space-x-6 transform translate-x-6 translate-y-8">
            <div className="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
              <img src={nowPlaying.albumImageUrl} alt={nowPlaying.title} />
            </div>
            <div className="text-white pt-12">
              <h3 className="font-bold">Album</h3>
              <div className="text-sm opacity-60">{nowPlaying.album}</div>
              <div className="mt-8 text-gray-400">
                <div className="flex items-center space-x-2 text-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                  <span>{nowPlaying.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NowPlaying;
