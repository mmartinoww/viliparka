"use client";

import Image from "next/image";
import { photo, type PhotoId } from "../lib/photos";
import { useCopy } from "../lib/i18n/language-provider";

type PhotoProps = {
  id: PhotoId;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Set for photos that fill a container with its own aspect ratio. */
  fill?: boolean;
};

export function Photo({ id, sizes = "100vw", priority, className, fill }: PhotoProps) {
  const t = useCopy();
  const source = photo(id);
  const alt = t.photoAlt[id];

  if (fill) {
    return (
      <Image
        src={source.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={source.src}
      alt={alt}
      width={source.width}
      height={source.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
