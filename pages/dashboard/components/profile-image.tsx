import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'
import { UserServer, UserProvider } from '../../../domain/types'

export const ProfileImage = (
  { userProvider, currentUser }:
    { userProvider: UserProvider, currentUser: UserServer }
) => {
  return (
    <>
      {
        userProvider?.image
          ? (
            <Image
              className='w-full h-full'
              width={96}
              height={96}
              loader={myLoader}
              src={userProvider?.image}
              alt={userProvider?.name ?? 'user'}
            />
            )
          : (
              currentUser?.profileImg
                ? <Image
                    className='w-full h-full'
                    src={currentUser?.profileImg}
                    alt={currentUser?.name}
                    width={96}
                    height={96}
                    loader={myLoader}
                  />
                : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-[1px]0 h-[1px]0'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 2a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 019.858 1.716c.03.1.142.284.142.284a.75.75 0 01-.142.284A5 5 0 017 5H4a1 1 0 00-1 1v12a1 1 0 001 1h3a5 5 0 010-10zm10 10a5 5 0 110-10 5 5 0 010 10z'
                      clipRule='evenodd'
                    />
                  </svg>
                  )
            )
        }
    </>
  )
}
