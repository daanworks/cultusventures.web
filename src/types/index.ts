export type BitcoinPrice = {
  bitcoin: {
    [currency: string]: number
  }
}

export type TelegramInviteLink = {
  ok: boolean
  result: {
    invite_link: string
    creator: {
      id: number
      is_bot: boolean
      first_name: string
      username: string
    }
    member_limit: number
    creates_join_request: boolean
    is_primary: boolean
    is_revoked: boolean
  }
}

export type Config = {
  content: {
    title: string
    input: {
      placeholder: string
    }
    joinButton: {
      tooltipContent: string
    }
    apiButton: {
      tooltipContent: string
    }
    disclaimer: string
  }
}
