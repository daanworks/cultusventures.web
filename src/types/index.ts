export type Config = {
  content: {
    title: string
    input: {
      placeholder: string
    }
    mailButton: {
      tooltipContent: string
    }
    apiButton: {
      tooltipContent: string
    }
    disclaimer: string
  }
}

export type DateFilters = {
  from: Date | null
  to: Date | null
}
