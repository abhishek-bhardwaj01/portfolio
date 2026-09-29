import { useEffect, useState } from "react";
import type { CMSData } from "../cms/types";
import { defaultCMS } from "../cms/defaults";

function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T> | null | undefined): T {
  if (!override) return base;
  const out = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const bv = base[key];
    const ov = override[key];
    if (ov === undefined || ov === null) continue;
    if (Array.isArray(ov)) {
      out[key] = ov as T[keyof T];
    } else if (typeof ov === "object" && typeof bv === "object" && bv !== null && !Array.isArray(bv)) {
      out[key] = deepMerge(bv as Record<string, unknown>, ov as Record<string, unknown>) as T[keyof T];
    } else {
      out[key] = ov as T[keyof T];
    }
  }
  return out;
}

export function useCMS() {
  const [data, setData] = useState<CMSData>(defaultCMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/content/cms.json", { cache: "no-store" });
        if (res.ok) {
          const json = (await res.json()) as Partial<CMSData>;
          if (!cancelled) setData(deepMerge(defaultCMS as unknown as Record<string, unknown>, json as Record<string, unknown>) as CMSData);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load CMS");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error, setData };
}

export type { CMSData };
