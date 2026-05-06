import Link from "next/link";
import { Database, Search, Code } from "lucide-react";
import { getLatestLedger } from "@/lib/horizon";
import StatCard from "@/components/StatCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const ledger = await getLatestLedger();

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 border-b border-[#162032]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">
            Stellar Network Data, <span className="text-cyan-400">Illuminated</span>
          </h1>
          <p className="text-slate-400 leading-relaxed mb-6">
            Lumina indexes Stellar network events in real time and exposes them through a developer-friendly GraphQL API.
          </p>
          <div className="flex gap-3">
            <Link href="/explorer" className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold text-sm transition-colors">Open Explorer</Link>
            <Link href="/graphql" className="px-5 py-2.5 border border-[#162032] hover:border-cyan-700 text-slate-300 rounded-lg font-semibold text-sm transition-colors">GraphQL Playground</Link>
          </div>
        </div>
      </section>

      <section className="py-10 border-b border-[#162032] bg-[#060d18]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Latest Ledger" value={ledger ? ledger.sequence.toLocaleString() : "—"} subtitle="Stellar Mainnet" />
            <StatCard title="Txs (last ledger)" value={ledger ? ledger.transaction_count.toLocaleString() : "—"} />
            <StatCard title="Ops (last ledger)" value={ledger ? ledger.operation_count.toLocaleString() : "—"} />
            <StatCard title="Ledger Time" value={ledger ? new Date(ledger.closed_at).toLocaleTimeString() : "—"} />
          </div>
        </div>
      </section>
    </div>
  );
}
