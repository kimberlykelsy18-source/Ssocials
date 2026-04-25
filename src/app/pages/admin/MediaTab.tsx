import { useState, useRef, useEffect } from "react";
import { RefreshCw, Upload, Eye, Copy, Check, Trash2, ImageIcon, Video } from "lucide-react";
import { SECTION_HEADING, INPUT_ADMIN as INPUT_CLS, LABEL_ADMIN } from "../../lib/styles";
import {
  getMediaItems,
  uploadMediaItem,
  deleteMediaItem,
  type MediaItem,
} from "@backend/db";

export function MediaTab() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaPurpose, setMediaPurpose] = useState("general");
  const mediaFileRef = useRef<HTMLInputElement>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const data = await getMediaItems();
    setMediaItems(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setMediaFile(file);
    if (file && !mediaName) setMediaName(file.name.replace(/\.[^.]+$/, ""));
  };

  const handleUpload = async () => {
    if (!mediaFile) { setUploadError("Please select a file."); return; }
    if (!mediaName.trim()) { setUploadError("Please enter a name."); return; }
    setUploading(true);
    setUploadError("");
    const result = await uploadMediaItem(mediaFile, mediaName.trim(), mediaPurpose);
    if (result.ok && result.item) {
      setMediaItems((prev) => [result.item!, ...prev]);
      setMediaFile(null);
      setMediaName("");
      setMediaPurpose("general");
      if (mediaFileRef.current) mediaFileRef.current.value = "";
    } else {
      setUploadError(result.error ?? "Upload failed.");
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!confirm("Delete this media item? It will be removed from storage.")) return;
    await deleteMediaItem(id, storagePath);
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className={SECTION_HEADING}>Media Library</h2>
          <p className="mt-1 text-[12px] opacity-50">Upload images and videos to Supabase Storage. Use URLs in CMS fields.</p>
        </div>
        <button onClick={fetchMedia} className="flex items-center gap-2 px-3 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Upload card */}
      <div className="border border-border p-5 md:p-6 space-y-4 max-w-[700px]">
        <p className="text-[11px] tracking-[0.08em] opacity-60 uppercase">Upload New File</p>

        <div>
          <input ref={mediaFileRef} type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,video/mp4,video/webm"
            onChange={handleFileChange} className="hidden"
          />
          <button onClick={() => mediaFileRef.current?.click()}
            className="flex items-center gap-3 px-5 py-3 border-2 border-dashed border-border hover:border-primary transition-colors text-[13px] tracking-[0.05em] w-full justify-center"
          >
            <Upload className="w-4 h-4 opacity-50" />
            {mediaFile ? (
              <span>{mediaFile.name} <span className="opacity-40">({(mediaFile.size / 1024).toFixed(0)} KB)</span></span>
            ) : (
              <span className="opacity-50">Click to select image or video</span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_ADMIN}>Name / Label</label>
            <input type="text" value={mediaName} onChange={(e) => setMediaName(e.target.value)}
              placeholder="e.g. Hero Image Jan 2025"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className={LABEL_ADMIN}>Purpose</label>
            <select value={mediaPurpose} onChange={(e) => setMediaPurpose(e.target.value)}
              className={`${INPUT_CLS} appearance-none`}
            >
              <option value="general">General</option>
              <option value="hero">Hero</option>
              <option value="portfolio">Portfolio</option>
              <option value="about">About</option>
              <option value="team">Team</option>
            </select>
          </div>
        </div>

        {uploadError && <p className="text-[12px] text-red-500">{uploadError}</p>}

        <button onClick={handleUpload} disabled={uploading || !mediaFile}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-[12px] tracking-[0.08em] uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading…" : "Upload to Supabase"}
        </button>
      </div>

      {/* Media grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square border border-border bg-secondary/30 animate-pulse" />
          ))}
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="py-12 text-center border border-border">
          <p className="opacity-40 text-[13px]">No media uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="group relative border border-border overflow-hidden bg-secondary/20">
              <div className="aspect-square relative overflow-hidden bg-secondary/40">
                {item.type === "image" ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Video className="w-8 h-8 opacity-30" />
                    <span className="text-[10px] opacity-40 tracking-[0.08em]">VIDEO</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a href={item.url} target="_blank" rel="noreferrer"
                    className="p-2 bg-white/20 hover:bg-white/30 transition-colors"
                    title="Open in new tab"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </a>
                  <button onClick={() => handleCopyUrl(item.id, item.url)}
                    className="p-2 bg-white/20 hover:bg-white/30 transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.id
                      ? <Check className="w-4 h-4 text-green-400" />
                      : <Copy className="w-4 h-4 text-white" />
                    }
                  </button>
                  <button onClick={() => handleDelete(item.id, item.storage_path)}
                    className="p-2 bg-red-500/40 hover:bg-red-500/60 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {item.type === "video"
                    ? <Video className="w-3 h-3 opacity-40 shrink-0" />
                    : <ImageIcon className="w-3 h-3 opacity-40 shrink-0" />
                  }
                  <p className="text-[11px] truncate opacity-70">{item.name}</p>
                </div>
                <p className="text-[10px] opacity-35 tracking-[0.07em]">{item.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
