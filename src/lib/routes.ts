import type { Route } from "next";

export function safeRoute<T extends string>(path: T): Route<T> {
  return path as unknown as Route<T>;
}
