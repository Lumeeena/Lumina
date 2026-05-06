(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56420,e=>{"use strict";var t=e.i(71645),a=e.i(96661);let s=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var c=e.i(5014);e.s(["default",0,(e,r)=>{let n=(0,t.forwardRef)(({className:n,...l},o)=>(0,t.createElement)(c.default,{ref:o,iconNode:r,className:(0,a.mergeClasses)(`lucide-${s(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...l}));return n.displayName=s(e),n}],56420)},25301,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let s=[{name:"Recent Transactions",description:"Fetch the last 5 transactions on the network",query:`query RecentTransactions {
  transactions(limit: 5, order: DESC) {
    hash
    ledger
    createdAt
    sourceAccount
    operationCount
    successful
    feeCharged
  }
}`,mockResult:{transactions:[{hash:"a3f2e1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",ledger:0x320ccd2,createdAt:"2026-05-18T10:22:14Z",sourceAccount:"GABC...1234",operationCount:1,successful:!0,feeCharged:"100"},{hash:"b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",ledger:0x320ccd1,createdAt:"2026-05-18T10:22:09Z",sourceAccount:"GDEF...5678",operationCount:2,successful:!0,feeCharged:"200"},{hash:"c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",ledger:0x320ccd0,createdAt:"2026-05-18T10:22:01Z",sourceAccount:"GHIJ...9012",operationCount:1,successful:!1,feeCharged:"100"}]}},{name:"Account Balances",description:"Get all asset balances for an account",query:`query AccountBalances($address: String!) {
  account(address: $address) {
    address
    sequence
    subentryCount
    balances {
      asset
      balance
      limit
    }
  }
}`,mockResult:{account:{address:"GABC...1234",sequence:"192837465019283746",subentryCount:3,balances:[{asset:"XLM",balance:"1234.5678901",limit:null},{asset:"USDC:GA5ZSE...KZVN",balance:"500.0000000",limit:"10000.0000000"},{asset:"AQUA:GBNZIL...AQUA",balance:"12000.0000000",limit:"100000.0000000"}]}}},{name:"Payment History",description:"Fetch payment operations for an account",query:`query PaymentHistory($address: String!, $limit: Int) {
  operations(
    account: $address
    type: PAYMENT
    limit: $limit
  ) {
    id
    type
    createdAt
    from
    to
    amount
    asset
  }
}`,mockResult:{operations:[{id:"192837465019283746",type:"payment",createdAt:"2026-05-18T09:15:00Z",from:"GABC...1234",to:"GXYZ...9999",amount:"100.0000000",asset:"XLM"},{id:"192837465019283740",type:"payment",createdAt:"2026-05-17T14:30:00Z",from:"GDEF...5678",to:"GABC...1234",amount:"500.0000000",asset:"USDC"}]}},{name:"Contract Events",description:"Query Soroban contract events by contract address",query:`query ContractEvents($contractId: String!) {
  events(
    contractId: $contractId
    limit: 10
  ) {
    id
    type
    contractId
    ledger
    createdAt
    topics
    value
  }
}`,mockResult:{events:[{id:"0000000524812341-0000000001",type:"contract",contractId:"CCAMM...POOL",ledger:0x320ccd2,createdAt:"2026-05-18T10:22:14Z",topics:["swap","XLM","USDC"],value:{amount_in:"1000.0000000",amount_out:"117.9400000"}},{id:"0000000524812340-0000000002",type:"contract",contractId:"CCAMM...POOL",ledger:0x320ccd2,createdAt:"2026-05-18T10:21:58Z",topics:["liquidity_added"],value:{xlm:"5000.0000000",usdc:"589.7000000"}}]}}],c=(0,e.i(56420).default)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);function r({data:e}){let a=JSON.stringify(e,null,2).replace(/("[\w\s]+"):/g,'<span style="color:#67e8f9">$1</span>:').replace(/:\s*(".*?")/g,': <span style="color:#86efac">$1</span>').replace(/:\s*(\d+\.?\d*)/g,': <span style="color:#fbbf24">$1</span>').replace(/:\s*(true|false)/g,': <span style="color:#c084fc">$1</span>').replace(/:\s*(null)/g,': <span style="color:#94a3b8">$1</span>');return(0,t.jsx)("pre",{className:"text-xs leading-relaxed font-mono text-slate-300 whitespace-pre-wrap break-all",dangerouslySetInnerHTML:{__html:a}})}e.s(["default",0,function(){let[e,n]=(0,a.useState)(s[0]),[l,o]=(0,a.useState)(s[0].query),[d,i]=(0,a.useState)(null);return(0,t.jsxs)("div",{className:"max-w-7xl mx-auto px-6 py-12",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-white mb-2",children:"GraphQL Playground"}),(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-8",children:[(0,t.jsx)("p",{className:"text-slate-400 text-sm",children:"Lumina GraphQL endpoint:"}),(0,t.jsx)("span",{className:"mono text-xs px-2.5 py-1 rounded-full bg-amber-900/30 border border-amber-700/50 text-amber-400",children:"Coming soon — testnet deployment in progress"})]}),(0,t.jsxs)("div",{className:"flex flex-col lg:flex-row gap-6",style:{minHeight:"600px"},children:[(0,t.jsxs)("div",{className:"lg:w-64 shrink-0 flex flex-col gap-2",children:[(0,t.jsx)("h2",{className:"text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2",children:"Query Examples"}),s.map(a=>(0,t.jsxs)("button",{onClick:()=>{n(a),o(a.query),i(null)},className:`text-left p-3 rounded-lg border transition-all ${e.name===a.name?"border-cyan-700 bg-cyan-900/20 text-cyan-300":"border-[#162032] bg-[#0c1222] text-slate-400 hover:border-cyan-800"}`,children:[(0,t.jsx)("div",{className:"text-sm font-semibold mb-1",children:a.name}),(0,t.jsx)("div",{className:"text-xs opacity-70 leading-snug",children:a.description})]},a.name))]}),(0,t.jsxs)("div",{className:"flex-1 flex flex-col gap-4",children:[(0,t.jsxs)("div",{className:"flex-1 flex flex-col rounded-xl bg-[#0c1222] border border-[#162032] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-[#162032]",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-slate-500 uppercase tracking-wider",children:"Query Editor"}),(0,t.jsxs)("button",{onClick:function(){i(e.mockResult)},className:"flex items-center gap-2 px-4 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors",children:[(0,t.jsx)(c,{size:13})," Run Query"]})]}),(0,t.jsx)("textarea",{value:l,onChange:e=>o(e.target.value),className:"flex-1 bg-transparent px-4 py-3 text-sm text-slate-300 mono resize-none focus:outline-none leading-relaxed min-h-[280px]",spellCheck:!1})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-[#0c1222] border border-[#162032] overflow-hidden",children:[(0,t.jsx)("div",{className:"px-4 py-2.5 border-b border-[#162032]",children:(0,t.jsx)("span",{className:"text-xs font-semibold text-slate-500 uppercase tracking-wider",children:"Response"})}),(0,t.jsx)("div",{className:"p-4 max-h-72 overflow-y-auto",children:null===d?(0,t.jsx)("span",{className:"text-slate-600 text-sm",children:"Click “Run Query” to see the response."}):(0,t.jsx)(r,{data:{data:d}})})]})]})]})]})}],25301)}]);