interface Position {
  id: string
  type: string
  url: string
  created_at: string
  company: string
  company_url: string
  location: string
  title: string
  description: string
}

interface PositionDetail {
  id: string
  type: string
  url: string
  created_at: string
  company: string
  company_url: string
  location: string
  title: string
  description: string
  how_to_apply: string
  company_logo: string
}

interface SearchParam {
  description?: string
  location?: string
  full_time?: string
}

export type { Position, PositionDetail, SearchParam }
