import type { AppLocale } from "@/providers/locale-provider";

export function pickLocale<T>(
  locale: AppLocale,
  values: { en: T; "roman-ur": T; ur: T },
) {
  return values[locale];
}
