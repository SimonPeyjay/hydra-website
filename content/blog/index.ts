import type { Post } from "@/lib/blog"
import skrivaLatTillMelodifestivalen from "./skriva-lat-till-melodifestivalen"
import hurKommerManMedIEurovision from "./hur-kommer-man-med-i-eurovision"
import independentEllerMajor from "./independent-eller-major-melodifestivalen"
import checklistaMelodifestivalen from "./checklista-melodifestivalen"

// Add new posts here. Each file exports one Post; see lib/blog.ts for the format.
export const posts: Post[] = [
  skrivaLatTillMelodifestivalen,
  hurKommerManMedIEurovision,
  independentEllerMajor,
  checklistaMelodifestivalen,
]
