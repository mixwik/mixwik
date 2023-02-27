import styles from './Chat.module.scss'

// Components
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { Formik, Field, Form } from 'formik'

// firebase
import { useGetUsers } from '../../firebase/hooks/getMethod/useGetUsers'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'
import { setNewChat } from '../../firebase/hooks/setMethod/setChats'
import { useGetChats } from '../../firebase/hooks/getMethod/getChats'
import { updateChat } from '../../firebase/hooks/updateMethod/updateChat'
import { updateChatUid } from '../../firebase/hooks/updateMethod/updateUserData'

export default function Chat () {
  const router = useRouter()
  const { uid } = router.query

  const users = useGetUsers('users')
  const currentUser = useSession()

  // El usuario A es el dueño del chat, al cuál nosotros hablamos
  // El usuario B somos nosotros que iniciamos la conversación
  const userA = users.find(find => find.uid === uid)
  const userB = users.find(find => find.uid === currentUser.uid)

  const chats = useGetChats()

  // Con esta función buscamos el uid propio y el de la otra persona dentro de los datos del chat para tener la seguridad de que accedemos al chat correcto
  const currentChat = chats.find(find => find.uids.includes(userB.uid) && userB.chatsUids.map((map) => find.uids.includes(map)))

  if (!userA) return <div>Loading...</div>
  if (!userB) return <div>Loading...</div>

  if (currentChat) {
    currentChat.messages.forEach((map, index) => {
      if (!map.read && userB.name !== map.name) console.log('leído')
    })
  }

  return (
    <Layout>
      <div className={styles.chat}>
        <section className={styles.chatBox}>
          <h1 className={styles.title}>{userA.name}</h1>
          <ul className={styles.messages}>
            {
              currentChat
                ? (
                    currentChat.messages.map(message => (
                      <li data-user={userB.name === message.name} key={message.date}>{message.message}</li>
                    ))
                  )
                : (
                  <li>No hay mensajes</li>
                  )
            }
          </ul>
          <Formik
            initialValues={
                {
                  message: ''
                }
              }
            validate={values => {
              const errors = {}
              if (!values.message) errors.message = 'Este campo no puedo ir vacío'
              return errors
            }}
            onSubmit={(values, { resetForm }) => {
              if (!currentChat) {
                setNewChat(userA.uid, userB.uid, userA.name, userA.profileImg, values.message, userB.name)
                updateChatUid(userA.id, userB.uid)
                updateChatUid(userB.id, userA.uid)
              } else updateChat(currentChat.id, userB.name, values.message)
              resetForm()
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type='text' name='message' />
                <button type='submit' disabled={isSubmitting}>
                  Enviar
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </Layout>
  )
}

Chat.Auth = PrivateRoute
