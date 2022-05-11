import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
//import Modal from '@mui/material/Modal';

//import axios from 'axios';

import Condition from './components/Condition';
import Technology from './components/Technology';
import Eguipment from './components/Eguipment';
import BindDirections from './components/Bind/BindDirections';
import BindOutputs from './components/Bind/BindOutputs';
import BindPlans from './components/Bind/BindPlans';
import BindDiagram from './components/Bind/BindDiagram';
import Journal from './components/Journal/Journal';

import { DateRPU } from './interfaceRPU.d';
import { dataRpu } from './otladkaRpuData';

import IconAsdu from './IconAsdu';
//import { dateRpu,  } from './AppStorege';

export let dateRpuGl: DateRPU = {} as DateRPU;
let flagOpenRpu = true;

const App = () => {
  const styleAppMenu = {
    border: 0,
    borderRadius: 1,
    borderColor: '#F1F5FB',
    marginLeft: 0.5,
    marginTop: 0.7,
    height: '92vh',
    backgroundColor: '#F1F5FB',
    opacity: 0.88,
    padding: 0.1,
  };

  const styleAppPodv = {
    border: 0,
    marginRight: 0.5,
    marginLeft: 0.5,
    height: '5vh',
   };

  const styleButt01 = {
    fontSize: 19,
    maxHeight: '33px',
    minHeight: '33px',
    marginTop: 4,
    backgroundColor: '#F1F5FB',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleButt02 = {
    fontSize: 16.5,
    maxHeight: '33px',
    minHeight: '33px',
    marginTop: 4,
    backgroundColor: '#F1F5FB',
    color: '#003300',
    textTransform: 'unset !important',
  };

  const styleTitle = {
    fontSize: 24,
    marginTop: 1,
    textAlign: 'left',
    marginLeft: 4,
    color: '#5B1080',
  };

  const ButtonKnobLevel1 = (soob: string, val: string) => {
    return (
      <Grid container>
        <Grid item xs>
          <Button sx={styleButt01} variant="contained" onClick={() => setValue(val)}>
            <b>{soob}</b>
          </Button>
        </Grid>
      </Grid>
    );
  };

  const ButtonKnobLevel2 = (soob: string, val: string) => {
    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs>
          <Button sx={styleButt02} variant="contained" onClick={() => setValue(val)}>
            <b>{soob}</b>
          </Button>
        </Grid>
      </Grid>
    );
  };

  const [pointsRpu, setPointsRpu] = React.useState<DateRPU>({} as DateRPU);
  const [isOpenRpu, setIsOpenRpu] = React.useState(false);
  //const ipAdress: string = 'http://localhost:3000/otladkaRpu.json';
  // const ipAdress: string = 'http://192.168.115.114:3000/otladkaRpu.json';

  // React.useEffect(() => {
  //   axios.get(ipAdress).then(({ data }) => {
  //     setPointsRpu(data);
  //     setIsOpenRpu(true);
  //   });
  // }, []);

  if (flagOpenRpu) {
    // костыль
    setPointsRpu(dataRpu);
    setIsOpenRpu(true);
  }

  if (isOpenRpu && flagOpenRpu) {
    dateRpuGl = pointsRpu;
    flagOpenRpu = false;
    console.log('dateRpuGl:', dateRpuGl);
  }

  // отслеживание изменения размера экрана
  // const [size, setSize] = React.useState([0, 0]);
  // React.useLayoutEffect(() => {
  //   function updateSize() {
  //     setSize([window.innerWidth, window.innerHeight]);
  //   }
  //   window.addEventListener('resize', updateSize);
  //   updateSize();
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);

  const [value, setValue] = React.useState('1');

  //let heightAv = window.screen.availHeight;       //получение доступного размера экрана
  //let heightGl = window.innerHeight.toString() + 'px';
  let heightGl = '100vh';

  return (
    // <Grid container sx={{ border: 2, height: '92vh' }}>
    <Grid container sx={{ height: heightGl }}>
      <Grid container sx={{ marginRight: 0.5 }}>
        <TabContext value={value}>
          <Grid item xs={2.6} sx={styleAppMenu}>
            <Stack direction="column">
              <Box sx={styleTitle}>
                <b>ДКАМ</b>
              </Box>
              {ButtonKnobLevel1('Состояние', '1')}
              {ButtonKnobLevel1('Технология', '2')}
              {ButtonKnobLevel1('Оборудование', '3')}
              <Grid container>
                <Grid item xs>
                  <Box sx={{ fontSize: 20.5, marginTop: 3, marginLeft: 2 }}>
                    <b>Привязка</b>
                  </Box>
                </Grid>
              </Grid>
              {ButtonKnobLevel2('Выходы', '41')}
              {ButtonKnobLevel2('Направления', '42')}
              {ButtonKnobLevel2('Планы', '43')}
              {ButtonKnobLevel2('Диаграмма', '44')}

              {ButtonKnobLevel1('Журнал', '5')}
            </Stack>
          </Grid>
          <Grid item xs sx={styleAppMenu}>
            <TabPanel value="0"></TabPanel>
            <TabPanel value="1">
              <Condition />
            </TabPanel>
            <TabPanel value="2">
              <Technology />
            </TabPanel>
            <TabPanel value="3">
              <Eguipment />
            </TabPanel>
            <TabPanel value="41">
              <BindOutputs />
            </TabPanel>
            <TabPanel value="42">
              <BindDirections />
            </TabPanel>
            <TabPanel value="43">
              <BindPlans />
            </TabPanel>
            <TabPanel value="44">
              <BindDiagram />
            </TabPanel>
            <TabPanel value="5">
              <Journal />
            </TabPanel>
          </Grid>
        </TabContext>
      </Grid>
      <Grid item xs={12} sx={styleAppPodv}>
        <Grid container>
          <Grid item xs={1.7} sx={{ border: 0 }}>
            <IconAsdu />
          </Grid>
          <Grid item xs>
            <Box sx={{ p: 1, textAlign: 'center', fontSize: 14 }}>
              <b>Место для различнoй занимательнoй информации</b>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;