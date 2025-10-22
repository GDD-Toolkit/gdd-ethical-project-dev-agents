
import React, { useMemo } from 'react'
import default_pfp from '@/assets/default_profile.jpg'
import { Trash2 } from 'lucide-react';

interface ProfileProps{
    diameter: number;
    src?: string| File | null;
    enable_replace?: boolean;
    className?: string;
    onRemove?: () => void;
}



export function ProfileIcon({
    diameter,
    src,
    enable_replace=false,
    className="",
    onRemove,
    }: ProfileProps){

        const objectUrl = useMemo(()=>{
            if(src instanceof File) return URL.createObjectURL(src)
            return null
        }, [src])
        const finalSrc =
            (typeof src === "string" ? src : objectUrl) || default_pfp;

        const badgeSize = Math.round(Math.max(24, Math.min(56, diameter * 0.28)));
        const iconSize = Math.round(badgeSize * 0.70);
        const badgeOffset = Math.round(badgeSize * 0.18);


 return (
    <div
      className={["relative inline-flex shrink-0 items-center justify-center", className].join(" ")}
      style={{ width: diameter, height: diameter }}
      role="img"
      aria-label="Profile picture"
    >
      <div className="h-full w-full overflow-hidden rounded-full">
        <img src={finalSrc} alt="" className="h-full w-full object-cover" draggable={false} />
      </div>

      {enable_replace && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Remove profile picture"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onRemove?.(); }
          }}
          className={[
            "absolute grid place-items-center",
            "rounded-full",
            "cursor-pointer transition-colors duration-150 hover:text-red-600",
            "z-10",
          ].join(" ")}
          style={{
            width: badgeSize,
            height: badgeSize,
            right: -badgeOffset,
            bottom: -badgeOffset,
          }}
        >
          <Trash2
            className="pointer-events-none"
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
    </div>
  );
}