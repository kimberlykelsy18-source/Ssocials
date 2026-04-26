import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { INPUT_ADMIN as INPUT_CLS } from "../../lib/styles";
import { MediaPickerModal } from "./MediaPickerModal";

interface Props {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUrlField({ value, onChange, placeholder }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "https://example.com/image.jpg"}
          className={`${INPUT_CLS} flex-1 min-w-0`}
        />
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 border border-border text-[11px] tracking-[0.05em] hover:border-primary transition-colors shrink-0 whitespace-nowrap"
          title="Browse Media Library"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Browse
        </button>
      </div>

      {pickerOpen && (
        <MediaPickerModal
          onSelect={(url) => {
            onChange(url);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
}
