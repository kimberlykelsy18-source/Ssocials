import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { SECTION_HEADING, TEXTAREA_ADMIN as TEXTAREA_CLS } from "../../lib/styles";
import {
  getContactSubmissions,
  updateSubmissionStatus,
  updateSubmissionNotes,
  type ContactSubmission,
  type SubmissionStatus,
} from "@backend/db";

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  new: "bg-blue-500/15 text-blue-600 border-blue-200",
  read: "bg-secondary text-primary/60 border-border",
  replied: "bg-green-500/15 text-green-700 border-green-200",
};

interface Props {
  onCountChange: (count: number) => void;
}

export function SubmissionsTab({ onCountChange }: Props) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  useEffect(() => { fetchSubmissions(); }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const data = await getContactSubmissions();
    setSubmissions(data);
    const drafts: Record<string, string> = {};
    data.forEach((s) => { drafts[s.id] = s.notes ?? ""; });
    setNoteDrafts(drafts);
    setLoading(false);
    onCountChange(data.filter((s) => s.status === "new").length);
  };

  const handleStatusChange = async (id: string, status: SubmissionStatus) => {
    await updateSubmissionStatus(id, status);
    setSubmissions((prev) => {
      const next = prev.map((s) => s.id === id ? { ...s, status } : s);
      onCountChange(next.filter((s) => s.status === "new").length);
      return next;
    });
  };

  const handleNoteSave = async (id: string) => {
    await updateSubmissionNotes(id, noteDrafts[id] ?? "");
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, notes: noteDrafts[id] ?? "" } : s));
  };

  const newCount = submissions.filter((s) => s.status === "new").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className={SECTION_HEADING}>
          Contact Submissions
          {newCount > 0 && (
            <span className="ml-3 text-[12px] px-2 py-0.5 bg-blue-500/15 text-blue-600 border border-blue-200">
              {newCount} new
            </span>
          )}
        </h2>
        <button onClick={fetchSubmissions} className="flex items-center gap-2 px-3 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center opacity-40 text-[13px]">Loading submissions…</div>
      ) : submissions.length === 0 ? (
        <div className="py-12 text-center border border-border">
          <p className="opacity-40 text-[13px]">No submissions yet.</p>
          <p className="mt-1 opacity-25 text-[12px]">They'll appear here when someone fills out the contact form.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            return (
              <div key={sub.id} className="border border-border bg-card">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                  className="w-full text-left px-4 py-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 sm:gap-4 items-center hover:bg-secondary/30 transition-colors"
                >
                  <div>
                    <p className="text-[14px] font-normal">{sub.name}</p>
                    <p className="text-[12px] opacity-50">{sub.email}</p>
                  </div>
                  <div>
                    <p className="text-[13px] opacity-70">{sub.business_name}</p>
                    <p className="text-[11px] opacity-40 capitalize">{sub.industry.replace(/-/g, " ")}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.1em] border ${STATUS_COLORS[sub.status]}`}>
                    {STATUS_LABELS[sub.status]}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] opacity-40">
                    <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-4 pb-5 pt-4 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Service Needed", value: sub.service_needed.replace(/-/g, " ") },
                        { label: "Budget", value: sub.budget_range?.replace(/-/g, " ") ?? "Not specified" },
                        { label: "Phone", value: sub.phone ?? "Not provided" },
                        { label: "Submitted", value: new Date(sub.created_at).toLocaleString() },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] tracking-[0.12em] opacity-40 mb-1">{label.toUpperCase()}</p>
                          <p className="text-[13px] opacity-70 capitalize">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <a
                        href={`mailto:${sub.email}?subject=Re: Your consultation request — S.Socials&body=Dear ${sub.name},%0A%0AThank you for reaching out to S.Socials.%0A%0A`}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors"
                      >
                        Reply via email
                      </a>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[11px] tracking-[0.08em] opacity-50">STATUS:</span>
                      {(["new", "read", "replied"] as SubmissionStatus[]).map((s) => (
                        <button key={s} onClick={() => handleStatusChange(sub.id, s)}
                          className={`px-3 py-1.5 text-[11px] tracking-[0.08em] border transition-colors ${
                            sub.status === s ? STATUS_COLORS[s] : "border-border opacity-50 hover:opacity-100"
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block mb-1.5 text-[11px] tracking-[0.08em] opacity-50">INTERNAL NOTES</label>
                      <textarea
                        value={noteDrafts[sub.id] ?? ""}
                        onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                        rows={2}
                        placeholder="Add internal notes…"
                        className={TEXTAREA_CLS}
                      />
                      <button onClick={() => handleNoteSave(sub.id)}
                        className="mt-2 px-4 py-1.5 text-[11px] tracking-[0.08em] border border-border hover:border-primary transition-colors"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
