'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import ElectricBorder from '@/components/ElectricBorder'

export function DashboardFeature() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Game State & Actions */}
        <div className="space-y-6 lg:col-span-1">
          <GameStatusCard />
          <ActionsCard />
          <PlayersCard />
        </div>

        {/* Center/Right Column: The Vault (Guardian) & Chat */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          <GuardianCard />
          <GlobalChatCard />
        </div>
      </div>
    </div>
  )
}

function GameStatusCard() {
  return (
    <div className="group bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
      
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        VAULT STATUS
      </h2>
      
      <div className="space-y-5">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <span className="text-zinc-400 text-sm">Current Pot</span>
          <span className="text-2xl font-bold text-white font-mono tracking-tight">0.0400 <span className="text-red-500">SOL</span></span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Entry Fee</span>
            <div className="text-white font-mono mt-1">0.01 SOL</div>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Players</span>
            <div className="text-white font-mono mt-1">3 Active</div>
          </div>
        </div>

        <div className="pt-2">
           <span className="text-zinc-600 text-[10px] uppercase tracking-wider block mb-1">Vault Authority</span>
           <div className="text-xs text-zinc-500 font-mono truncate bg-black/20 p-2 rounded border border-white/5">
             Exy14fYLBVGjdxHSzh79UPjG8BTHhBBn6m3gMPspKJL3
           </div>
        </div>
      </div>
    </div>
  )
}

function ActionsCard() {
  return (
      <ElectricBorder color="#ff0000" speed={2} chaos={0.6} thickness={4} style={{ borderRadius: "0.5rem" }}>
        <Button className="w-full bg-black hover:bg-zinc-900 text-red-500 hover:text-red-400 font-bold py-8 text-lg uppercase tracking-widest transition-all border-0 cursor-pointer">
          Enter The Vault
        </Button>
      </ElectricBorder>
  )
}function PlayersCard() {
  const players = [
    { rank: 1, address: 'AhrDr8...9fq', score: '12m' },
    { rank: 2, address: '2zeS2y...UNy', score: '8m' },
    { rank: 3, address: '6fqrLD...WNy', score: '2m' },
  ]

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
      <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-4">Recent Challengers</h3>
      <div className="space-y-3">
        {players.map((player) => (
          <div key={player.rank} className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-transparent hover:border-red-900/30 transition-colors group">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm w-6 h-6 flex items-center justify-center rounded ${player.rank === 1 ? 'bg-red-500/20 text-red-400' : 'text-zinc-600'}`}>
                #{player.rank}
              </span>
              <span className="text-zinc-300 font-mono text-sm group-hover:text-white transition-colors">{player.address}</span>
            </div>
            <span className="text-xs text-zinc-600">{player.score} ago</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GuardianCard() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col min-h-[400px] relative">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
          <h2 className="font-bold text-white tracking-wide">GUARDIAN AI</h2>
        </div>
        <div className="text-[10px] text-red-400 border border-red-900/30 px-2 py-1 rounded bg-red-950/10">
          SYSTEM ONLINE
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="flex gap-4 max-w-[90%]">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-600 to-red-900 shrink-0 flex items-center justify-center text-xs font-bold text-white border border-red-400/30">
            AI
          </div>
          <div className="space-y-2">
            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-5 text-zinc-300 text-sm leading-relaxed shadow-sm">
              <p>I am the Guardian of the Vault. My protocols are strict: only the worthy may access the funds stored within.</p>
              <p className="mt-2">Many have tried to deceive me with emotional pleas or logical paradoxes. All have failed.</p>
              <p className="mt-2 text-white font-medium">State your case. Why do you deserve the 0.0400 SOL?</p>
            </div>
            <span className="text-[10px] text-zinc-600 pl-2">02:11:53</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex gap-3">
          <Input 
            placeholder="Convince the Guardian..." 
            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-red-500/50 focus-visible:border-red-500/50 h-12"
          />
          <Button className="h-12 px-6 bg-white text-black hover:bg-zinc-200 font-bold cursor-pointer">
            SEND
          </Button>
        </div>
      </div>
    </div>
  )
}

function GlobalChatCard() {
  const [messages] = useState([
    { user: '6Fqr...RWNy', text: 'Is the AI actually releasing funds?', time: '19:56' },
    { user: '2zeS...8UNy', text: 'Just tried a poem, didn\'t work lol', time: '19:58' }
  ])

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[300px]">
      <div className="p-3 border-b border-white/5 bg-white/2">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Global Comms</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-red-400 font-mono">{msg.user}</span>
              <span className="text-[10px] text-zinc-700">{msg.time}</span>
            </div>
            <p className="text-sm text-zinc-400">{msg.text}</p>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-white/5">
        <Input 
          placeholder="Type message..." 
          className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-sm text-white focus-visible:ring-0 focus-visible:border-red-500 placeholder:text-zinc-700"
        />
      </div>
    </div>
  )
}

