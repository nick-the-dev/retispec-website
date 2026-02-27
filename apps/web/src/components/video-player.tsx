"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  vimeoId: string;
  thumbnailUrl: string;
}

export function VideoPlayer({ vimeoId, thumbnailUrl }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] cursor-pointer"
    >
      <Image
        src={thumbnailUrl}
        alt="Video thumbnail — click to play"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl group-hover:bg-white group-hover:scale-110 transition-all duration-300">
          <Play className="h-8 w-8 text-[#0369A1] ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-white text-xs font-medium">2:34</span>
      </div>
    </button>
  );
}
