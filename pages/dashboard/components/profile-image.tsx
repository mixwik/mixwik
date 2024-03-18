import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'
import { UserProvider, UserServer } from '../../../domain/types'

export const ProfileImage = (
  { userProvider, userServer }:
    { userProvider: UserProvider, userServer: UserServer }
) => {
  return (
    <Image
      className='w-full h-full'
      width={96}
      height={96}
      loader={myLoader}
      src={userServer?.profileImg ? userServer.profileImg : userProvider.image}
      alt={userProvider?.name ?? 'user'}
    />
  )
}
