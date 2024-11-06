import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

function SongItems({ name, image, desc, id }) {
  const { playWithId } = useContext(PlayerContext);
  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[260px]  size-72  p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded size-56" src={image} alt="" />
      <p className="font-bold mt-2 mb-1"> {name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
}

export default SongItems;
