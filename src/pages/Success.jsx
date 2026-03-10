import React from "react";
import { useLocation } from "react-router-dom";

export const Success = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  let links = [];

  try {
    const encoded = params.get("links");

    if (encoded) {
      links = JSON.parse(decodeURIComponent(encoded));
    }
  } catch (e) {
    console.error("Link parse error:", e);
  }

  if (!links.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">No Purchase Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-[#0A0A0A] p-10 rounded-3xl border border-white/10 space-y-8">

        <h1 className="text-3xl font-black text-emerald-400">
          🎉 Payment Successful
        </h1>

        {links.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            <h2 className="text-xl font-bold mb-4">
              {item.title} ({item.language})
            </h2>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 px-4 py-2 rounded-xl font-bold"
            >
              Open Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};