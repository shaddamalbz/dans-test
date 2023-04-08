import { FC, useState, useEffect } from 'react'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import axios from 'axios'
import { Link } from 'react-router-dom'
import FacebookLogin from '@greatsumini/react-facebook-login'
import { FaFacebook } from 'react-icons/fa'

import Dropdown from '@/components/Dropdown'
import { Profile } from '@/types/'
import LogoGoogle from '@/assets/svg/logoGoogle.svg'

const Header: FC = () => {
  const [user, setUser] = useState<TokenResponse>()
  const [profile, setProfile] = useState<any>()
  const [loginWith, setLoginWith] = useState<'google' | 'facebook'>()

  const login = useGoogleLogin({
    onSuccess: (res) => setUser(res),
  })

  useEffect(() => {
    if (user) {
      axios
        .get<Profile>(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setLoginWith('google')
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
            triggerButton={
              <img
                className="h-10 rounded-full"
                src={loginWith === 'google' ? profile.picture : profile?.picture.data.url}
                alt="user image"
              />
            }
          >
            <div>
              <div className="flex gap-x-2 items-center p-4">
                <img
                  className="h-10 rounded-full"
                  src={loginWith === 'google' ? profile.picture : profile?.picture.data.url}
                  alt="user image"
                />
                <div>
                  <div>{profile.name}</div>
                  <div className="text-xs">{profile.email}</div>
                </div>
              </div>
            </div>
          </Dropdown>
        ) : (
          <Dropdown triggerButton={<button>Login</button>}>
            <div className="p-4 space-y-4">
              <button
                className="w-full flex gap-x-1 bg-white text-black text-opacity-50 font-bold rounded-lg shadow p-2 hover:bg-gray-100"
                onClick={() => login()}
              >
                <img src={LogoGoogle} alt="Google" /> Continue with Google
              </button>
              <FacebookLogin
                appId="5702631229838825"
                onProfileSuccess={(response) => {
                  setLoginWith('facebook')
                  setProfile(response)
                }}
                render={({ onClick }) => (
                  <button
                    className="bg-[#1877F2] text-white w-full flex items-center gap-x-1 rounded-lg shadow p-2"
                    onClick={onClick}
                  >
                    <FaFacebook size={24} />
                    Continue with Facebook
                  </button>
                )}
              />
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  )
}

export default Header
