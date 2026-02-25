import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"
import { createElement } from "react"
import messages from "./messages/en.json"

// ── next-intl mock ──────────────────────────────────────────
vi.mock("next-intl", () => {
  function useTranslations(namespace?: string) {
    const ns = namespace
      ? (messages as Record<string, any>)[namespace] ?? {}
      : messages

    function t(key: string, values?: Record<string, any>): string {
      const parts = key.split(".")
      let result: any = ns
      for (const part of parts) {
        result = result?.[part]
      }
      if (result === undefined) return key
      if (typeof result === "string" && values) {
        return result.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? `{${k}}`)
      }
      return typeof result === "string" ? result : key
    }

    t.rich = (key: string, values?: Record<string, any>) => {
      const parts = key.split(".")
      let result: any = ns
      for (const part of parts) {
        result = result?.[part]
      }
      if (typeof result !== "string") return key
      if (!values) return result
      // Replace {key} placeholders and call tag functions
      return result.replace(/\{(\w+)\}/g, (_, k: string) => {
        const val = values[k]
        if (typeof val === "function") return val(k)
        return val ?? `{${k}}`
      })
    }

    t.raw = (key: string) => {
      const parts = key.split(".")
      let result: any = ns
      for (const part of parts) {
        result = result?.[part]
      }
      return result
    }

    return t
  }

  function useLocale() {
    return "en"
  }

  return { useTranslations, useLocale }
})

// ── next-intl/navigation mock ───────────────────────────────
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  Link: ({ children, ...props }: any) => createElement("a", props, children),
}))
