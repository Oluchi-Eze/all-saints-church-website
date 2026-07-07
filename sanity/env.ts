export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-21'

// 1. Replace 'production' with your actual dataset name if it's different
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// 2. Replace 'your_id_here' with the ID from your Sanity Manage dashboard
export const projectId = '4so025vp' 

export const useCdn = false

// We keep this function here just in case other files expect it to exist
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
export const sanityToken = 'sk5XDczusPvOSUzYDnmeAUp19dSVdqI05Pin08Loed5tcslBimphpXhz9gNgVVWmErwGyN27VLGEnLlpRqOXz3G8V7vCFvKMEWi2f36cB7vrMKd274iXuURgX1OdsvPgpvIZXCF5J83Z1ksoT0U63fZXhRoHM2Ud6wrAQKDUhWWWa5clT5Ga'