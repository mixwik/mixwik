export interface UserProvider {
    name?: string
    email: string
    image?: string
    uid: string
}

export interface User {
    admonition: boolean
    age: number
    ban: boolean
    cs2Publications: number
    description: string
    email: string
    fortnitePublications: number
    gender: string
    geometry: [number, number]
    lolPublications: number
    name: string
    profileImg: string
    uid: string
    valorantPublications: number
    id: string
}
