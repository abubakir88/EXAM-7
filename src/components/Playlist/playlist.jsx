import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Your_Top_mixes } from "../links";
import { getPlaylists, getToken } from "../fetchData";

const Details = () => {
  const { id } = useParams();
  const api = window.location.href;
  const apiUrl = api.toString().split("?type=")[1];
  const tokenURl = "https://accounts.spotify.com/api/token";

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken(tokenURl);
        const playlists = await getPlaylists(Your_Top_mixes);
        const albom = await getPlaylists(
          "https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks"
        );
        console.log(albom);
        setData(playlists?.playlists.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [api, apiUrl, id]);

  return (
    <div>
      <h1 style={{ color: "red" }}>
        {data?.map((el, i) => {
          if (el?.id === id) {
            return <h1 key={i}>{el?.name}</h1>;
          }
        })}
      </h1>
    </div>
  );
};

export default Details;
