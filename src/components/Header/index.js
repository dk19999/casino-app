import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './index.css'

const useStyles = makeStyles({

  loginLogoutBtn:{
    marginLeft:20,
    borderColor:'#117A8B',
    textTransform:'uppercase',
    padding:10,
    backgroundColor:'white',
    borderWidth:1,
    cursor:'pointer'
  }, 
  freeCreditBtn:{
    padding:10,
    backgroundColor:'white',
    borderWidth:1,
    cursor:'pointer',
    marginLeft:30
  }

})

export default function Header({toggleLoginModal}) {

  const {userData, setUserData} = useContext(UserContext)

  const classes = useStyles()

  const onClickLogout = () => {

    setUserData(state => ({...state, name:'', loggedIn:false, spinData:[], balance:0}))

  }

  const giveFreeCredits = () => {
    setUserData(state => ({...state, balance:state.balance+100}))
  }

  return (
    <div className='Header'>
      <div className='Header__main'>
        <div>
          <span>Deepak Kumar</span>
          {
            userData.balance < 100 && <button onClick={giveFreeCredits} className = {classes.freeCreditBtn}>Get 100$ for free</button>

          }
        </div>
        <div >
          <span>Balance : {userData.balance}</span>
          {
            userData.loggedIn?(
              <button className={classes.loginLogoutBtn} onClick={onClickLogout}>Logout</button>):(
              <button className={classes.loginLogoutBtn} variant ={'outlined'} onClick={toggleLoginModal}>Login</button>)
            }
        </div>
      </div>    
    </div>
  );
}
