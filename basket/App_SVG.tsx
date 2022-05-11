import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
//import Modal from '@mui/material/Modal';

//import axios from 'axios';

import IconAsdu from './IconAsdu';

import Condition from './components/Condition';
import Technology from './components/Technology';
import Eguipment from './components/Eguipment';
import BindDirections from './components/Bind/BindDirections';
import BindOutputs from './components/Bind/BindOutputs';
import BindPlans from './components/Bind/BindPlans';
import BindDiagram from './components/Bind/BindDiagram';
import Journal from './components/Journal/Journal';

const App = () => {
  const styleAppMenu = {
    border: 1,
    borderRadius: 1,
    borderColor: '#F1F5FB',
    marginLeft: 0.5,
    marginTop: 0.7,
    //height: '86vh',
    height: '92vh',
    backgroundColor: '#F1F5FB',
    opacity: 0.88,
    padding: 0.1
  };

  const styleAppPodv = {
    border: 0,
    marginRight: 0.5,
    marginLeft: 0.5,
    height: '6vh',
    //p: 1,
  };

  const styleButt01 = {
    fontSize: 16.5,
    maxHeight: '27px',
    minHeight: '27px',
    marginTop: 4,
    backgroundColor: '#F1F5FB',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleButt02 = {
    fontSize: 16.5,
    maxHeight: '27px',
    minHeight: '27px',
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

  const [value, setValue] = React.useState('1');

  return (
    <>
      <Grid container sx={{ height: '100vh' }}>
        {/* <AppHeader /> */}
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
                    <Box sx={{ fontSize: 19, marginTop: 3, marginLeft: 2 }}>
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
          <Grid container >
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
    </>
  );
};

export default App;

 // const HeaderGlob = () => {
  //   return (
  //     <>
  //       <svg width="100%" height="12vh">
  //         <rect width="100%" height="50%" fill="#FE929A" />
  //         <circle cx="100%" cy="69%" r="150" fill="blue" stroke="black" />
  //         <polygon points="120,0 240,225 0,225" fill="green" />
  //         <text
  //           x="60"
  //           y="33"
  //           fontFamily="Verdana"
  //           fontSize="38"
  //           fill="white"
  //           //stroke="black"
  //           strokeWidth="2">
  //           ООО «Автоматика-Д»
  //           {/* ЗАО «АВТОМАТИКА-Д» */}
  //         </text>
  //       </svg>
  //     </>
  //   );
  // };
//
  // const styleAppMulka = {
  //   border: 1,
  //   borderRadius: 2,
  //   borderColor: '#F1F5FB',
  //   marginTop: 0.5,
  //   marginRight: 3.5,
  //   marginLeft: 3,
  //   height: '6vh',
  //   //backgroundColor: '#F1F5FB',
  //   backgroundColor: '#FE929A',
  //   opacity: 0.88,
  // };