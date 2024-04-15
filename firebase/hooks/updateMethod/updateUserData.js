import { doc, increment, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../../../domain/constants.js'
import { db } from '../../initialize.jsx'

export const updateUserData = async (id, data, img) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    name: data.name,
    age: data.age,
    gender: data.gender,
    description: data.description,
    profileImg: img,
    social: {
      twitter: data.twitter,
      discord: data.discord,
      twitch: data.twitch,
      youtube: data.youtube,
      instagram: data.instagram,
      facebook: data.facebook
    }
  })
}

export const updateDiscord = async (id, discord, socials) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    social: {
      discord,
      twitter: socials.twitter || '',
      twitch: socials.twitch || '',
      youtube: socials.youtube || '',
      instagram: socials.instagram || '',
      facebook: socials.facebook || ''
    }
  })
}
export const updateTwitter = async (id, twitter, socials) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    social: {
      twitter,
      discord: socials.discord || '',
      twitch: socials.twitch || '',
      youtube: socials.youtube || '',
      instagram: socials.instagram || '',
      facebook: socials.facebook || ''
    }
  })
}

export const updateUserNumberPublications = async (category, uid, number) => {
  const userRef = doc(db, COLLECTIONS.users, uid)
  if (category === COLLECTIONS.cs2) {
    await updateDoc(userRef, {
      cs2Publications: increment(number)
    }).then(() => {
      location.reload()
    })
  } else if (category === COLLECTIONS.fortnite) {
    await updateDoc(userRef, {
      fortnitePublications: increment(number)
    }).then(() => {
      location.reload()
    })
  } else if (category === COLLECTIONS.lol) {
    await updateDoc(userRef, {
      lolPublications: increment(number)
    }).then(() => {
      location.reload()
    })
  } else if (category === COLLECTIONS.valorant) {
    await updateDoc(userRef, {
      valorantPublications: increment(number)
    }).then(() => {
      location.reload()
    })
  }
}

export const updateUserBan = async (id, bool) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    ban: bool
  }).then(() => {
    location.reload()
  })
}
export const updateUserAdmonition = async (id, number) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    admonition: increment(number)
  }).then(() => {
    location.reload()
  })
}
export const updateBugsSolution = async (id, bool) => {
  const userRef = doc(db, COLLECTIONS.bugs, id)
  await updateDoc(userRef, {
    resolved: bool
  }).then(() => {
    location.reload()
  })
}

export const updateUserMixWikTeams = async (payID, id, router) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    mixWikTeams: payID
  }).then(
    router.push('/dashboard')
  )
}

export const updateUserCopper = async (payID, id) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    cobre: payID
  })
}

export const updateUserSilver = async (payID, id) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    plata: payID
  })
}

export const updateUserGold = async (payID, id) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    oro: payID
  })
}

export const updatePublicationPromotion = async (name, payID, id, router) => {
  const userRef = doc(db, name, id)
  await updateDoc(userRef, {
    promotion: payID
  }).then(
    router.push('/dashboard')
  )
}

export const updatePublicationPosition = async (name, id, currentPosition) => {
  const userRef = doc(db, name, id)
  await updateDoc(userRef, {
    geometry: currentPosition
  }).then(
    setTimeout(() => {
      location.reload()
    }, 2000)
  ).catch(
    console.log('error al actualizar posición')
  ).finally(
  )
}

export const updatePublicationImages = async (category, id, img, name, img2, name2, img3, name3, img4, name4, img5, name5, img6, name6, img7, name7) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    img: {
      url: img,
      name
    },
    img2: {
      url: img2 || '',
      name: name2 || ''
    },
    img3: {
      url: img3 || '',
      name: name3 || ''
    },
    img4: {
      url: img4 || '',
      name: name4 || ''
    },
    img5: {
      url: img5 || '',
      name: name5 || ''
    },
    img6: {
      url: img6 || '',
      name: name6 || ''
    },
    img7: {
      url: img7 || '',
      name: name7 || ''
    }
  })
}

export const updatePublicationDescription = async (category, id, description) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    description
  })
}
export const updatePublicationTitle = async (category, id, title) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    title
  })
}
export const updatePublicationTypeOfGamer = async (category, id, typeOfGamer) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    typeOfGamer
  })
}
export const updatePublicationCsgoLevel = async (category, id, level) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    level
  })
}
export const updatePublicationFortnitePreferenceTeam = async (category, id, preferenceTeam) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    preferenceTeam
  })
}
export const updatePublicationCsgoPosition = async (category, id, position) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    position
  })
}
export const updatePublicationHours = async (category, id, hours) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    hours
  })
}
export const updatePublicationAge = async (category, id, age) => {
  const userRef = doc(db, category, id)
  await updateDoc(userRef, {
    age
  })
}
