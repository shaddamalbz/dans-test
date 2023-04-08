import { FC, useState, useEffect } from 'react'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Dropdown from '@/components/Dropdown'
import { Profile } from '@/types/'

const Header: FC = () => {
  const [user, setUser] = useState<TokenResponse>()
  const [profile, setProfile] = useState<Profile>()

  const login = useGoogleLogin({
    onSuccess: (res) => setUser(res),
  })

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data)
        })
    }
  }, [user])

  return (
    <header className=" bg-blue-400 text-white ">
      <div className="container flex justify-between items-center h-20 mx-auto px-4">
        <Link className="text-white" to="/">
          <h1 className="font-bold">Github Jobs</h1>
        </Link>

        {profile ? (
          <Dropdown
            className="text-black"
            triggerButton={<img className="h-10 rounded-full" src={profile.picture} alt="user image" />}
          >
            <div>
              <div className="flex gap-x-2 items-center p-4">
                <img className="h-10 rounded-full" src={profile.picture} alt="user image" />
                <div>
                  <div>{profile.name}</div>
                  <div className="text-xs">{profile.email}</div>
                </div>
              </div>
            </div>
          </Dropdown>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
      </div>
    </header>
  )
}

export default Header
