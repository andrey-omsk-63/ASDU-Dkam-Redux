import * as React from 'react';
import { useSelector } from 'react-redux';

//import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BindRight from './BindComponents/BindRight';

import { styleBox, styleButtBox, styleXTG021 } from './BindComponents/BindPlansStyle';
import { styleXTG03 } from './BindComponents/BindPlansStyle';

import { DateRPU } from './../../interfaceRPU.d';

let dateRpu: DateRPU;
let massFaza: Array<Array<number>> = [[]];

let flagInitial = true;
let massPlan: Array<number> = [];
let crossPlan = 0;

const BindPlans = (props: any) => {
  //== Piece of Redux ======================================
  const comm = useSelector((state: any) => {
    const { commReducer } = state;
    return commReducer.comm;
  });

  const massfaz = useSelector((state: any) => {
    const { massfazReducer } = state;
    return massfazReducer.massfaz;
  });
  //console.log('massfazDirect:', massfaz);

  //const dispatch = useDispatch();
  dateRpu = comm.dateRpu;
  massFaza = massfaz;
  //========================================================

  if (flagInitial) {
    for (let i = 0; i < dateRpu.rpus.length; i++) {
      massPlan.push(dateRpu.rpus[i].number);
    }
    flagInitial = false;
  }

  const [size, setSize] = React.useState(0);
  let formSett = ['План 0(РП)', 0];

  let fSize = 11;
  let styleSetWidth = 650;

  if (size > 770) styleSetWidth = size - 50;
  if (size > 860) fSize = 13.5;

  const styleButtInp = {
    fontSize: fSize + 1,
    maxHeight: '21px',
    minHeight: '21px',
    marginBottom: 1.5,
    backgroundColor: 'white',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleSet = {
    position: 'absolute',
    marginTop: '1vh',
    marginLeft: '1vh',
    width: styleSetWidth,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderColor: 'primary.main',
    borderRadius: 2,
    boxShadow: 24,
    paddingRight: 3,
    paddingTop: 3,
  };

  const HeaderBattomTab = () => {
    return (
      <>
        <Grid item container xs={12}>
          <Grid item xs={1.9} sx={styleXTG021}>
            <b>№ перекл.</b>
          </Grid>
          <Grid item xs={1.9} sx={styleXTG021}>
            <b>Время вкл.</b>
          </Grid>
          <Grid item xs={1.9} sx={styleXTG021}>
            <b>Типы фазы</b>
          </Grid>
          <Grid item xs={1.9} sx={styleXTG021}>
            <b>№ фазы</b>
          </Grid>
          <Grid item xs={1.9} sx={styleXTG021}>
            <b>Длитель-ть</b>
          </Grid>
          <Grid item xs sx={styleXTG021}>
            <b>Продление пред.</b>
          </Grid>
        </Grid>
      </>
    );
  };

  const StrokaBattomTab = () => {
    let resStr = [];

    for (let i = 0; i < 27; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={2} item sx={styleXTG03}>
            {i + 1}
          </Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}></Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}></Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}></Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}></Grid>
          <Grid key={Math.random()} xs item sx={styleXTG03}></Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  const OutputNormalBattom = () => {
    return (
      <Box sx={{ border: 0, marginTop: 0, fontSize: fSize }}>
        <HeaderBattomTab />
        <Box sx={{ border: 0, height: '60.5vh', overflowX: 'auto' }}>{StrokaBattomTab()}</Box>
      </Box>
    );
  };

  const OutputModalBattom = () => {
    return (
      <Modal open={openSet} onClose={handleCloseSet}>
        <Box sx={styleSet}>
          <ModalEnd />
          <Grid container>
            <Grid item xs sx={{ marginRight: 1, marginTop: -3, fontSize: 18 }}>
              <Box sx={{ marginTop: -3 }}>
                <TopTabInput />
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <HeaderBattomTab />
                <Box sx={{ overflowX: 'auto', height: '69vh' }}>{StrokaBattomTab()}</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  };

  const InpForm = (nom: number) => {
    let labelTextField = 'Номер плана:';
    if (nom > 0) labelTextField = 'Время цикла, сек:';
    const [valuen, setValuen] = React.useState(formSett[nom]);

    const handleChange = (event: any) => {
      setValuen(event.target.value);
      formSett[nom] = event.target.value;
      //console.log('handle text >>', event.target.value);
      //dispatch(inputText(event.target.value));
    };

    const handleKey = (event: any) => {
      if (event.key === 'Enter') event.preventDefault();
    };

    return (
      <TextField
        size="small"
        onKeyPress={handleKey} //отключение Enter
        label={labelTextField}
        inputProps={{ style: { fontSize: fSize } }} // font size of input text
        InputLabelProps={{ style: { fontSize: fSize } }} // font size of input label
        value={valuen}
        onChange={handleChange}
        variant="outlined"
      />
    );
  };

  const styleApp01 = {
    fontSize: 14.5,
    marginRight: 0.5,
    marginLeft: 0.1,
    maxWidth: '18vh',
    minWidth: '18vh',
    maxHeight: '24px',
    minHeight: '24px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleModal = {
    position: 'absolute',
    marginLeft: '12vh',
    marginTop: '6vh',
    //transform: 'translate(-50%, -50%)',
    width: 145,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderColor: 'primary.main',
    borderRadius: 2,
    boxShadow: 24,
    paddingTop: 2,
    paddingLeft: 2,
  };

  const styleModalMenu = {
    fontSize: 17,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    marginBottom: 2,
    textTransform: 'unset !important',
  };

  const styleModalEnd = {
    position: 'absolute',
    top: '0%',
    left: 'auto',
    right: '-14%',
    maxHeight: '21px',
    minHeight: '21px',
    width: '6%',
    fontSize: 15,
    color: 'black',
  };

  const [open, setOpen] = React.useState(false);
  //const [crossPlan, setCrossPlan] = React.useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = (numer: number) => {
    // 777 - выход
    if (numer !== 777) {
      // 121 - новый план
      if (numer !== 121) {
        crossPlan = numer + 1;
      }
    }
    setOpen(false);
  };

  const SpisPlan = () => {
    let resStr = [];
    let stroka = '';

    resStr.push(
      <Button key={777} sx={styleModalEnd} onClick={() => handleClose(777)}>
        <b>&#10006;</b>
      </Button>,
    );
    if (!flagInitial) {
      for (let i = 0; i < massPlan.length; i++) {
        stroka = 'План  ' + massPlan[i];
        resStr.push(
          <Button key={i} sx={styleModalMenu} variant="contained" onClick={() => handleClose(i)}>
            <b>{stroka}</b>
          </Button>,
        );
      }
    }
    resStr.push(
      <Button key={121} sx={styleModalMenu} variant="contained" onClick={() => handleClose(121)}>
        Новый план
      </Button>,
    );

    return resStr;
  };

  const InputPlan = () => {
    return (
      <>
        <Button sx={styleApp01} variant="contained" onClick={handleOpen}>
          <b>Выбор плана</b>
        </Button>
        <Modal open={open}>
          <Box sx={styleModal}>{SpisPlan()}</Box>
        </Modal>
      </>
    );
  };

  const OutputPlan = () => {
    let plan = 'План ' + massPlan[crossPlan - 1];
    return (
      <>
        {crossPlan !== 0 && (
          <>
            <Typography variant="h6" sx={{ color: '#5B1080' }}>
              {plan}
            </Typography>
          </>
        )}
      </>
    );
  };

  const TopTabInput = () => {
    const styleBoxForm = {
      '& > :not(style)': { m: '1vh', width: '20ch' },
    };

    return (
      <>
        <Grid container sx={{ border: 0, marginTop: '6vh', height: '6vh' }}>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <InputPlan />
          </Grid>
          {/* <Grid item xs={6} sx={{ border: 0 }}>
            <Box component="form" sx={styleBoxForm} noValidate autoComplete="off">
              {InpForm(1)}
            </Box>
          </Grid> */}
        </Grid>
        <Grid container sx={{ border: 0, height: '6vh' }}>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <OutputPlan />
          </Grid>
          <Grid item xs={6} sx={{ border: 0 }}>
            <Box component="form" sx={styleBoxForm} noValidate autoComplete="off">
              {InpForm(1)}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const BattomTab = () => {
    return (
      <TabContext value={value}>
        <Box>
          <OutputNormalBattom />
          <TabPanel value="69">
            <OutputModalBattom />
          </TabPanel>
        </Box>
      </TabContext>
    );
  };

  const handleOpenModal = (nom: string) => {
    setOpenSet(true);
    setValue(nom);
  };

  const ModalEnd = () => {
    const styleModalEnd = {
      position: 'absolute',
      top: '0%',
      left: 'auto',
      right: '-2%',
      maxHeight: '21px',
      minHeight: '21px',
      width: '6%',
      fontSize: 19,
      color: 'black',
    };

    return (
      <Button sx={styleModalEnd} onClick={handleCloseSetBut}>
        <b>&#10006;</b>
      </Button>
    );
  };

  const [value, setValue] = React.useState('0');
  const [openSet, setOpenSet] = React.useState(false);

  const handleCloseSet = (event: any, reason: string) => {
    if (reason !== 'backdropClick') setOpenSet(false);
  };

  const handleCloseSetBut = () => {
    setOpenSet(false);
  };

  //отслеживание изменения размера экрана
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const BindLeft = () => {
    return (
      <Grid item xs={9}>
        <Stack direction="column">
          <Grid container sx={styleBox}>
            <Button sx={styleButtBox} variant="contained" onClick={() => handleOpenModal('69')}>
              <b>Планы</b>
            </Button>
            <Grid item xs={12} sx={{ height: '24.4vh' }}>
              <TopTabInput />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ height: '0.5vh' }}></Grid>
          </Grid>
          <Grid container sx={styleBox}>
            <Grid item xs sx={{ border: 0, height: '64.6vh' }}>
              <BattomTab />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    );
  };

  return (
    <Box sx={{ marginTop: -3, marginLeft: -3, marginRight: -3 }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <BindLeft />
            <Grid item xs={0.05}></Grid>
            <BindRight />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BindPlans;
