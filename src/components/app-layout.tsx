'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import React from 'react'
import { AppFooter } from '@/components/app-footer'
import { ClusterChecker } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/account/account-ui'
import CardNav, { CardNavItem } from '@/components/CardNav'
import DotGrid from '@/components/DotGrid'

export function AppLayout({
  children,
  links,
}: {
  children: React.ReactNode
  links: { label: string; path: string }[]
}) {
  const navItems: CardNavItem[] = [
    {
      label: 'Navigation',
      bgColor: '#1a1a1a',
      textColor: '#ffffff',
      links: links.map((link) => ({
        label: link.label,
        href: link.path,
        ariaLabel: link.label,
      })),
    },
  ]

  const logo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E"

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
      <div className="flex flex-col min-h-screen relative">
        <div className="absolute inset-0 -z-10">
           <DotGrid
    dotSize={5}
    gap={25}
    baseColor="#480500"
    activeColor="#ff0000"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={500}
    returnDuration={1.5}
  />
        </div>
        <CardNav 
          logo={logo} 
          items={navItems} 
          baseColor="rgba(0, 0, 0, 0)"
          menuColor="#ffffff"
        />
        <main className="grow w-[95%] max-w-[1200px] mx-auto pt-24 pb-8">
          <ClusterChecker>
            <AccountChecker />
          </ClusterChecker>
          {children}
        </main>
        <AppFooter />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
