'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
