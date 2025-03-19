

const Button = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`rounded-lg text-center font-semibold ${className}`}>
      {children}
    </div>
  )
}

export default Button
