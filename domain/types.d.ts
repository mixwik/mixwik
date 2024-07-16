export type UserProvider = {
    name: string
    email: string
    image: string
    uid: string
}

export type UserServer = {
    uid: string
    id: string
    admonition: boolean
    age: string
    ban: boolean
    description: string
    email: string
    gender: 'M' | 'F' | 'O'
    geometry: [number, number]
    name: string
    profileImg: {
        url: string
        name: string
    }
    likes: string[]
    dateOfRegister: string
    mixWikTeams: string
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
    type: string
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
    affiliateCode: string
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
    type: string
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
    affiliateCode: string
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
