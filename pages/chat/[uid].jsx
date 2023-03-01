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

  // El owner es el dueño del chat, al cuál nosotros hablamos
  // El myself somos nosotros que iniciamos la conversación
  const owner = users.find(find => find.uid === uid)
  const myself = users.find(find => find.uid === currentUser.uid)
  const chats = useGetChats()

  // Con esta función buscamos el uid propio y el de la otra persona dentro de los datos del chat para tener la seguridad de que accedemos al chat correcto
  const currentChatA = chats.find(find => find.ownerUid === myself.uid && find.participant === uid)
  const currentChatB = chats.find(find => find.participant === myself.uid && find.ownerUid === uid)
  const currentChat = currentChatA || currentChatB

  if (!currentChat) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.chat}>
        <section className={styles.chatBox}>
          <h1 className={styles.title}>{owner.name}</h1>
          <ul className={styles.messages}>
            {
              currentChat
                ? (
                    currentChat.messages.map(message => (
                      <li data-user={myself.name === message.name} key={message.date}>
                        <span>
                          {message.message}
                        </span>
                      </li>
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
              if (!values.message) errors.message = 'Este campo no puede ir vacío'
              return errors
            }}
            onSubmit={(values, { resetForm }) => {
              if (!currentChat) {
                setNewChat(owner.uid, myself.uid, values.message, myself.name)
                updateChatUid(owner.id, myself.uid)
                updateChatUid(myself.id, owner.uid)
              } else updateChat(currentChat.id, myself.name, values.message)
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
