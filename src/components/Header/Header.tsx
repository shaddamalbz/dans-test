import { FC, useState, useEffect } from 'react'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  const [user, setUser] = useState<any>({})
  const [profile, setProfile] = useState<any>(null)

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

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
        .catch((err) => console.log(err))
    }
  }, [user])

  return (
    <header className=" bg-blue-400 text-white ">
      <div className="container flex justify-between items-center h-20 mx-auto px-4">
        <Link className="text-white" to="/">
          <h1 className="font-bold">Github Jobs</h1>
        </Link>

        {profile ? (
          <div className="flex items-center gap-x-1">
            <img className="h-10 rounded-full" src={profile.picture} alt="user image" />
            <p>{profile.name}</p>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
      </div>
    </header>
  )
}

export default Header
