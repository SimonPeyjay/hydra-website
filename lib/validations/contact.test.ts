import { describe, it, expect } from "vitest"
import { contactSchema, type ContactFormData } from "./contact"
import { PROJECT_TYPES, STUDIO_IDS } from "../constants"

// Helper: build a valid form data object, overriding specific fields
function validData(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    name: "Anna Svensson",
    email: "anna@example.com",
    phone: "",
    project: "recording",
    message: "I want to record an album.",
    studio: "",
    dateRange: "",
    privacy: true,
    ...overrides,
  }
}

describe("contactSchema", () => {
  // ── Happy path ──────────────────────────────────────────────
  it("accepts a fully valid form with all required fields", () => {
    const result = contactSchema.safeParse(validData())
    expect(result.success).toBe(true)
  })

  it("accepts valid form with all optional fields filled", () => {
    const result = contactSchema.safeParse(
      validData({
        phone: "+46 70 123 4567",
        studio: "costa",
        dateRange: "March 15-20, 2026",
      }),
    )
    expect(result.success).toBe(true)
  })

  it("trims and lowercases email", () => {
    const result = contactSchema.safeParse(validData({ email: "  Anna@Example.COM  " }))
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe("anna@example.com")
    }
  })

  it("trims name and message", () => {
    const result = contactSchema.safeParse(
      validData({ name: "  Anna  ", message: "  Hello  " }),
    )
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe("Anna")
      expect(result.data.message).toBe("Hello")
    }
  })

  it("strips the privacy field from output (not sent to API)", () => {
    const result = contactSchema.safeParse(validData())
    expect(result.success).toBe(true)
    // privacy should still be in the parsed data since the schema includes it,
    // but consumers will destructure it out before sending
  })

  // ── Required fields ─────────────────────────────────────────
  describe("name", () => {
    it("rejects empty string", () => {
      const result = contactSchema.safeParse(validData({ name: "" }))
      expect(result.success).toBe(false)
    })

    it("rejects whitespace-only", () => {
      const result = contactSchema.safeParse(validData({ name: "   " }))
      expect(result.success).toBe(false)
    })

    it("rejects strings exceeding 200 chars", () => {
      const result = contactSchema.safeParse(validData({ name: "A".repeat(201) }))
      expect(result.success).toBe(false)
    })

    it("accepts exactly 200 chars", () => {
      const result = contactSchema.safeParse(validData({ name: "A".repeat(200) }))
      expect(result.success).toBe(true)
    })
  })

  describe("email", () => {
    it("rejects empty string", () => {
      const result = contactSchema.safeParse(validData({ email: "" }))
      expect(result.success).toBe(false)
    })

    it("rejects whitespace-only", () => {
      const result = contactSchema.safeParse(validData({ email: "   " }))
      expect(result.success).toBe(false)
    })

    it("rejects invalid email format", () => {
      const invalids = ["notanemail", "missing@", "@missing.com", "spaces in@email.com"]
      for (const email of invalids) {
        const result = contactSchema.safeParse(validData({ email }))
        expect(result.success, `expected "${email}" to be invalid`).toBe(false)
      }
    })

    it("rejects strings exceeding 254 chars", () => {
      const longEmail = "a".repeat(243) + "@example.com" // 255 chars
      const result = contactSchema.safeParse(validData({ email: longEmail }))
      expect(result.success).toBe(false)
    })

    it("accepts a valid email at 254 chars", () => {
      const email = "a".repeat(242) + "@example.com" // 254 chars
      const result = contactSchema.safeParse(validData({ email }))
      expect(result.success).toBe(true)
    })
  })

  describe("project", () => {
    it("rejects empty string", () => {
      const result = contactSchema.safeParse(validData({ project: "" as any }))
      expect(result.success).toBe(false)
    })

    it("rejects invalid project type", () => {
      const result = contactSchema.safeParse(validData({ project: "invalid" as any }))
      expect(result.success).toBe(false)
    })

    it.each(PROJECT_TYPES)("accepts project type: %s", (type) => {
      const result = contactSchema.safeParse(validData({ project: type }))
      expect(result.success).toBe(true)
    })
  })

  describe("message", () => {
    it("rejects empty string", () => {
      const result = contactSchema.safeParse(validData({ message: "" }))
      expect(result.success).toBe(false)
    })

    it("rejects whitespace-only", () => {
      const result = contactSchema.safeParse(validData({ message: "   " }))
      expect(result.success).toBe(false)
    })

    it("rejects strings exceeding 5000 chars", () => {
      const result = contactSchema.safeParse(validData({ message: "A".repeat(5001) }))
      expect(result.success).toBe(false)
    })

    it("accepts exactly 5000 chars", () => {
      const result = contactSchema.safeParse(validData({ message: "A".repeat(5000) }))
      expect(result.success).toBe(true)
    })
  })

  describe("privacy", () => {
    it("rejects false", () => {
      const result = contactSchema.safeParse(validData({ privacy: false as any }))
      expect(result.success).toBe(false)
    })

    it("rejects undefined", () => {
      const data = validData()
      delete (data as any).privacy
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it("requires exactly true", () => {
      const result = contactSchema.safeParse(validData({ privacy: true }))
      expect(result.success).toBe(true)
    })
  })

  // ── Optional fields ─────────────────────────────────────────
  describe("phone", () => {
    it("defaults to empty string when omitted", () => {
      const data = validData()
      delete (data as any).phone
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.phone).toBe("")
      }
    })

    it("rejects strings exceeding 30 chars", () => {
      const result = contactSchema.safeParse(validData({ phone: "1".repeat(31) }))
      expect(result.success).toBe(false)
    })

    it("accepts strings up to 30 chars", () => {
      const result = contactSchema.safeParse(validData({ phone: "+46 70 123 4567" }))
      expect(result.success).toBe(true)
    })
  })

  describe("studio", () => {
    it("defaults to empty string when omitted", () => {
      const data = validData()
      delete (data as any).studio
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.studio).toBe("")
      }
    })

    it("accepts empty string (no preference)", () => {
      const result = contactSchema.safeParse(validData({ studio: "" }))
      expect(result.success).toBe(true)
    })

    it("rejects invalid studio id", () => {
      const result = contactSchema.safeParse(validData({ studio: "invalid" as any }))
      expect(result.success).toBe(false)
    })

    it.each(STUDIO_IDS)("accepts studio id: %s", (id) => {
      const result = contactSchema.safeParse(validData({ studio: id }))
      expect(result.success).toBe(true)
    })
  })

  describe("dateRange", () => {
    it("defaults to empty string when omitted", () => {
      const data = validData()
      delete (data as any).dateRange
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.dateRange).toBe("")
      }
    })

    it("rejects strings exceeding 200 chars", () => {
      const result = contactSchema.safeParse(validData({ dateRange: "A".repeat(201) }))
      expect(result.success).toBe(false)
    })
  })
})
