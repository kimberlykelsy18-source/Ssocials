import { useState, useEffect } from "react";
import { X, RefreshCw, Check } from "lucide-react";
import { getMediaItems, type MediaItem } from "@backend/db";

interface Props {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaPickerModal({ onSelect, onClose }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getMediaItems().then((data) => {
      setItems(data.filter((i) => i.type === "image"));
      setLoading(false);
    });
  }, []);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-background w-full max-w-[820px] max-h-[85vh] flex flex-col border border-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-[15px] tracking-[-0.01em]">Media Library</h2>
            <p className="mt-0.5 text-[11px] opacity-40">Select an image to insert</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 opacity-40 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 animate-spin opacity-30" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[13px] opacity-40">No images uploaded yet.</p>
              <p className="mt-1 text-[11px] opacity-25">Upload images in the Media tab first, then come back here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {items.map((item) => {
                const isSelected = selected === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(item.url)}
                    onDoubleClick={() => onSelect(item.url)}
                    className={`group relative aspect-square overflow-hidden border-2 transition-all focus:outline-none ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/60"
                    }`}
                    title={item.name}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Selected checkmark */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    {/* Name tooltip on hover */}
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] text-white truncate">{item.name}</p>
                      {item.purpose !== "general" && (
                        <p className="text-[8px] text-white/60 truncate capitalize">{item.purpose}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border shrink-0">
          <p className="text-[11px] opacity-35">
            {selected
              ? "Image selected — click Insert or double-click a thumbnail"
              : `${items.length} image${items.length !== 1 ? "s" : ""} in library`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[12px] tracking-[0.05em] border border-border hover:border-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => selected && onSelect(selected)}
              disabled={!selected}
              className="px-4 py-2 text-[12px] tracking-[0.05em] bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-35"
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
