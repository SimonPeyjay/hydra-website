// The site has two root layouts, so Next's generated out/404.html has no layout
// (no lang, styles or favicon). Apache serves this page for 404s instead; see
// ErrorDocument in public/.htaccess.
export { default, metadata } from "../not-found"
