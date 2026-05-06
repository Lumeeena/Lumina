'use client';

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAccount, HorizonAccount } from "@/lib/horizon";

export default function AccountPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const [account, setAccount] = useState<HorizonAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getAccount(address).then(acc => {
      if (!acc) setNotFound(true);
      else setAccount(acc);
      setLoading(false);
    });
  }, [address]);

  const xlmBalance = account?.balances.find(b => b.asset_type === "native");

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link href="/explorer" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300 mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Explorer
      </Link>
      {loading ? (
        <div className="text-slate-500 text-sm">Loading account from Stellar Horizon...</div>
      ) : notFound ? (
        <div className="p-8 rounded-xl bg-[#0c1222] border border-red-900/50 text-center">
          <p className="text-red-400 font-semibold mb-2">Account Not Found</p>
          <p className="text-slate-500 text-sm">Address <span className="mono text-slate-300">{address}</span> does not exist on Stellar Mainnet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-xl bg-[#0c1222] border border-[#162032]">
            <div className="text-sm text-slate-500 mb-1">Account</div>
            <div className="mono text-sm text-white break-all mb-4">{address}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><div className="text-slate-500 text-xs mb-1">XLM Balance</div><div className="text-white font-semibold">{xlmBalance?.balance ?? "0"} XLM</div></div>
              <div><div className="text-slate-500 text-xs mb-1">Sequence</div><div className="text-white mono text-xs">{account?.sequence}</div></div>
              <div><div className="text-slate-500 text-xs mb-1">Subentries</div><div className="text-white">{account?.subentry_count}</div></div>
              <div><div className="text-slate-500 text-xs mb-1">Last Ledger</div><div className="text-white mono text-xs">{account?.last_modified_ledger?.toLocaleString()}</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
