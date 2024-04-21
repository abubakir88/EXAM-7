import "./home.scss";
// import { Data } from "../fetchData";
import { useEffect, useState } from "react";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);

  const clientID = "7f7be62cd9214945946e8dc273d09a16";
  const clientSecret = "05c4aceb6ff04c5b86af198f5d6f3b04";
  const token = "https://accounts.spotify.com/api/token";
  const url = "https://api.spotify.com/v1/browse/featured-playlists";
  const getToken = async () => {
    await fetch(token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "asset_token",
          JSON.stringify(`${data.token_type} ${data.access_token}`)
        );
      })
      .catch((err) => console.log(err));
  };
  /////// 2///
  const getPlaylists = async () => {
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("asset_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
        console.log(data.playlists.items);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      await getPlaylists();
    };
    fetchData();
  }, []);
  return (
    <div className="playlist-container">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist-card">
          <img src={playlist.images[0].url} alt={playlist.name} />
          <h3>{playlist.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;