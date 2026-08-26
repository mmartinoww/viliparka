"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconClose } from "../icons";
import { useCopy } from "../lib/i18n/language-provider";
import { photo, type PhotoGroup, type PhotoId } from "../lib/photos";

const groupOrder: PhotoGroup[] = ["pool", "property", "interiors", "around"];

type PhotoGalleryProps = {
  ids: PhotoId[];
  /** Show the group filter row (used on the gallery page). */
  filterable?: boolean;
};

export function PhotoGallery({ ids, filterable = false }: PhotoGalleryProps) {
  const t = useCopy();
  const [activeGroup, setActiveGroup] = useState<PhotoGroup | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const availableGroups = useMemo(
    () => groupOrder.filter((group) => ids.some((id) => photo(id).group === group)),
    [ids]
  );

  const visible = useMemo(
    () => (activeGroup === "all" ? ids : ids.filter((id) => photo(id).group === activeGroup)),
    [ids, activeGroup]
  );

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("site-menu-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("site-menu-open");
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : photo(visible[openIndex]);

  return (
    <>
      {filterable && availableGroups.length > 1 ? (
        <div className="gallery-filters" role="group" aria-label={t.galleryPage.title}>
          <button
            type="button"
            className={`gallery-filter${activeGroup === "all" ? " gallery-filter--active" : ""}`}
            aria-pressed={activeGroup === "all"}
            onClick={() => setActiveGroup("all")}
          >
            {t.galleryPage.filterAll}
          </button>
          {availableGroups.map((group) => (
            <button
              key={group}
              type="button"
              className={`gallery-filter${activeGroup === group ? " gallery-filter--active" : ""}`}
              aria-pressed={activeGroup === group}
              onClick={() => setActiveGroup(group)}
            >
              {t.galleryPage.groups[group]}
            </button>
          ))}
        </div>
      ) : null}

      <div className="gallery-grid">
        {visible.map((id, index) => {
          const item = photo(id);
          return (
            <button
              type="button"
              key={id}
              className="gallery-tile"
              onClick={() => setOpenIndex(index)}
              aria-label={t.photoAlt[id]}
            >
              <Image
                src={item.src}
                alt={t.photoAlt[id]}
                width={item.width}
                height={item.height}
                sizes="(max-width: 620px) 100vw, (max-width: 1080px) 50vw, 33vw"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </button>
          );
        })}
      </div>

      {/* Portalled so the overlay escapes the section stacking context and sits
          above the pinned header. */}
      {current && mounted
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={t.photoAlt[current.id]}
              onClick={close}
            >
              <button type="button" className="lightbox__close" aria-label={t.actions.close}>
                <IconClose />
              </button>

              {visible.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="lightbox__nav lightbox__nav--prev"
                    aria-label={t.actions.previous}
                    onClick={(event) => {
                      event.stopPropagation();
                      step(-1);
                    }}
                  >
                    <IconChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="lightbox__nav lightbox__nav--next"
                    aria-label={t.actions.next}
                    onClick={(event) => {
                      event.stopPropagation();
                      step(1);
                    }}
                  >
                    <IconChevronRight />
                  </button>
                </>
              ) : null}

              <figure
                className="lightbox__figure"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={current.src}
                  alt={t.photoAlt[current.id]}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  priority
                />
                <figcaption className="lightbox__caption">
                  {t.photoAlt[current.id]}
                </figcaption>
              </figure>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
