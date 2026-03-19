"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Problem } from "@/lib/blind75";
import { getNote, setNote } from "@/lib/notes";

const DIFFICULTY_BADGE = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

function NoteCell({ slug }: { slug: string }) {
  const [note, setNoteState] = useState("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setNoteState(getNote(slug));
  }, [slug]);

  function save() {
    setNote(slug, draft);
    setNoteState(draft.trim());
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex gap-1.5">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEditing(false);
          }}
          className="w-full min-w-0 rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs text-zinc-300 outline-none focus:border-zinc-400"
          placeholder="Add a note..."
        />
        <button
          onClick={save}
          className="shrink-0 rounded bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-900 hover:bg-white"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setDraft(note);
        setEditing(true);
      }}
      className="w-full text-left text-xs text-zinc-600 hover:text-zinc-400 transition-colors truncate"
      title={note || "Click to add a note"}
    >
      {note || "—"}
    </button>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ProblemTable({
  problems,
  title,
  difficulty,
  defaultOpen = true,
}: {
  problems: Problem[];
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section>
      {/* Collapsible header */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-3 flex w-full items-center gap-3 text-left group"
      >
        <ChevronIcon open={open} />
        <span className="text-base font-semibold text-zinc-100">{title}</span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_BADGE[difficulty]}`}
        >
          {problems.length}
        </span>
      </button>

      {/* Collapsible content */}
      {open && (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80 text-left">
                <th className="w-16 px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  #
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Problem
                </th>
                <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 md:table-cell">
                  Topics
                </th>
                <th className="w-24 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Editorial
                </th>
                <th className="w-48 px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 hidden lg:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {problems.map((p) => (
                <tr
                  key={p.id}
                  className="transition-colors hover:bg-zinc-800/30"
                >
                  <td className="px-4 py-3 font-mono text-xs text-zinc-600">
                    {p.id}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-zinc-200 text-sm">{p.title}</span>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {p.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/editorial/${p.slug}`}
                      className="inline-block rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
                    >
                      View
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <NoteCell slug={p.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
