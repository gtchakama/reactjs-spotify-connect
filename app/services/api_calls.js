// api requests to get now playing, recently played, and top artists
export const getNowPlaying = async () => {
    const res = await fetch('/api?type=now-playing');
    return res.json();
  };

  export const getRecentlyPlayed = async () => {
    const res = await fetch('/api?type=recently-played');
    return res.json();
  }

  export const getTopArtists = async () => {
    const res = await fetch('/api?type=top-artists');
    console.log(res);
    return res.json();
  }
