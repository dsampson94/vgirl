import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  gradient?: boolean
  onClick?: () => void
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  padding = 'md',
  gradient = false,
  onClick 
}: CardProps) {
  const baseClasses = 'backdrop-blur-md border border-white/20 rounded-2xl'
  const hoverClasses = hover ? 'hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer' : ''
  const bgClasses = gradient 
    ? 'bg-gradient-to-br from-white/10 to-white/5'
    : 'bg-white/10'
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div 
      className={clsx(
        baseClasses,
        bgClasses,
        hoverClasses,
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  gradient: string
}

export function StatCard({ title, value, icon, gradient }: StatCardProps) {
  return (
    <Card hover className="group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 md:w-16 md:h-16 ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-xl md:text-2xl">{icon}</span>
        </div>
      </div>
    </Card>
  )
}
