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
//import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BindRight from './BindComponents/BindRight';

import { styleBox, styleButtBox, styleXTG021 } from './BindComponents/BindPlansStyle';
import { styleXTG03, styleModalPlan, styleModalTime } from './BindComponents/BindPlansStyle';
import { styleModalMenu, styleModalMenuOk, styleModalEnd } from './BindComponents/BindPlansStyle';

import { DateRPU } from './../../interfaceRPU.d';

let dateRpu: DateRPU;

let flagInitial = true;
let crossPlan = 0;
let massPlan: any = [];

const BindPlans = (props: any) => {
  //== Piece of Redux ======================================
  const comm = useSelector((state: any) => {
    const { commReducer } = state;
    return commReducer.comm;
  });
  dateRpu = comm.dateRpu;
  //== Инициализация =======================================
  if (flagInitial) {
    for (let i = 0; i < dateRpu.rpus.length; i++) {
      let maskMassPlan = {
        number: 0,
        tcycle: 0,
        jm: false,
        oc: false,
      };
      maskMassPlan.number = dateRpu.rpus[i].number;
      maskMassPlan.tcycle = dateRpu.rpus[i].tcycle;
      massPlan.push(maskMassPlan);
    }
    if (dateRpu.rpus.length > 0) crossPlan = 1;
    flagInitial = false;
  }
  //========================================================
  const [size, setSize] = React.useState(0);

  let fSize = 11;
  let styleSetWidth = 650;
  let maxWidthApp = '18vh';

  if (size > 770) styleSetWidth = size - 50;
  if (size > 780) maxWidthApp = '24vh';
  if (size > 860) fSize = 13.5;

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

  const styleInpPlanTime = {
    fontSize: 15.3,
    marginRight: 0.5,
    marginLeft: 0.1,
    maxWidth: maxWidthApp,
    minWidth: maxWidthApp,
    maxHeight: '24px',
    minHeight: '24px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
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
    let timeOn = 0;

    for (let i = 0; i < dateRpu.rpus[crossPlan - 1].pahses.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={2} item sx={styleXTG03}>
            {i + 1}
          </Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}>
            {timeOn}
          </Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}></Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}>
            {dateRpu.rpus[crossPlan - 1].pahses[i].phase}
          </Grid>
          <Grid key={Math.random()} xs={1.9} item sx={styleXTG03}>
            {dateRpu.rpus[crossPlan - 1].pahses[i].time}
          </Grid>
          <Grid key={Math.random()} xs item sx={styleXTG03}></Grid>
        </Grid>,
      );
      timeOn = timeOn + dateRpu.rpus[crossPlan - 1].pahses[i].time
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
                <TopTabInputOutput />
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

  const [open, setOpen] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpenTime = () => setOpenTime(true);

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

  const handleCloseTime = (numer: number) => {
    // 777 - выход
    if (numer !== 777) {

    }
    setOpenTime(false);
  };

  const SpisPlan = () => {
    let resStr = [];
    let stroka = '';

    resStr.push(
      <Button key={777} sx={styleModalEnd} onClick={() => handleClose(777)}>
        <b>&#10006;</b>
      </Button>,
    );
    for (let i = 0; i < massPlan.length; i++) {
      stroka = 'План  ' + massPlan[i].number;
      resStr.push(
        <Button key={i} sx={styleModalMenu} variant="contained" onClick={() => handleClose(i)}>
          <b>{stroka}</b>
        </Button>,
      );
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
        <Button sx={styleInpPlanTime} variant="contained" onClick={handleOpen}>
          <b>Выбор плана</b>
        </Button>
        <Modal open={open}>
          <Box sx={styleModalPlan}>{SpisPlan()}</Box>
        </Modal>
      </>
    );
  };

  const InputTime = () => {
    return (
      <>
        <Button sx={styleInpPlanTime} variant="contained" onClick={handleOpenTime}>
          <b>Время цикла, сек:</b>
        </Button>
        <Modal open={openTime}>
          <Box sx={styleModalTime}>
            <Button key={777} sx={styleModalEnd} onClick={() => handleCloseTime(777)}>
              <b>&#10006;</b>
            </Button>
            <Typography key={100} variant="h6" sx={{ marginLeft: 2, marginBottom: 2, color: '#5B1080' }}>
              {massPlan[crossPlan - 1].tcycle}
            </Typography>
            <Grid container>
              <Button sx={styleModalMenu} variant="contained" onClick={() => handleCloseTime(212)}>
                ЖМ
              </Button>
            </Grid>
            <Button key={333} sx={styleModalMenu} variant="contained" onClick={() => handleCloseTime(333)}>
              ОС
            </Button>
            <Button key={101} sx={styleModalMenuOk} variant="contained" onClick={() => handleCloseTime(121)}>
              Ввод
            </Button>
          </Box>
        </Modal>
      </>
    );
  };

  const OutputPlanTime = () => {
    let plan = '';
    if (crossPlan !== 0) {
      plan = 'План ' + massPlan[crossPlan - 1].number;
    }

    return (
      <>
        {crossPlan !== 0 && (
          <>
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#5B1080' }}>
                {plan}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#5B1080' }}>
                {massPlan[crossPlan - 1].tcycle}
              </Typography>
            </Grid>
          </>
        )}
      </>
    );
  };

  const TopTabInputOutput = () => {
    return (
      <>
        <Grid container sx={{ border: 0, marginTop: '6vh', height: '6vh' }}>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <InputPlan />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <InputTime />
          </Grid>
        </Grid>
        <Grid container sx={{ border: 0, height: '6vh' }}>
          <OutputPlanTime />
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
              <TopTabInputOutput />
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
