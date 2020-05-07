import {useState, useEffect, useCallback} from 'react'

let logoutTimer
export const useAuth = () => {
  const  [token,setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()

  const login = useCallback((uid, token, expirationDate)=> {
      setToken(token)
      setUserId(uid)
      const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
      setTokenExpirationDate(tokenExpiration)
      localStorage.setItem('userData', JSON.stringify({userId:uid,token:token, expiration:tokenExpiration.toISOString()}))
  }, [])


  const logout = useCallback(()=> {
    setToken(null)
    setUserId(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('userData')

  }, [])

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()   // miliseconds
    logoutTimer =  setTimeout(logout,remainingTime)
   }else{
     clearTimeout(logoutTimer)
   }
  },[token,logout, tokenExpirationDate])

  useEffect(() => {                                                                    // When user login and page reload we are trying to keep user login wtih this.
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  } ,[login])

  return {token, login, logout, userId}
}
