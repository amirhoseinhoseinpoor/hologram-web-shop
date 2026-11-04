"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import style from "./VideoShowcase.module.scss";

// Player with a selectable playlist. `videos`: [{ src, poster, title, description }]
export default function VideoShowcase({ videos, fallbackTitle = "ویدیو" }) {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const shouldAutoPlay = useRef(false);

  if (!videos?.length) return null;

  const active = videos[current] || videos[0];

  const select = (index) => {
    if (index === current) return;
    shouldAutoPlay.current = true;
    setIsLoading(true);
    setCurrent(index);
  };

  return (
    <div className={videos.length > 1 ? style.layout : style.layoutSingle}>
      <div className={style.playerColumn}>
        <div className={style.player}>
          <video
            key={active.src}
            ref={videoRef}
            src={active.src}
            poster={active.poster || undefined}
            controls
            playsInline
            // A video with a poster downloads nothing until someone asks for it.
            preload={active.poster && !shouldAutoPlay.current ? "none" : "metadata"}
            aria-label={active.title || fallbackTitle}
            onLoadedData={(e) => {
              setIsLoading(false);
              if (shouldAutoPlay.current) e.currentTarget.play().catch(() => {});
            }}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className={style.loading}>
              <div className="az-spinner" />
            </div>
          )}
        </div>
        {(active.title || active.description) && (
          <div className={style.caption}>
            {active.title && <h3 className="az-h3">{active.title}</h3>}
            {active.description && (
              <p className="az-muted">{active.description}</p>
            )}
          </div>
        )}
      </div>

      {videos.length > 1 && (
        <ul className={style.playlist}>
          {videos.map((video, index) => (
            <li key={video.src}>
              <button
                type="button"
                className={`${style.item} ${index === current ? style.itemActive : ""}`}
                aria-pressed={index === current}
                onClick={() => select(index)}
              >
                <span className={style.thumb}>
                  {video.poster && (
                    <Image src={video.poster} alt="" fill sizes="96px" />
                  )}
                  <PlayArrowRoundedIcon aria-hidden="true" />
                </span>
                <span className={style.itemTitle}>
                  {video.title || `${fallbackTitle} ${index + 1}`}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
