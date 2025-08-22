import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert base64 string to File
 * @param base64String The base64 string (with or without the data: prefix)
 * @param fileName Desired filename
 * @returns File object
 */
export function base64ToFile(base64String: string, fileName: string): File {
  // If the string has the data URI scheme, strip it out
  const arr = base64String.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const bstr = atob(arr[arr.length - 1]); // decode base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}