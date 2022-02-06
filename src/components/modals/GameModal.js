import { Button, Dialog } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import ConfirmationDialog from './ConfirmationDialog';

const useStyles = makeStyles({
  root: {
    padding: 50,
  },
  slot: {
    height: 100,
    width: 50,
    borderWidth: 1,
    border: '3px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  slots: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  slotsWrapper: {
    border: '5px solid #c5c0d3',
    display: 'flex',
  },
  gameActions: {
    marginTop: 15,
  },
  action: {
    margin: '0px 5px',
    border: '1px solid #117A8B',
    padding: '10px 15px',
    borderRadius: '2px',
    backgroundColor: 'InactiveBorder',
    cursor: 'pointer',
  },
  errorText: {
    color: 'red',
  },
  heading: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default function GameModal({ open, handleClose }) {
  const classes = useStyles();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [spinResult, setSpinResult] = useState([0, 1, 2]);
  const [error, setError] = useState('');

  const { userData, setUserData } = useContext(UserContext);

  const toggleConfirmationDialog = () => {
    setShowConfirmationDialog((state) => !state);
  };

  const addSpinData = (data, earnedMoney) => {
    const date = new Date().toLocaleString('en-GB');
    setUserData((state) => ({
      ...state,
      balance: state.balance + earnedMoney,
      spinData: [
        ...state.spinData,
        { id: state.spinData.length + 1, slotsData: data, time: date },
      ],
    }));
  };

  const images = {
    0: '/Diamond.png',
    1: '/Heart.png',
    2: '/Club.png',
    3: '/Spade.png',
  };

  const onClickSpin = () => {
    let error = '';
    if (userData.balance < 2) {
      error = "You don't have sufficient credits to spin";
    }

    setError(error);
    if (error) {
      return;
    }

    const spinResult = [];
    const firstSpinResult = Math.floor(Math.random() * 4);

    spinResult[0] = firstSpinResult;
    const secondSpinResult = Math.floor(Math.random() * 4);
    spinResult[1] = secondSpinResult;
    const thirdSpinResult = Math.floor(Math.random() * 4);
    spinResult[2] = thirdSpinResult;

    let earnedMoney = 0.5; //for XXY XYX YXX

    if (
      firstSpinResult === secondSpinResult &&
      firstSpinResult === thirdSpinResult
    ) {
      //for YYY
      earnedMoney = 2;
      if (firstSpinResult === 3) {
        //for 3 spades in a row
        earnedMoney = 5;
      }
    }

    if (
      firstSpinResult !== secondSpinResult &&
      firstSpinResult !== thirdSpinResult &&
      secondSpinResult !== thirdSpinResult
    ) {
      //for XYZ
      earnedMoney = 0;
    }

    earnedMoney -= 2; // we are subtracting by 2 since it costs 2 dollars for every spin

    addSpinData(spinResult, earnedMoney);

    setSpinResult(spinResult);
  };

  const onClickFakeSpin = () => {
    setSpinResult([3, 3, 3]);
  };

  return (
    <>
      <Dialog
        onClose={toggleConfirmationDialog}
        open={open}
        className={classes.root}
        maxWidth={'lg'}
      >
        <ConfirmationDialog
          onAccept={handleClose}
          handleClose={toggleConfirmationDialog}
          content={'Are you sure you want to exit the game?'}
          open={showConfirmationDialog}
        />

        <span className={`text-center ${classes.heading}`}>
          Click on Spin to try your luck
        </span>
        <span className='text-center'>Each spin costs 2 dollars</span>
        <div style={{ padding: '50px' }}>
          <div className={classes.slots}>
            <div className={classes.slotsWrapper}>
              {spinResult.map((item, index) => (
                <div key={index} className={classes.slot}>
                  <img
                    style={{ height: '40px', width: '40px' }}
                    src={images[item]}
                  ></img>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.gameActions}>
            <button className={classes.action} onClick={onClickSpin}>
              Spin
            </button>
            <button className={classes.action} onClick={onClickFakeSpin}>
              Fake Spin
            </button>
            <button
              className={classes.action}
              onClick={toggleConfirmationDialog}
            >
              Exit Game
            </button>
          </div>
          <span className={classes.errorText}>{error}</span>
        </div>
      </Dialog>
    </>
  );
}
