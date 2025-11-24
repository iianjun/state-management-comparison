interface HeaderProps {
  children: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 p-4">
      {children}
    </header>
  );
}
