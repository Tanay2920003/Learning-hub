"use client";

import {
  X,
  Bookmark,
  Play,
  Trash2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import {
  useSavedItems,
  toggleSaveItem,
  clearSavedLibrary,
  type SavedItem,
} from "@/lib/saved-library";

interface LibraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LibraryDrawer({ isOpen, onClose }: LibraryDrawerProps) {
  const items = useSavedItems();

  if (!isOpen) return null;

  const handleRemove = (item: SavedItem) => {
    toggleSaveItem({
      id: item.id,
      title: item.title,
      creator: item.creator,
      url: item.url,
      type: item.type,
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-[110] flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0f0f0f] shadow-2xl animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-[#141414]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff0000] text-white">
                <Bookmark className="h-4 w-4 fill-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Your Library</h3>
                <p className="text-xs text-white/50">{items.length} saved resources</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearSavedLibrary}
                  title="Clear all saved items"
                  className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-8 text-white/50">
                <Bookmark className="h-12 w-12 text-white/20 mb-3" />
                <h4 className="font-medium text-white/80 text-sm">No saved items yet</h4>
                <p className="text-xs text-white/40 mt-1 max-w-[220px]">
                  Click the bookmark icon on any course or guide to save it to your library.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.url}
                  className="group relative flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#181818] p-3 transition-colors hover:bg-[#232323]"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 cursor-pointer items-center gap-3 min-w-0"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/50 border border-white/10 text-white group-hover:bg-[#ff0000] transition-colors">
                      {item.type === "playlist" ? (
                        <Play className="h-4 w-4 fill-white" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-xs sm:text-sm text-white line-clamp-1 group-hover:text-white/90">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/50 line-clamp-1 mt-0.5">
                        {item.creator || "Learning Hub"}
                        {item.videoCount ? ` • ${item.videoCount} lessons` : ""}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-1 pl-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open external link"
                      className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      title="Remove from library"
                      className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
