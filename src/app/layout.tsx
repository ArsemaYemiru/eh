"use client"; // Needed because we're using client-side state

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/employee_hierarch/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
// core styles are required for all packages
import '@mantine/core/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            {children}
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
