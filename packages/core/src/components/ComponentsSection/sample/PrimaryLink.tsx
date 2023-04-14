type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function PrimaryLink({ children }: ButtonProps) {
  return (
    <button
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundImage: 'linear-gradient(90deg, #E7FF52 0%, #41ff54 100%)',
        borderRadius: '0.25rem',
        fontWeight: 700,
        color: 'rgb(6, 15, 30)',
      }}
    >
      {children}
    </button>
  )
}
