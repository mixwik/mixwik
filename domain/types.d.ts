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
    affiliateCode: string
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
    id: string
    category: string
    date: string
    title: string
    description: string
    hours: number
    age: number
    level: string
    premier: string
    preferenceTeam: string[]
    position: string[]
    typeOfGamer: string[]
    geometry: [number, number]
    uid: string
    promotion: string
    img: {
        url: string
        name: string
    }
    img2: {
        url: string
        name: string
    }
    img3: {
        url: string
        name: string
    }
    img4: {
        url: string
        name: string
    }
    img5: {
        url: string
        name: string
    }
    img6: {
        url: string
        name: string
    }
    img7: {
        url: string
        name: string
    }
}

export type teamServer = {
    id: string
    category: string
    date: string
    title: string
    description: string
    hours: number
    age: number
    level: string[]
    premier: string[]
    preferenceTeam: string[]
    position: string[]
    typeOfGamer: string[]
    geometry: [number, number]
    promotion: string
    uid: string
    img: {
        url: string
        name: string
    }
    img2: {
        url: string
        name: string
    }
    img3: {
        url: string
        name: string
    }
    img4: {
        url: string
        name: string
    }
    img5: {
        url: string
        name: string
    }
    img6: {
        url: string
        name: string
    }
    img7: {
        url: string
        name: string
    }
}
