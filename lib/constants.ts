export const PROJECT_TYPES = [
  "recording",
  "mixing",
  "mastering",
  "production",
  "other",
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

export const PROJECT_TYPE_MAP: Record<ProjectType, string> = {
  recording: "Recording",
  mixing: "Mixing",
  mastering: "Mastering",
  production: "Full Production",
  other: "Other",
}

export const STUDIO_IDS = [
  "andreas",
  "costa",
  "simon",
  "david",
  "peter",
  "angelino",
  "denniz",
  "thomas",
] as const

export type StudioId = (typeof STUDIO_IDS)[number]

export const STUDIO_MAP: Record<StudioId, string> = {
  andreas: 'Andreas "Stone" Johansson',
  costa: "Costa Leon",
  simon: "Simon Peyron",
  david: "David Fremberg",
  peter: "Peter Zimny",
  angelino: "Angelino Markenhorn",
  denniz: "Denniz Jamm",
  thomas: "Thomas Wallén (Publishing)",
}
