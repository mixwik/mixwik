import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { BackgroundDots } from '../../components/background-dots'
import { useSession } from '../../firebase/auth/useSession'
import { useConfirmUserRegister } from '../../hooks/useConfirmUserRegister'
import { Stepper } from './components/stepper'
import { Step1 } from './components/steps/step-1'
import { Step2 } from './components/steps/step-2'
import { Step3 } from './components/steps/step-3'
import { Step4 } from './components/steps/step-4'
import { Step5 } from './components/steps/step-5'

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

  useConfirmUserRegister('register')
  return (
    <Layout title='Registro'>
      <section className='flex flex-col items-center justify-center h-[90vh]'>
        <BackgroundDots />
        <Stepper steps={steps} />
        {steps === 'step-1' && (
          <Step1
            accept={accept}
            setAccept={setAccept}
            userProvider={userProvider}
            setSteps={setSteps}
          />
        )}
        {steps === 'step-2' && (
          <Step2
            userProvider={userProvider}
            setSteps={setSteps}
          />
        )}
        {steps === 'step-3' && (
          <Step3
            setSteps={setSteps}
          />
        )}
        {steps === 'step-4' && (
          <Step4
            setSteps={setSteps}
          />
        )}
        {steps === 'step-5' && (
          <Step5
            setSteps={setSteps}
          />
        )}
      </section>
    </Layout>
  )
}

export default Register
