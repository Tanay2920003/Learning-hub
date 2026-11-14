"use client";

import { useSyncExternalStore, useMemo } from "react";

export interface SavedItem {
  id: string; // url or unique hash
  title: string;
  creator?: string;
  url: string;
  type: "playlist" | "article" | "tool";
  category?: string;
  videoCount?: number;
  difficulty?: string;
  savedAt: number;
}

const STORAGE_KEY = "learning_hub_saved_resources_v1";

declare global {
  interface WindowEventMap {
    "library-updated": CustomEvent<{ items: SavedItem[] }>;
  }
}

export function getSavedItems(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isItemSaved(url: string): boolean {
  if (typeof window === "undefined" || !url) return false;
  const items = getSavedItems();
  return items.some((i) => i.url === url);
}

export function toggleSaveItem(item: Omit<SavedItem, "savedAt">): boolean {
  if (typeof window === "undefined") return false;
  try {
    const items = getSavedItems();
    const index = items.findIndex((i) => i.url === item.url);
    let updated: SavedItem[];
    let isSavedNow = false;

    if (index >= 0) {
      // Remove
      updated = items.filter((i) => i.url !== item.url);
      isSavedNow = false;
    } else {
      // Add to front
      updated = [{ ...item, savedAt: Date.now() }, ...items];
      isSavedNow = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("library-updated", { detail: { items: updated } }));
    return isSavedNow;
  } catch {
    return false;
  }
}

export function clearSavedLibrary(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("library-updated", { detail: { items: [] } }));
}

/* ─── React 19 useSyncExternalStore Hooks ───────────────────── */
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("library-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("library-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

const SERVER_SNAPSHOT = "[]";
function getServerSnapshot(): string {
  return SERVER_SNAPSHOT;
}

export function useSavedItems(): SavedItem[] {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [raw]);
}

export function useIsItemSaved(url: string): boolean {
  const items = useSavedItems();
  return useMemo(() => items.some((i) => i.url === url), [items, url]);
}

export function useSavedCount(): number {
  const items = useSavedItems();
  return items.length;
}
