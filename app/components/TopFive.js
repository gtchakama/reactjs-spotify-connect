import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopArtists = () => {
  const [artists, setArtists] = useState([
    {
      name: 'Taylor Swift',
      genres: 'Pop, Country, Folk',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1f90bb8c012faa3ff3dd7d7c',
      spotifyUrl: 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02',
    },
    {
      name: 'Drake',
      genres: 'Hip-hop, R&B, Pop',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb7b1d6476b5b6d196d34e49e6',
      spotifyUrl: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4',
    },
    {
      name: 'Daft Punk',
      genres: 'Electronic, Dance',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb493cb1cbad64f4a6dbac46e4',
      spotifyUrl: 'https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi',
    },
    {
      name: 'Ludovico Einaudi',
      genres: 'Classical, Instrumental',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb7a0a5a6e5f92d23e5f1c84b1',
      spotifyUrl: 'https://open.spotify.com/artist/2uFUBdaVGtyMqckSeCl0Qj',
    },
    {
      name: 'Bob Marley',
      genres: 'Reggae, Ska',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb45cd1e40b7fd49c1ac485b15',
      spotifyUrl: 'https://open.spotify.com/artist/2QsynagSdAqZj3U9HgDzjD',
    },
  ]);


  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get('/api?type=top-artists');
        response.data.artists.length > 0 && setArtists(response.data.artists);
      } catch (error) {
        console.error('Error fetching top artists:', error);
      }
    };

    fetchTopArtists();
  }, []);


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (
    <div className='p-12'>
      <h2 className='text-4xl pb-8 font-semibold text-white'>Top Artists</h2>
      <div>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
        {artists.map((artist, index) => (
          <li key={index} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                'bg-yellow-500 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              GT
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href={artist.spotifyUrl} className="font-medium text-gray-900 hover:text-gray-600">
                {artist.name}
                </a>
                <p className="text-gray-500">{index + 2 + Math.random().toFixed(0) } Songs</p>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TopArtists;
