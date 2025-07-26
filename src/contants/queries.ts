type ClientListQueryKeyParams = {
  organizationId: string
  page: number
  limit: number
  search: string
  state: string
}

export class ReactQueryKeys {
  static readonly clients = {
    list: (params: ClientListQueryKeyParams) =>
      [
        'clients',
        'list',
        params.organizationId,
        params.page,
        params.limit,
        params.search,
        params.state,
      ] as const,
  }
}
