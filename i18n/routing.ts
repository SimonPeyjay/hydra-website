import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['sv', 'en', 'de', 'ja', 'ko'],
  defaultLocale: 'sv',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
