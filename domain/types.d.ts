export type UserProvider = {
    name: string
    email: string
    image: string
    uid: string
}

export type UserServer = {
    admonition: boolean
    age: string
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

export type gameServer = {
    category: string
    title: string
    description: string
    hours: number
    age: string
    level: string[]
    preferenceTeam: string[]
    position: string[]
    premier: string
    typeOfGamer: string[]
}
