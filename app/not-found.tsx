import Link from 'next/link';
import { Container } from '@/components/Container';
import { PageLayout } from '@/components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout>
      <main className="flex min-h-[70svh] items-center py-24">
        <Container>
          <p className="terminal-kicker">404 / page not found</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-light tracking-[-0.06em] text-almost-white sm:text-7xl">
            This page went somewhere else.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-steel">
            The link may be outdated, or the page may have moved. Return to the portfolio and continue exploring.
          </p>
          <Link href="/" className="terminal-button mt-10 inline-flex">
            Back to home <span aria-hidden="true">↗</span>
          </Link>
        </Container>
      </main>
    </PageLayout>
  );
}
