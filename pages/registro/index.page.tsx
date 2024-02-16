import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSession } from '../../firebase/auth/useSession'
import { Step1 } from './components/steps/step-1'
import { Steps2 } from './components/steps/steps-2'
import { Steps3 } from './components/steps/steps-3'

const Register = () => {
  const [accept, setAccept] = useState(false)
  const [steps, setSteps] = useState('step-1')
  const { userProvider } = useSession()

  useEffect(() => {
    const step = localStorage.getItem('step')
    if (step) {
      setSteps(step)
    }
  }, [])

  return (
    <Layout title='Registro'>
      <section className='flex items-center justify-center h-[90vh]'>
        <div className='fixed inset-0 -z-10 h-full w-full bg-slate-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]' />
        {steps === 'step-1' && (
          <Step1
            accept={accept}
            setAccept={setAccept}
            userProvider={userProvider}
            setSteps={setSteps}
          />
        )}
        {steps === 'step-2' && (
          <Steps2
            userProvider={userProvider}
            setSteps={setSteps}
          />
        )}
        {steps === 'step-3' && (
          <Steps3
            userProvider={userProvider}
            setSteps={setSteps}
          />
        )}
      </section>
    </Layout>
  )
}

export default Register
