import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopArtists = () => {

  const [tracks, setTracks] = useState([]
  );

  const token = 'BQAIO33IrwhUA-GoE4D_PXypvpkWZU2KxIO_ow-QCSDSFgiWstApXQ-pvOAfPM-KYIlcP47w-z2VI8_a269-9FkCzv5kbXSRP9UAlvv41pbcDWgy7vxYHuGzD-TEO0wwpvB34arVcVWdoXVDOD-mz4JbPNfYt5nScjx7QIuuCBeNLe52J_PREcxbVm8Iujyj1MM8u5WKQeAmO9xoEmpz4l2OBh2p5IUDlbloJ4iyxsLdLkrweF9nPi8JudCMgiX7fvIjduwd6IfeBHcC7xRDitpe';


  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('response', response.data);
        const filteredTracks = response.data.items.map((track) => ({
          name: track.name,
          artists: track.artists,
          album: track.album,
          explicit: track.explicit,
          url: track.external_urls.spotify,
        }));
        setTracks(filteredTracks);

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
      <h2 className='text-4xl pb-8 font-semibold text-white'>Top Tracks</h2>
      <div>


        <h2 className='text-4xl pt-8 pb-8 font-semibold text-white'>Top Tracks</h2>


        <ul>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {tracks.map((track) => (
              <a href={track.url} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={track.album.images[0].url}
                    alt="Album cover"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-2xl text-gray-100">{track.name}</h3>
                <p className="text-gray-500">{track.artists[0].name}</p>
                <p className="text-lg font-medium text-gray-100">{track.album.name}</p>
              </a>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TopArtists;
