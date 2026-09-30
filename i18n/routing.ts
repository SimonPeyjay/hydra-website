import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['sv', 'en', 'de', 'ja', 'ko'],
  defaultLocale: 'sv',
  // Swedish at the root, other locales under /en/, /de/ ... (see app/(sv) and app/(intl))
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
