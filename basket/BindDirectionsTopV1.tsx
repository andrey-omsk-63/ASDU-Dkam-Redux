import * as React from 'react';

//import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//import uniqid from 'uniqid';

import { styleButtBox, styleXTG01 } from './BindComponents/BindDirectionsStyle';
import { styleXTG011, styleXTG02, styleXTG03 } from './BindComponents/BindDirectionsStyle';
import { styleXTG032, styleXTG033 } from './BindComponents/BindDirectionsStyle';
import { styleXTG032Norm, styleXTG033Norm } from './BindComponents/BindDirectionsStyle';
import { styleModalEnd, styleXTG034Norm } from './BindComponents/BindDirectionsStyle';
import { styleXTG034, styleXTG035, styleXTG036 } from './BindComponents/BindDirectionsStyle';
import { styleXTG035Norm, styleXTG036Norm } from './BindComponents/BindDirectionsStyle';
import { stylePlusMinus, styleSetDirect } from './BindComponents/BindDirectionsStyle';
import { styleButtDirect, styleModalEndDir } from './BindComponents/BindDirectionsStyle';

import { DateRPU } from './../../interfaceRPU.d';

let dateRpu: DateRPU;

let massFaza: Array<Array<number>> = [[]];

const BindDirectionsTop = (props: any) => {
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
  //======================================================

  let kolFaz = dateRpu.timetophases.length;
  // const [size, setSize] = React.useState(0);

  let sizeGl = window.innerWidth;
  let styleSetWidth = 650;
  if (sizeGl > 770) styleSetWidth = sizeGl - 50;
  let fSize = ((sizeGl - 700) * 3.5) / 450 + 10.5;

  let fSizeInp = 10.5;

  let xsss = 0.75;
  let napr = '';

  const styleBackdrop = {
    color: '#fff',
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
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

  //== Common ======================================

  const ReadNapravlenie = (i: number) => {
    switch (dateRpu.tirtonap[i].type) {
      case 1:
        napr = ' Тран';
        if (sizeGl > 800) napr = ' Трансп.';
        break;
      case 2:
        napr = ' Пеш';
        if (sizeGl > 800) napr = ' Пешех.';
        break;
      case 3:
        napr = ' Пов';
        if (sizeGl > 800) napr = ' Повор.';
    }
  };

  const RecordInDateRpu = (i: number, numCol: number, chego: number) => {
    switch (numCol) {
      case 1:
        dateRpu.tirtonap[i].green = chego;
        break;
      case 2:
        dateRpu.tirtonap[i].yellow = chego;
        break;
      case 3:
        dateRpu.tirtonap[i].reds[0] = chego;
        break;
      case 4:
        dateRpu.tirtonap[i].reds[1] = chego;
        break;
      case 5:
        dateRpu.tirtonap[i].reds[2] = chego;
        break;
      case 6:
        dateRpu.prombase[i].gd = chego;
        break;
      case 7:
        dateRpu.prombase[i].yel = chego;
        break;
      case 8:
        dateRpu.prombase[i].red = chego;
        break;
      case 9:
        dateRpu.prombase[i].ry = chego;
        break;
      case 10:
        dateRpu.prombase[i].gd = chego;
        break;
      case 11:
        dateRpu.prom[i].gd = chego;
        break;
      case 12:
        dateRpu.prom[i].yel = chego;
        break;
      case 14:
        dateRpu.prom[i].red = chego;
        break;
      case 15:
        dateRpu.prom[i].ry = chego;
        break;
      case 16:
        dateRpu.prom[i].gd = chego;
      // break;
      // case 21:
      //   dateRpu.timetophases[i].tmax = chego;
      //   break;
      // case 22:
      //   dateRpu.timetophases[i].tmin = chego;
    }
  };

  const InputTopTab = (kuda: number, styleXX: any, i: number, numCol: number) => {
    const [valuen, setValuen] = React.useState(kuda);
    let maxi = 64;
    let widthBlok = (sizeGl / 16 - 8).toString() + 'px';
    if (numCol > 20) {
      maxi = 9999;
      widthBlok = (sizeGl / (kolFaz + 1) - 10).toString() + 'px';
    }

    const styleBoxForm = {
      '& > :not(style)': {
        marginTop: 2,
        width: widthBlok,
      },
    };

    const handleChange = (event: any) => {
      let valueInp = event.target.value.replace(/^0+/, '');
      if (valueInp > maxi) valueInp = maxi;
      if (valueInp < 0) valueInp = 0;
      if (event.target.value === '') valueInp = 0;
      valueInp = Number(valueInp);
      setValuen(valueInp);
      RecordInDateRpu(i, numCol, valueInp);
    };

    const handleKey = (event: any) => {
      if (event.key === 'Enter') event.preventDefault();
    };

    return (
      <Grid item xs={xsss} sx={styleXX}>
        <Box component="form" sx={styleBoxForm} noValidate autoComplete="off">
          <TextField
            size="small"
            onKeyPress={handleKey} //отключение Enter
            type="number"
            inputProps={{ min: 0, max: maxi, style: { fontSize: fSizeInp } }}
            value={valuen}
            onChange={handleChange}
            variant="standard"
          />
        </Box>
      </Grid>
    );
  };

  //== TopTab =======================================

  const HeaderTopTab = () => {
    const ElemHeader = (xss: number, elem: string, styleXX: any) => {
      return (
        <Grid item xs={xss} sx={styleXX}>
          <b>{elem}</b>
        </Grid>
      );
    };

    return (
      <>
        <Grid item container xs={12}>
          {ElemHeader(0.75, '', styleXTG01)}
          {ElemHeader(3.75, 'Выходы', styleXTG01)}
          {ElemHeader(3.75, 'Базовый промтакт', styleXTG01)}
          {ElemHeader(3.75, 'Универс.промтакт', styleXTG011)}
        </Grid>
        <Grid item container xs={12}>
          {ElemHeader(0.75, 'Напр', styleXTG02)}
          {ElemHeader(0.75, 'Зел.', styleXTG02)}
          {ElemHeader(0.75, 'Жел.', styleXTG02)}
          {ElemHeader(0.75, 'Кр1.', styleXTG02)}
          {ElemHeader(0.75, 'Кр2.', styleXTG02)}
          {ElemHeader(0.75, 'Кр3.', styleXTG02)}
          {/* ========================== */}
          {ElemHeader(0.75, 'Тзм.', styleXTG02)}
          {ElemHeader(0.75, 'Тж.', styleXTG02)}
          {ElemHeader(0.75, 'Ткр.', styleXTG02)}
          {ElemHeader(0.75, 'Ткж.', styleXTG02)}
          {ElemHeader(0.75, 'Тзел.', styleXTG02)}
          {/* ========================== */}
          {ElemHeader(0.75, 'Тзм.', styleXTG02)}
          {ElemHeader(0.75, 'Тж.', styleXTG02)}
          {ElemHeader(0.75, 'Ткр.', styleXTG02)}
          {ElemHeader(0.75, 'Ткж.', styleXTG02)}
          {ElemHeader(0.75, 'Тзел.', styleXTG02)}
        </Grid>
      </>
    );
  };

  const OutputTopTab = (chego: any, styleXX: any) => {
    return (
      <Grid xs={0.75} item key={Math.random()} sx={styleXX}>
        {chego}
      </Grid>
    );
  };

  const StrokaTopTabNormal = (i: number) => {
    let begin = dateRpu.tirtonap[i].num + napr;

    return (
      <Grid container key={i}>
        {OutputTopTab(begin, styleXTG03)}
        {OutputTopTab(dateRpu.tirtonap[i].green, styleXTG032Norm)}
        {OutputTopTab(dateRpu.tirtonap[i].yellow, styleXTG033Norm)}
        {OutputTopTab(dateRpu.tirtonap[i].reds[0], styleXTG034Norm)}
        {OutputTopTab(dateRpu.tirtonap[i].reds[1], styleXTG034Norm)}
        {OutputTopTab(dateRpu.tirtonap[i].reds[2], styleXTG034Norm)}
        {/* ========================== */}
        {OutputTopTab(dateRpu.prombase[i].gd, styleXTG035Norm)}
        {OutputTopTab(dateRpu.prombase[i].yel, styleXTG033Norm)}
        {OutputTopTab(dateRpu.prombase[i].red, styleXTG034Norm)}
        {OutputTopTab(dateRpu.prombase[i].ry, styleXTG036Norm)}
        {OutputTopTab(dateRpu.prombase[i].gd, styleXTG032Norm)}
        {/* ========================== */}
        {OutputTopTab(dateRpu.prom[i].gd, styleXTG035Norm)}
        {OutputTopTab(dateRpu.prom[i].yel, styleXTG033Norm)}
        {OutputTopTab(dateRpu.prom[i].red, styleXTG034Norm)}
        {OutputTopTab(dateRpu.prom[i].ry, styleXTG036Norm)}
        {OutputTopTab(dateRpu.prom[i].gd, styleXTG032Norm)}
      </Grid>
    );
  };

  const StrokaTopTabModal = (i: number) => {
    let begin = dateRpu.tirtonap[i].num + napr;
    xsss = 0.75;

    return (
      <Grid container key={i}>
        {OutputTopTab(begin, styleXTG03)}
        {InputTopTab(dateRpu.tirtonap[i].green, styleXTG032, i, 1)}
        {InputTopTab(dateRpu.tirtonap[i].yellow, styleXTG033, i, 2)}
        {InputTopTab(dateRpu.tirtonap[i].reds[0], styleXTG034, i, 3)}
        {InputTopTab(dateRpu.tirtonap[i].reds[1], styleXTG034, i, 4)}
        {InputTopTab(dateRpu.tirtonap[i].reds[2], styleXTG034, i, 5)}
        {/* ========================== */}
        {InputTopTab(dateRpu.prombase[i].gd, styleXTG035, i, 6)}
        {InputTopTab(dateRpu.prombase[i].yel, styleXTG033, i, 7)}
        {InputTopTab(dateRpu.prombase[i].red, styleXTG034, i, 8)}
        {InputTopTab(dateRpu.prombase[i].ry, styleXTG036, i, 9)}
        {InputTopTab(dateRpu.prombase[i].gd, styleXTG032, i, 10)}
        {/* ========================== */}
        {InputTopTab(dateRpu.prom[i].gd, styleXTG035, i, 11)}
        {InputTopTab(dateRpu.prom[i].yel, styleXTG033, i, 12)}
        {InputTopTab(dateRpu.prom[i].red, styleXTG034, i, 14)}
        {InputTopTab(dateRpu.prom[i].ry, styleXTG036, i, 15)}
        {InputTopTab(dateRpu.prom[i].gd, styleXTG032, i, 16)}
      </Grid>
    );
  };

  const MassTopTab = (mode: string) => {
    let resStr = [];

    for (let i = 0; i < dateRpu.tirtonap.length; i++) {
      ReadNapravlenie(i);
      if (mode === 'Normal') {
        resStr.push(StrokaTopTabNormal(i));
      } else {
        resStr.push(StrokaTopTabModal(i));
      }
    }
    Output();
    return resStr;
  };

  const OutputNormalTop = () => {
    fSizeInp = fSize;
    return (
      <Box sx={{ marginTop: -2.4, fontSize: fSize, height: '39.5vh' }}>
        <HeaderTopTab />
        <Box sx={{ height: '38vh', overflowX: 'auto' }}>{MassTopTab('Normal')}</Box>
      </Box>
    );
  };

  const OutputModalTop = () => {
    fSizeInp = 16;
    return (
      <Modal open={openSet} onClose={handleCloseSet}>
        <Box sx={styleSet}>
          <ModalEnd />
          <Grid container>
            <Grid item xs sx={{ marginRight: 1, marginTop: -3, fontSize: 16 }}>
              <HeaderTopTab />
              <Box sx={{ overflowX: 'auto', height: '69vh' }}>
                {open ? <Loader /> : <>{MassTopTab('Modal')}</>}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  };

  const AddNormalTop = () => {
    let lengthMas = dateRpu.tirtonap.length + 1;
    let maskTirtonap = {
      num: 0,
      type: 0,
      green: 0,
      yellow: 0,
      counter: 0,
      reds: [0, 0, 0],
    };
    let maskPrombase = {
      nap: 0,
      gd: 0,
      gb: 0,
      yel: 0,
      red: 0,
      ry: 0,
    };

    const AddRecordOutput = (val: number) => {
      maskTirtonap.num = lengthMas;
      maskTirtonap.type = val;
      dateRpu.tirtonap.push(maskTirtonap);
      maskPrombase.nap = lengthMas;
      dateRpu.prombase.push(maskPrombase);
      dateRpu.prom.push(maskPrombase);
      for (let i = 0; i < kolFaz; i++) {
        massFaza[i][lengthMas - 1] = 0;
      }
      setOpenSet(false);
      setSize(window.innerWidth + Math.random());
    };

    const ButtonKnob = (soob: string, val: number) => {
      return (
        <Grid container>
          <Grid item xs>
            <Button sx={styleButtDirect} variant="contained" onClick={() => AddRecordOutput(val)}>
              <b>{soob}</b>
            </Button>
          </Grid>
        </Grid>
      );
    };

    return (
      <Modal open={openSet} onClose={handleCloseSet}>
        <Box sx={styleSetDirect}>
          <Button sx={styleModalEndDir} onClick={handleCloseSetBut}>
            <b>&#10006;</b>
          </Button>
          <Stack direction="column">
            <Typography variant="h6" sx={{ color: '#5B1080' }}>
              Тип направления:
            </Typography>
            {ButtonKnob('Транспортное', 1)}
            {ButtonKnob('Пешеходное', 2)}
            {ButtonKnob('Поворотное', 3)}
            <Grid container>
              <Grid item xs sx={{ fontSize: 19, marginTop: 3, marginLeft: 2 }}>
                Трамвайное
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    );
  };

  const DelNormalTop = () => {
    let nomRecord = dateRpu.tirtonap.length - 1;
    const HandleCloseDel = (val: number) => {
      if (val === 1) {
        dateRpu.tirtonap.pop();
        dateRpu.prombase.pop();
        dateRpu.prom.pop();
        for (let i = 0; i < kolFaz; i++) {
          massFaza[i].pop();
        }
      }
      setOpenSet(false);
      setSize(window.innerWidth + Math.random());
    };

    return (
      <>
        {nomRecord >= 0 && (
          <Modal open={openSet} onClose={handleCloseSet}>
            <Box sx={styleSetDirect}>
              <Button sx={styleModalEndDir} onClick={handleCloseSetBut}>
                <b>&#10006;</b>
              </Button>
              <Stack direction="column">
                <Typography variant="h6" sx={{ textAlign: 'center', color: '#5B1080' }}>
                  Удаление направления №{dateRpu.tirtonap[nomRecord].num}
                  <br />
                  Вы уверены в этом?
                </Typography>
                <Stack direction="row">
                  <Button
                    sx={styleButtDirect}
                    variant="contained"
                    onClick={() => HandleCloseDel(1)}>
                    Да
                  </Button>
                  <Grid item xs></Grid>
                  <Button
                    sx={styleButtDirect}
                    variant="contained"
                    onClick={() => HandleCloseDel(2)}>
                    Нет
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Modal>
        )}
      </>
    );
  };

  //== Common ======================================

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const Output = () => {
    React.useEffect(() => {
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }, []);
  };

  const Loader = () => {
    return (
      <Backdrop sx={styleBackdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  const handleOpenModal = (nom: string) => {
    setOpenSet(true);
    setValueTC(nom);
    setOpen(true);
  };

  const ModalEnd = () => {
    return (
      <Button sx={styleModalEnd} onClick={handleCloseSetBut}>
        <b>&#10006;</b>
      </Button>
    );
  };

  const [valueTC, setValueTC] = React.useState('0');
  const [openSet, setOpenSet] = React.useState(false);

  const handleCloseSet = (event: any, reason: string) => {
    if (reason !== 'backdropClick') setOpenSet(false);
  };

  const handleCloseSetBut = () => {
    setOpenSet(false);
  };

  //отслеживание изменения размера экрана
  const [size, setSize] = React.useState(window.innerWidth);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <TabContext value={valueTC}>
      <Box sx={{ border: 0 }}>
        <Button sx={styleButtBox} variant="contained" onClick={() => handleOpenModal('33')}>
          <b>Привязка выходов</b>
        </Button>
        <Button sx={stylePlusMinus} variant="contained" onClick={() => handleOpenModal('34')}>
          <b>+</b>
        </Button>
        <Button sx={stylePlusMinus} variant="contained" onClick={() => handleOpenModal('35')}>
          <b>-</b>
        </Button>
        <OutputNormalTop />
        <TabPanel value="33">
          <OutputModalTop />
        </TabPanel>
        <TabPanel value="34">
          <AddNormalTop />
        </TabPanel>
        <TabPanel value="35">
          <DelNormalTop />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default BindDirectionsTop;
