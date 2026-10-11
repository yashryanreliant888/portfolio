import { Header } from './Header';
import { Footer } from './Footer';
import { Skiper89 } from './ui/skiper-ui/skiper89';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Skiper89 />
      <Footer />
    </div>
  );
}
