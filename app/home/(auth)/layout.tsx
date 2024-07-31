interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700">
      {children}
    </main>
  );
}
