import { NextResponse } from 'next/server';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?limit=5`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`;

const getAccessToken = async () => {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  const data = await res.json();
  return data.access_token;
};

const getNowPlaying = async () => {
  const access_token = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status === 204 || res.status > 400) {
    return null;
  }

  const data = await res.json();
  console.log("data",token);
  return data;
};

const getRecentlyPlayed = async () => {
  const access_token = await getAccessToken();

  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status === 204 || res.status > 400) {
    return null;
  }

  const data = await res.json();
  console.log("data",data.items);
  return data.items;
};

const getTopArtists = async () => {
  const access_token = await getAccessToken();

  const res = await fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status === 204 || res.status > 400) {
    return null;
  }

  const data = await res.json();
  return data.items;
};

const getTopTracks = async () => {
  const access_token = await getAccessToken();

  const res = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status === 204 || res.status > 400) {
    return null;
  }

  const data = await res.json();
  return data.items;
};


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'now-playing') {
    const response = await getNowPlaying();

    if (!response || response.currently_playing_type !== 'track') {
      return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    const data = {
      isPlaying: response.is_playing,
      title: response.item.name,
      album: response.item.album.name,
      artist: response.item.album.artists.map(artist => artist.name).join(', '),
      albumImageUrl: response.item.album.images[0].url,
      songUrl: response.item.external_urls.spotify,
    };

    return NextResponse.json(data, { status: 200 });
  }

  if (type === 'recently-played') {
    const response = await getRecentlyPlayed();

    if (!response) {
      return NextResponse.json({ tracks: [] }, { status: 200 });
    }

    const tracks = response.map(item => ({
      playedAt: item.played_at,
      track: {
        title: item.track.name,
        album: item.track.album.name,
        artist: item.track.album.artists.map(artist => artist.name).join(', '),
        albumImageUrl: item.track.album.images[0].url,
        songUrl: item.track.external_urls.spotify,
      },
    }));

    return NextResponse.json({ tracks }, { status: 200 });
  }

  if (type === 'top-artists') {
    const response = await getTopArtists();

    if (!response) {
      return NextResponse.json({ artists: [] }, { status: 200 });
    }

    const artists = response.map(artist => ({
      name: artist.name,
      imageUrl: artist.images[0].url,
      genres: artist.genres.join(', '),
      spotifyUrl: artist.external_urls.spotify,
    }));

    return NextResponse.json({ artists }, { status: 200 });
  }

  if (type === 'top-tracks') {
    const response = await getTopTracks();

    if (!response) {
      return NextResponse.json({ tracks: [] }, { status: 200 });
    }

    const tracks = response.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists,
      album: track.album,
      explicit: track.explicit,
      url: track.external_urls.spotify,
    }));

    return NextResponse.json({ tracks }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid type parameter' }, { status: 400 });
}






