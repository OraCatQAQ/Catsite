import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { readFileSync } from 'fs';
import { join } from 'path';

const inter = Inter({ subsets: ["latin"] });

// 读取配置文件
const configPath = join(process.cwd(), 'data', 'config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

export const metadata: Metadata = {
  title: config.settings.title,
  description: config.settings.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
