import React from "react";

function MovieCard({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className=" bg-slate-400 w-72 h-[28rem] rounded-lg relative overflow-hidden mx-auto">
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover rounded-lg "
      />
      <div className="px-4 py-8 absolute bottom-0 bg-gradient-to-t from-black w-full">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
}

export default MovieCard;
