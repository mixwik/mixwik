import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../initialize.jsx'

export const updateUserData = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    name: data.name,
    age: data.age,
    gender: data.gender,
    description: data.description
  })
}

export const updateUserNumberPublications = async (id, number) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    csgoPublications: increment(number)
  }).then(() => {
    location.reload()
  })
}

export const updateUserBan = async (id, bool) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    ban: bool
  }).then(() => {
    location.reload()
  })
}
export const updateUserAdmonition = async (id, number) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    admonition: increment(number)
  }).then(() => {
    location.reload()
  })
}

export const updateUserMixWikTeams = async (payID, id, router) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    mixWikTeams: payID
  }).then(
    router.push('/')
  )
}

export const updateUserCobre = async (payID, id, router) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    cobre: payID
  }).then(
    router.push('/')
  )
}

export const updatePublicationPosition = async (name, id, currentPosition) => {
  console.log(currentPosition)
  const userRef = doc(db, name, id)
  await updateDoc(userRef, {
    geometry: currentPosition
  }).then(
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
