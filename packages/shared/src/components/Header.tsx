interface HeaderProps {
  children: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return (
    <header className="p-4 flex justify-between items-center">
      {children}
    </header>
  );
}
