import React from 'react'

export const AppBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Drifting Orb 1 */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-brand-primary/8 dark:bg-brand-primary/10 blur-[80px] md:blur-[120px] animate-blob"
        style={{ animationDuration: '25s' }}
      />
      {/* Drifting Orb 2 */}
      <div 
        className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] max-w-[450px] rounded-full bg-amber-500/8 dark:bg-purple-900/12 blur-[80px] md:blur-[120px] animate-blob"
        style={{ animationDuration: '30s', animationDelay: '3s' }}
      />
      {/* Center Subtle Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-orange-300/4 dark:bg-orange-500/3 blur-[100px] md:blur-[150px] animate-pulse"
        style={{ animationDuration: '15s' }}
      />
    </div>
  )
}
