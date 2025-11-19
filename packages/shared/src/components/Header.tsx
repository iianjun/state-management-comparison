export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="p-4 flex justify-between items-center">
      <h1>My shop</h1>
      {children}
    </header>
  );
}
