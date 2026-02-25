import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Navbar from "./navbar"

// ── Mocks ─────────────────────────────────────────────────────
vi.mock("next/image", () => ({
  default: (props: any) => {
    const { fill, priority, ...rest } = props
    return <img {...rest} />
  },
}))

vi.mock("./language-switcher", () => ({
  default: () => <div data-testid="language-switcher" />,
}))

describe("Navbar", () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.restoreAllMocks()
    document.body.style.overflow = ""
  })

  // ── Rendering ───────────────────────────────────────────────
  it("renders the hamburger menu button", () => {
    render(<Navbar />)
    expect(screen.getByLabelText(/toggle menu/i)).toBeInTheDocument()
  })

  // ── Opening the menu ────────────────────────────────────────
  it("opens mobile menu when hamburger is clicked", async () => {
    render(<Navbar />)
    const hamburger = screen.getByLabelText(/toggle menu/i)

    await user.click(hamburger)

    const mobileMenu = document.getElementById("mobile-menu")
    expect(mobileMenu).not.toHaveClass("pointer-events-none")
  })

  // ── Close button inside overlay ─────────────────────────────
  it("shows a close button (X) inside the overlay when menu is open", async () => {
    render(<Navbar />)
    await user.click(screen.getByLabelText(/toggle menu/i))

    const closeButton = screen.getByLabelText(/close menu/i)
    expect(closeButton).toBeInTheDocument()

    // Verify the close button is inside the mobile-menu overlay
    const mobileMenu = document.getElementById("mobile-menu")
    expect(mobileMenu?.contains(closeButton)).toBe(true)
  })

  it("closes menu when close button is clicked", async () => {
    render(<Navbar />)
    await user.click(screen.getByLabelText(/toggle menu/i))

    const closeButton = screen.getByLabelText(/close menu/i)
    await user.click(closeButton)

    const mobileMenu = document.getElementById("mobile-menu")
    expect(mobileMenu).toHaveClass("pointer-events-none")
  })

  // ── Escape key ──────────────────────────────────────────────
  it("closes menu when Escape is pressed", async () => {
    render(<Navbar />)
    await user.click(screen.getByLabelText(/toggle menu/i))

    await user.keyboard("{Escape}")

    const mobileMenu = document.getElementById("mobile-menu")
    expect(mobileMenu).toHaveClass("pointer-events-none")
  })

  // ── Nav link closes menu ────────────────────────────────────
  it("closes menu when a nav link is clicked", async () => {
    render(<Navbar />)
    await user.click(screen.getByLabelText(/toggle menu/i))

    // Click on the "About" link in the mobile menu
    const mobileMenu = document.getElementById("mobile-menu")!
    const aboutLink = mobileMenu.querySelector('a[href="#about"]')!
    await user.click(aboutLink)

    expect(mobileMenu).toHaveClass("pointer-events-none")
  })

  // ── Body scroll lock ────────────────────────────────────────
  it("locks body scroll when menu is open", async () => {
    render(<Navbar />)
    await user.click(screen.getByLabelText(/toggle menu/i))

    expect(document.body.style.overflow).toBe("hidden")
  })

  it("unlocks body scroll when menu is closed", async () => {
    render(<Navbar />)
    await user.click(screen.getByLabelText(/toggle menu/i))
    expect(document.body.style.overflow).toBe("hidden")

    await user.click(screen.getByLabelText(/close menu/i))
    expect(document.body.style.overflow).toBe("")
  })
})
