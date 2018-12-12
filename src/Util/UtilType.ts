export type RouteDefinitionType = {
    path: string
    method?: string
    handler: string
}

export type RouteType = {
    path: string
    method?: string
    controller?: string
    action?: string
}