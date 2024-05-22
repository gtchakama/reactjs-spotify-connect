import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentlyPlayed = () => {

  const [tracks, setTracks] = useState([
    {
      track: {
        title: 'SICKO MODE',
        album: 'ASTROWORLD',
        artist: 'Travis Scott',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b2739b8df4e9a070d5c2348bdfc3',
        songUrl: 'https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h',
      },
    },
    {
      track: {
        title: 'God\'s Plan',
        album: 'Scorpion',
        artist: 'Drake',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273ec9b3b2f9c5a1ac5054ff719',
        songUrl: 'https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn',
      },
    },
    {
      track: {
        title: 'HUMBLE.',
        album: 'DAMN.',
        artist: 'Kendrick Lamar',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273b4d4a7deab9cf63e7a5ff099',
        songUrl: 'https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS',
      },
    },
    {
      track: {
        title: 'Bad and Boujee (feat. Lil Uzi Vert)',
        album: 'Culture',
        artist: 'Migos',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273192b10db8db34371c1b2d95c',
        songUrl: 'https://open.spotify.com/track/4Km5HrUvYTaSUfiSGPJeQR',
      },
    },
    {
      track: {
        title: 'Goosebumps',
        album: 'Birds in the Trap Sing McKnight',
        artist: 'Travis Scott',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273f71b098c0457a859da1efb16',
        songUrl: 'https://open.spotify.com/track/6gBFPUFcJLzWGx4lenP6h2',
      },
    },
    {
      track: {
        title: 'Life Goes On',
        album: 'Bakk Season',
        artist: 'Lil Baby',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273189d9f3f6b2e52ab8b14a8d3',
        songUrl: 'https://open.spotify.com/track/4Llt9B7R98dB95Vfkkf1F2',
      },
    },
    {
      track: {
        title: 'ROCKSTAR (feat. Roddy Ricch)',
        album: 'BLAME IT ON BABY',
        artist: 'DaBaby',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273dbbbed2d7ec4e8836a0fdd6f',
        songUrl: 'https://open.spotify.com/track/7ytR5pFWmSjzHJIeQkgog4',
      },
    },
    {
      track: {
        title: 'Highest in the Room',
        album: 'JACKBOYS',
        artist: 'Travis Scott',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273dcb17a74818a238c5bd16a1b',
        songUrl: 'https://open.spotify.com/track/3eekarcy7kvN4yt5ZFzltW',
      },
    },
  ]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await axios.get('/api?type=recently-played');
        response.data.tracks.length > 0 && setTracks(response.data.tracks);
      } catch (error) {
        console.error('Error fetching recently played tracks:', error);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  if (tracks.length === 0) {
    return <div>No recently played tracks</div>;
  }

  return (
    <div className='p-12'>
      <h2 className='text-4xl pb-8 font-semibold text-white' >Recently Played Tracks</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {tracks.map((track, index) => (
          <a key={index} href={track.track.songUrl} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={'https://via.placeholder.com/150'}
                alt="Album cover"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-2xl text-gray-100">{track.track.title} - {track.track.artist}</h3>
            <p className="text-lg font-medium text-gray-100">{track.track.album}</p>
          </a>
        ))}
      </div>




    </div>
  );
};

export default RecentlyPlayed;
