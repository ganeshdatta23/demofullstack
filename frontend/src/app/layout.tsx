import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { flex } from '@/styles/utils';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Apex Hospital - Your Partner in Health',
  description: 'Find top doctors, book appointments, and manage your health with Apex Hospital.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased overflow-x-hidden')}>
        <div className={cn(flex.column(), "relative min-h-dvh bg-background w-full max-w-full overflow-x-hidden")}>
          <Header />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
