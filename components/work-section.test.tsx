import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen, within } from "@testing-library/react"
import WorkSection from "./work-section"

vi.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}))

// Browser APIs jsdom doesn't implement
Element.prototype.setPointerCapture = vi.fn()
window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia

describe("WorkSection", () => {
  it("introduces the section with a heading", () => {
    render(<WorkSection />)

    expect(screen.getByRole("heading", { level: 2, name: "Our Work" })).toBeInTheDocument()
  })

  it("shows each of the 35 unique releases with its cover art and caption", () => {
    render(<WorkSection />)

    const list = screen.getByRole("list", { name: "Releases – scroll sideways" })
    const items = within(list).getAllByRole("listitem")
    expect(items).toHaveLength(35)

    const [first] = items
    expect(within(first).getByRole("img", { name: "Cover art for Habit by Laurell" })).toBeInTheDocument()
    expect(first).toHaveTextContent("Laurell")
    expect(first).toHaveTextContent("Habit")

    // Tingsek's two singles share one artwork, so they share one slot
    expect(
      within(list).getByRole("img", { name: "Cover art for Paragon / Inspiration by Tingsek" }),
    ).toBeInTheDocument()
  })

  it("lets the browser fetch the smallest cover that fits, lazily and without layout shift", () => {
    render(<WorkSection />)

    const cover = screen.getByRole("img", { name: "Cover art for Habit by Laurell" })
    expect(cover).toHaveAttribute(
      "srcset",
      "/images/covers/laurell-habit-400.webp 400w, " +
        "/images/covers/laurell-habit-640.webp 640w, " +
        "/images/covers/laurell-habit-960.webp 960w",
    )
    expect(cover).toHaveAttribute("sizes")
    expect(cover).toHaveAttribute("loading", "lazy")
    expect(cover).toHaveAttribute("decoding", "async")
    expect(cover).toHaveAttribute("width", "960")
    expect(cover).toHaveAttribute("height", "960")
  })

  it("links every release to the track on Spotify, opening in a new tab", () => {
    render(<WorkSection />)

    const list = screen.getByRole("list", { name: "Releases – scroll sideways" })
    expect(within(list).getAllByRole("link")).toHaveLength(35)

    const habit = within(list).getByRole("link", {
      name: "Listen to Habit by Laurell on Spotify (opens in a new tab)",
    })
    expect(habit).toHaveAttribute("href", "https://open.spotify.com/track/4bnutybG1itDcpyoQo2Uoc")
    expect(habit).toHaveAttribute("target", "_blank")
    expect(habit).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("doesn't open a release when the row is dragged with the mouse, only on a plain click", () => {
    render(<WorkSection />)
    const habit = screen.getByRole("link", { name: /Habit by Laurell/ })
    const mouse = { pointerType: "mouse", pointerId: 1, button: 0 }

    // Grab the row, drag it sideways and let go over the cover
    fireEvent.pointerDown(habit, { ...mouse, clientX: 400 })
    fireEvent.pointerMove(habit, { ...mouse, clientX: 320 })
    fireEvent.pointerUp(habit, { ...mouse, clientX: 320 })
    const followedAfterDrag = fireEvent.click(habit)

    // A plain click right after still opens it
    fireEvent.pointerDown(habit, { ...mouse, clientX: 320 })
    fireEvent.pointerUp(habit, { ...mouse, clientX: 320 })
    const followedAfterClick = fireEvent.click(habit)

    expect(followedAfterDrag).toBe(false)
    expect(followedAfterClick).toBe(true)
  })
})
