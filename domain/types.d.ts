export type UserProvider = {
    name?: string
    email: string
    image?: string
    uid: string
}

export type UserServer = {
    admonition: boolean
    age: number
    ban: boolean
    description: string
    email: string
    gender: 'M' | 'F' | 'O'
    geometry: [number, number]
    name: string
    profileImg: string
    uid: string
    likes: string[]
    dateOfRegister: string
    mixWikTeams: string
    publications: {
        cs2Publications: number
        fortnitePublications: number
        lolPublications: number
        valorantPublications: number
        rocketLeaguePublications: number
        dota2Publications: number
    }
    social: {
        discord: string
        facebook: string
        instagram: string
        twitter: string
        youtube: string
        twitch: string
        tiktok: string
    }
}
