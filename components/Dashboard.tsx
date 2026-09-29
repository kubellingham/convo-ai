"use client";
import { useMemo, useState } from "react";
import { BoltIcon, CheckIcon, ClockIcon, LockClosedIcon, PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/outline";

type Conversation = { id: number; name: string; initials: string; message: string; time: string; status: "Needs approval" | "Resolved" | "Waiting"; };
const conversations: Conversation[] = [
  { id: 1, name: "Maya Rodriguez", initials: "MR", message: "Can I change the delivery address?", time: "2m", status: "Needs approval" },
  { id: 2, name: "Jordan Lee", initials: "JL", message: "Thanks, that sorted it!", time: "18m", status: "Resolved" },
  { id: 3, name: "Priya Shah", initials: "PS", message: "Do you have this in another size?", time: "34m", status: "Needs approval" },
  { id: 4, name: "Noah Williams", initials: "NW", message: "Order #1048 is still processing.", time: "1h", status: "Waiting" }
];
const drafts: Record<number, string> = {
  1: "Hi Maya — I can help with that. Please share the new delivery address, and our team will confirm whether the order can still be updated.",
  3: "Hi Priya! I’d be happy to check. Which item and size are you looking for? I’ll confirm the available options for you."
};

export function Dashboard() {
  const [activeId, setActiveId] = useState(1); const [draft, setDraft] = useState(drafts[1]); const [approved, setApproved] = useState<number[]>([]);
  const active = useMemo(() => conversations.find(c => c.id === activeId)!, [activeId]);
  function select(c: Conversation) { setActiveId(c.id); setDraft(drafts[c.id] ?? ""); }
  function approve() { if (!approved.includes(activeId)) setApproved([...approved, activeId]); }
  return <main className="min-h-screen p-4 md:p-8"><div className="mx-auto max-w-7xl">
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Approval-first workspace</div><h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Convo AI</h1><p className="mt-1 text-slate-500">Keep every customer reply human-approved.</p></div><div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-mint px-3 py-2 text-sm font-medium text-emerald-900"><LockClosedIcon className="h-4 w-4"/>Mock mode · no messages are sent</div></header>
    <section className="mb-6 grid gap-4 sm:grid-cols-3">{[["12", "Messages today", BoltIcon], ["3", "Awaiting approval", ClockIcon], ["100%", "Human-controlled", CheckIcon]].map(([value,label,Icon]) => { const I = Icon as typeof BoltIcon; return <div key={label as string} className="card p-5"><I className="h-5 w-5 text-coral"/><p className="mt-3 text-2xl font-bold">{value}</p><p className="text-sm text-slate-500">{label}</p></div>; })}</section>
    <section className="grid min-h-[550px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[320px_1fr]">
      <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r"><div className="p-5"><h2 className="font-bold">Inbox</h2><p className="mt-1 text-sm text-slate-500">Mock conversations</p></div><div>{conversations.map(c => <button key={c.id} onClick={() => select(c)} className={`w-full border-t border-slate-100 p-4 text-left ${activeId === c.id ? "bg-slate-100" : "hover:bg-slate-50"}`}><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{c.initials}</span><span className="min-w-0 flex-1"><span className="flex justify-between gap-2"><b>{c.name}</b><small className="text-slate-400">{c.time}</small></span><span className="mt-1 block truncate text-sm text-slate-500">{c.message}</span><span className={`pill mt-2 inline-block ${c.status === "Needs approval" ? "bg-amber-100 text-amber-800" : c.status === "Resolved" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>{c.status}</span></span></div></button>)}</div></aside>
      <div className="flex flex-col"><div className="border-b border-slate-200 p-5"><h2 className="font-bold">{active.name}</h2><p className="text-sm text-slate-500">Customer conversation · demo data</p></div><div className="flex-1 space-y-5 bg-slate-50 p-5"><div className="max-w-md rounded-2xl rounded-tl-sm bg-white p-4 shadow-sm"><p className="text-sm">{active.message}</p><p className="mt-2 text-xs text-slate-400">Customer · {active.time} ago</p></div>{approved.includes(activeId) && <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-indigo-600 p-4 text-white shadow-sm"><p className="text-sm">{draft}</p><p className="mt-2 text-xs text-indigo-200">Approved in demo · not sent</p></div>}</div>
        <div className="border-t border-slate-200 p-5"><div className="mb-3 flex items-center gap-2"><SparklesIcon className="h-5 w-5 text-coral"/><h3 className="font-semibold">Suggested reply</h3><span className="pill bg-violet-100 text-violet-700">AI draft</span></div><textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="No suggestion available for this conversation." className="h-24 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">Review and edit before approval. Approval does not send a message in this starter.</p><button disabled={!draft || approved.includes(activeId)} onClick={approve} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"><CheckIcon className="h-4 w-4"/>{approved.includes(activeId) ? "Approved (demo)" : "Approve reply"}</button></div></div>
      </div></section><footer className="mt-5 flex items-center gap-2 text-xs text-slate-500"><PaperAirplaneIcon className="h-4 w-4"/>WhatsApp connectivity is intentionally not configured.</footer>
  </div></main>;
}
