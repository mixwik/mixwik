import { LOGOS } from '../assets/images'

export const COLLECTIONS = {
  users: 'users',
  cs2: 'cs2',
  fortnite: 'fortnite',
  lol: 'lol',
  valorant: 'valorant',
  rocketLeague: 'rocketLeague',
  dota2: 'dota2',
  teams: 'teams',
  bugs: 'bugs'
}

export const GAMES = [
  {
    collection: COLLECTIONS.cs2,
    logo: LOGOS.cs2,
    name: 'Counter Strike 2'
  },
  {
    collection: COLLECTIONS.lol,
    logo: LOGOS.lol,
    name: 'League of Legends'
  },
  {
    collection: COLLECTIONS.fortnite,
    logo: LOGOS.fortnite,
    name: 'Fortnite'
  },
  {
    collection: COLLECTIONS.valorant,
    logo: LOGOS.valorant,
    name: 'Valorant'
  },
  {
    collection: COLLECTIONS.rocketLeague,
    logo: LOGOS.rocketLeague,
    name: 'Rocket League',
    comingSoon: true
  },
  {
    collection: COLLECTIONS.dota2,
    logo: LOGOS.dota2,
    name: 'Dota 2',
    comingSoon: true
  }
]

export const FILTER_KEYS = [
  'position',
  'typeOfGamer',
  'level',
  'premier',
  'preferenceTeam'
]

export const CS2_LEVELS = [
  'Silver',
  'Nova',
  'Ak',
  'Ak laurel',
  'Doble ak',
  'Chapa',
  'Aguila',
  'Aguila laurel',
  'Supreme',
  'Global elite'
]

export const CS2_PREMIER = [
  '0 - 5000',
  '5000 - 10000',
  '10000 - 15000',
  '15000 - 20000',
  '20000 - 25000',
  '25000 - 30000'
]

export const CS2_POSITIONS = [
  'Entry Fragger',
  'In-Game Leader',
  'AWPer',
  'Lurker',
  'Playmaker',
  'Support',
  'Entrenador',
  'Secondary AWPer'
]

export const FORTNITE_POSITIONS = [
  'Fragger',
  'In-game leader',
  'Support'
]

export const FORTNITE_PREFERENCE_TEAM = [
  '2 vs 2',
  '3 vs 3',
  '4 vs 4'
]

export const LOL_LEVELS = [
  'Sin Nivel',
  'Hierro',
  'Bronce',
  'Plata',
  'Oro',
  'Platino',
  'Diamante',
  'Maestro',
  'Gran Maestro',
  'Retador'

]

export const LOL_POSITIONS = [
  'Toplane',
  'Midlane',
  'Jungla',
  'ADC',
  'Support'
]

export const VALORANT_LEVELS = [
  'Hierro',
  'Bronce',
  'Plata',
  'Oro',
  'Platino',
  'Diamante',
  'Inmortal',
  'Valorant'
]

export const VALORANT_POSITION = [
  'Iniciador',
  'Duelista',
  'Centinela',
  'Controlador'
]

export const TYPE_OF_GAME = [
  'Casual',
  'Competitivo'
]
