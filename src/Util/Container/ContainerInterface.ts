export interface ContainerInterface
{
    get(key: string): any
    add(key: string, value: any): any
    has(key: string): boolean
}