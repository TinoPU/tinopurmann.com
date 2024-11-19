import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type ColorScheme = {
  text: string;
  background: string;
};

export function notionColorConversion(color: string): ColorScheme | undefined {
  const colorMap: { [key: string]: ColorScheme } = {
    default: { text: '#ADADAD', background: '#323232' },
    gray: { text: '#9B9B9B', background: '#252525' },
    brown: { text: '#A27763', background: '#2E2724' },
    orange: { text: '#CB7B37', background: '#36291F' },
    yellow: { text: '#C19138', background: '#372E20' },
    green: { text: '#4F9768', background: '#242B26' },
    blue: { text: '#447ACB', background: '#1F282D' },
    purple: { text: '#865DBB', background: '#2A2430' },
    pink: { text: '#BA4A78', background: '#2E2328' },
    red: { text: '#BE524B', background: '#332523' }
  };

  return colorMap[color];
}
