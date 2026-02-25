import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ContactSection from "./contact-section"

// ── Mocks ─────────────────────────────────────────────────────
vi.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}))

vi.mock("next/image", () => ({
  default: (props: any) => {
    const { fill, priority, ...rest } = props
    return <img {...rest} />
  },
}))

// ── Helpers ───────────────────────────────────────────────────
async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Anna Svensson")
  await user.type(screen.getByLabelText(/email address/i), "anna@example.com")
  await user.selectOptions(screen.getByLabelText(/project type/i), "recording")
  await user.type(
    screen.getByLabelText(/project details/i),
    "I want to record an album.",
  )
  await user.click(screen.getByLabelText(/i agree to the/i))
}

describe("ContactSection", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  // ── Rendering ───────────────────────────────────────────────
  it("renders the form with all expected fields", () => {
    render(<ContactSection />)

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/preferred studio/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/preferred dates/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/i agree to the/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /send inquiry/i })).toBeInTheDocument()
  })

  it("renders contact information sidebar", () => {
    render(<ContactSection />)

    expect(screen.getByText("info@hydrastudios.se")).toBeInTheDocument()
    expect(screen.getByText(/fredriksbergsgatan/i)).toBeInTheDocument()
  })

  // ── Client-side validation ──────────────────────────────────
  it("shows validation errors when submitting empty form", async () => {
    render(<ContactSection />)

    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/please select a project type/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  it("shows privacy validation error when checkbox is not checked", async () => {
    render(<ContactSection />)

    // Fill everything except privacy
    await user.type(screen.getByLabelText(/your name/i), "Anna")
    await user.type(screen.getByLabelText(/email address/i), "anna@example.com")
    await user.selectOptions(screen.getByLabelText(/project type/i), "recording")
    await user.type(screen.getByLabelText(/project details/i), "Hello")

    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/you must accept the privacy policy/i)).toBeInTheDocument()
    })
  })

  it("shows email format error for invalid email", async () => {
    render(<ContactSection />)

    await user.type(screen.getByLabelText(/email address/i), "notanemail")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument()
    })
  })

  // ── Successful submission ───────────────────────────────────
  it("submits to Web3Forms and shows success message", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument()
    })

    // Verify fetch was called with Web3Forms URL
    expect(fetchSpy).toHaveBeenCalledOnce()
    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe("https://api.web3forms.com/submit")
    expect(options?.method).toBe("POST")

    // Verify payload includes access_key and form data
    const body = JSON.parse(options?.body as string)
    expect(body.access_key).toBeDefined()
    expect(body.from_name).toBe("Anna Svensson")
    expect(body.email).toBe("anna@example.com")
    expect(body.project).toBe("Recording")
    expect(body.message).toBe("I want to record an album.")
    expect(body.botcheck).toBe("")
  })

  it("resets form after successful submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument()
    })

    // Fields should be reset
    expect(screen.getByLabelText(/your name/i)).toHaveValue("")
    expect(screen.getByLabelText(/email address/i)).toHaveValue("")
    expect(screen.getByLabelText(/project details/i)).toHaveValue("")
  })

  it("maps studio id to full name in submission", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.selectOptions(screen.getByLabelText(/preferred studio/i), "costa")
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledOnce()
    })

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
    expect(body.studio).toBe("Costa Leon")
  })

  it("sends 'Ingen preferens' when no studio is selected", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledOnce()
    })

    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
    expect(body.studio).toBe("Ingen preferens")
  })

  // ── Error handling ──────────────────────────────────────────
  it("shows error message when Web3Forms returns failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({ success: false, message: "Rate limit exceeded" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    )

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/rate limit exceeded/i)).toBeInTheDocument()
    })
  })

  it("shows generic error message when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"))

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
  })

  // ── Honeypot ────────────────────────────────────────────────
  it("includes a hidden honeypot field in the DOM", () => {
    render(<ContactSection />)

    const honeypot = document.querySelector('input[name="botcheck"]')
    expect(honeypot).toBeInTheDocument()
  })

  // ── Accessibility ───────────────────────────────────────────
  it("marks required fields with aria-required", () => {
    render(<ContactSection />)

    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/project type/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/project details/i)).toHaveAttribute("aria-required", "true")
  })

  it("has cursor-not-allowed class when submit button is disabled", async () => {
    // Never resolving fetch to keep loading state
    vi.spyOn(globalThis, "fetch").mockReturnValueOnce(new Promise(() => {}))

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeDisabled()
      expect(screen.getByRole("button")).toHaveClass("disabled:cursor-not-allowed")
    })
  })

  it("shows submit button loading state during submission", async () => {
    // Never resolving fetch to keep loading state
    vi.spyOn(globalThis, "fetch").mockReturnValueOnce(new Promise(() => {}))

    render(<ContactSection />)
    await fillRequiredFields(user)
    await user.click(screen.getByRole("button", { name: /send inquiry/i }))

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent(/sending/i)
      expect(screen.getByRole("button")).toBeDisabled()
    })
  })
})
