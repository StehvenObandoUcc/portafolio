"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export interface GalleryShot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectGalleryLabels {
  open: string;
  count: string;
  close: string;
  prev: string;
  next: string;
  /** "{n} of {total}" */
  position: string;
}

interface ProjectGalleryProps {
  title: string;
  shots: GalleryShot[];
  labels: ProjectGalleryLabels;
  /** The cover, rendered on the server; it becomes the button that opens the gallery. */
  children: ReactNode;
}

/** The project cover opens a modal gallery of full, uncropped screenshots. */
export function ProjectGallery({ title, shots, labels, children }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = shots.length;
  const shot = shots[index];

  const go = useCallback((step: number) => setIndex((i) => (i + step + total) % total), [total]);

  const open = () => {
    setIndex(0);
    dialogRef.current?.showModal();
    document.body.dataset.scrollLocked = "";
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => delete document.body.dataset.scrollLocked;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [go]);

  const position = labels.position.replace("{n}", String(index + 1)).replace("{total}", String(total));

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={labels.open}
        className="group/cover absolute inset-0 block size-full cursor-zoom-in text-left"
      >
        {children}
        <span className="text-label absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 text-ink shadow-card transition-transform duration-300 ease-out group-hover/cover:-translate-y-0.5">
          <Icon name="layout" size={14} className="text-accent-600" />
          {labels.count}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto w-[min(1100px,calc(100vw-24px))] max-w-none rounded-lg border border-line bg-paper p-0 text-ink shadow-card backdrop:bg-[var(--paper-sheet)] backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate font-semibold">{title}</p>
          <div className="flex items-center gap-3">
            <span className="text-label text-ink-mute tabular" aria-live="polite">
              {position}
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="grid size-11 place-items-center rounded-pill text-ink-soft transition-colors hover:bg-accent-50 hover:text-accent-600"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <div className="relative grid place-items-center bg-paper-2 px-2 py-4 sm:px-16">
          {shot && (
            // A sized box: a lazy image with no size of its own would never load inside the dialog.
            <div className="relative h-[min(42vh,600px)] w-full sm:h-[min(64vh,600px)]">
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                fill
                loading="eager"
                sizes="(min-width: 1100px) 1000px, 92vw"
                className="object-contain"
              />
            </div>
          )}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={labels.prev}
                className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-pill border border-line bg-surface text-ink shadow-card transition-colors hover:text-accent-600"
              >
                <Icon name="arrow-right" size={18} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={labels.next}
                className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-pill border border-line bg-surface text-ink shadow-card transition-colors hover:text-accent-600"
              >
                <Icon name="arrow-right" size={18} />
              </button>
            </>
          )}
        </div>

        {shot && <p className="px-4 pt-3 text-[14px] text-ink-soft sm:px-6">{shot.alt}</p>}

        {total > 1 && (
          <ul className="flex gap-2 overflow-x-auto px-4 pt-3 pb-4 sm:px-6">
            {shots.map((item, i) => (
              <li key={item.src} className="flex-none">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={labels.position.replace("{n}", String(i + 1)).replace("{total}", String(total))}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "block h-14 w-20 overflow-hidden rounded-sm border-2 bg-paper-2 transition-colors",
                    i === index ? "border-accent-600" : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <Image src={item.src} alt="" width={160} height={112} sizes="80px" className="size-full object-cover object-top" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </dialog>
    </>
  );
}
