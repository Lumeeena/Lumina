'use client';

import { useState, useEffect } from "react";
import { getRecentTransactions, HorizonTransaction } from "@/lib/horizon";
import { truncateAddress, timeAgo } from "@/lib/formatters";

export default function LiveFeed() {
  const [txs, setTxs] = useState<HorizonTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentTransactions(10).then(data => { setTxs(data); setLoading(false); });
  }, []);

  return (
    <div className="rounded-xl bg-[#0c1222] border border-[#162032] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#162032] text-sm font-semibold text-white">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        LIVE
      </div>
      {loading ? (
        <div className="p-6 text-center text-slate-600 text-sm">Fetching live data from Stellar Horizon...</div>
      ) : (
        <div className="divide-y divide-[#0f1a28]">
          {txs.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#0f1a28] transition-colors">
              <span className={`w-2 h-2 rounded-full shrink-0 ${tx.successful ? "bg-green-500" : "bg-red-500"}`} />
              <span className="mono text-xs text-cyan-400">{truncateAddress(tx.hash, 5)}</span>
              <span className="text-xs text-slate-500 mono">{truncateAddress(tx.source_account)}</span>
              <span className="ml-auto text-xs text-slate-600">{timeAgo(tx.created_at)}</span>
              <span className="text-xs bg-[#162032] text-slate-400 px-1.5 py-0.5 rounded">{tx.operation_count} ops</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
