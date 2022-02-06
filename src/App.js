import { Button } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import './App.css';
import Header from './components/Header';
import GameModal from './components/modals/GameModal';
import Login from './components/modals/Login';
import Table from './components/Table';
import { GridColDef } from '@mui/x-data-grid';
import { createStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    btn: {
      cursor: 'pointer',
    },

    textBold: {
      fontWeight: 'bold',
    },
    textLarge: {
      fontSize: '26px',
    },
    startBtn: {
      cursor: 'pointer',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 2,
      marginTop: 10,
      marginBottom: 10,
    },
    tableWrapper: {
      padding: 10,
    },
  })
);

export const UserContext = createContext(null);

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);

  const classes = useStyles();

  const columns: GridColDef = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'time', headerName: 'Time', width: 300 },
    {
      field: 'slotsDataa',
      headerName: 'Slots Data',
      width: 300,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <>
          <img
            style={{ width: '25px', margin: '0px 10px' }}
            src={images[params.row.slotsData[0]]}
          ></img>
          <img
            style={{ width: '25px', margin: '0px 10px' }}
            src={images[params.row.slotsData[1]]}
          ></img>
          <img
            style={{ width: '25px', margin: '0px 10px' }}
            src={images[params.row.slotsData[2]]}
          ></img>
        </>
      ),
    },
  ];

  const images = {
    0: '/Diamond.png',
    1: '/Heart.png',
    2: '/Club.png',
    3: '/Spade.png',
  };

  const toggleLoginModal = () => {
    setShowLoginModal((state) => !state);
  };

  const toggleGameModal = () => {
    setShowGameModal((state) => !state);
  };

  const [userData, setUserData] = useState({
    name: '',
    balance: 100,
    spinData: [],
    loggedIn: false,
  });

  useEffect(() => {
    (async function () {
      const userData = await localStorage.getItem('userData');

      if (userData) {
        const data = JSON.parse(userData);
        setUserData(data);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div className="App">
        <Login open={showLoginModal} handleClose={toggleLoginModal} />
        <Header toggleLoginModal={toggleLoginModal}></Header>

        {userData?.spinData?.length > 0 ? (
          <>
            <div
              className={`flex flex-col justify-center align-center ${classes.tableWrapper}`}
            >
              <button className={classes.startBtn} onClick={toggleGameModal}>
                Start the game
              </button>
              <p
                className={`text-center  ${classes.textBold} ${classes.textLarge}`}
              >
                Results
              </p>

              <Table rows={userData.spinData} columns={columns}></Table>
            </div>
          </>
        ) : (
          <>
            <div
              style={{marginTop:'100px'}}
              className="flex flex-1 flex-col justify-center align-center mt-10"
            >
              <p>
                It looks like you have never played this game ,<br/> you can login or
                start playing right away
              </p>
              <button className={classes.startBtn} onClick={toggleGameModal}>
                Start the game
              </button>
            </div>
          </>
        )}
        <GameModal handleClose={toggleGameModal} open={showGameModal} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
