import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

//import Tabs from '@mui/material/Tabs';
//import Tab from '@mui/material/Tab';

//import axios from 'axios';

const BindRight = () => {
  const styleBox = {
    border: 1,
    borderRadius: 1,
    backgroundColor: 'white',
    borderColor: 'primary.main',
  };

  const styleButt = {
    fontSize: 15,
    maxHeight: '18px',
    minHeight: '18px',
    marginTop: -2,
    backgroundColor: 'white',
    color: '#5B1080',
    textTransform: 'unset !important',
  };

  const styleButtBing = {
    fontSize: 12,
    maxHeight: '18px',
    minHeight: '18px',
    marginBottom: 1.5,
    backgroundColor: 'white',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleButtBingModal = {
    fontSize: 23,
    maxHeight: '27px',
    minHeight: '27px',
    marginBottom: 3,
    backgroundColor: 'white',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleSet = {
    position: 'absolute',
    top: '12vh',
    right: '18vh',
    width: 512,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderColor: 'primary.main',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  const styleModalEnd = {
    position: 'absolute',
    top: '0%',
    left: '90%',
    fontSize: 21,
  };

  const ModalEnd = () => {
    return (
      <Button sx={styleModalEnd} onClick={handleCloseSetBut}>
        &#10060;
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

  const handleOpenModal = (nom: string) => {
    setOpenSet(true);
    setValue(nom);
  };

  return (
    <Grid item xs>
      <Stack direction="column">
        <TabContext value={value}>
          <Box>
            <Grid container sx={styleBox}>
              <Grid item xs={12} sx={{ height: '30vh' }}>
                <Button sx={styleButt} variant="contained" onClick={() => handleOpenModal('21')}>
                  <b>В Crossform</b>
                </Button>

                <Grid container sx={{ fontSize: 12.9, marginTop: 1 }}>
                  <Grid item xs={11.3}>
                    <Button sx={styleButtBing} variant="contained">
                      <b>Открыть файл</b>
                    </Button>
                    <Button sx={styleButtBing} variant="contained">
                      <b>Сохран.файл</b>
                    </Button>
                    <Box sx={{ marginLeft: 1, marginBottom: 0.5 }}>Файл привязки</Box>
                    <Box sx={{ marginLeft: 1, marginBottom: 2 }}>{'<Не загружен>'}</Box>

                    <Button sx={styleButtBing} variant="contained">
                      <b>Записать ДК</b>
                    </Button>
                    <Button sx={styleButtBing} variant="contained">
                      <b>Прочитать ДК</b>
                    </Button>
                    <Button sx={styleButtBing} variant="contained">
                      <b>Сравнить ДК</b>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ marginTop: 0.5 }}>
            <Grid container sx={styleBox}>
              <Grid item xs={12} sx={{ height: '31.5vh' }}>
                <Button sx={styleButt} variant="contained" onClick={() => handleOpenModal('22')}>
                  <b>Время</b>
                </Button>

                <Grid container sx={{ fontSize: 12.9, marginTop: 1 }}>
                  <Grid item xs={10}>
                    <Box sx={{ marginLeft: 1, marginBottom: 0.5 }}>Система:</Box>

                    <Box sx={{ marginLeft: 1, marginBottom: 2 }}>19:45:44 20.03.2022</Box>
                    <Box sx={{ marginLeft: 1, marginBottom: 0.5 }}>Контроллер:</Box>

                    <Box sx={{ marginLeft: 1, marginBottom: 2 }}>19:45:44 20.03.2022</Box>
                    <Button sx={styleButtBing} variant="contained">
                      <b>Прочитать</b>
                    </Button>
                    <Button sx={styleButtBing} variant="contained">
                      <b>Установить</b>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <TabPanel value="21">
            <Modal open={openSet} onClose={handleCloseSet}>
              <Box sx={styleSet}>
                <ModalEnd />
                <Grid container sx={{ fontSize: 21, marginTop: 1 }}>
                  <Grid item xs={8}>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Открыть файл</b>
                    </Button>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Сохранить файл</b>
                    </Button>
                    <Box sx={{ marginLeft: 1, marginBottom: 0.5 }}>Файл привязки</Box>
                    <Box sx={{ marginLeft: 1, marginBottom: 2 }}>{'<Не загружен>'}</Box>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Записать ДК</b>
                    </Button>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Прочитать ДК</b>
                    </Button>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Сравнить ДК</b>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </TabPanel>

          <TabPanel value="22">
            <Modal open={openSet} onClose={handleCloseSet}>
              <Box sx={styleSet}>
                <ModalEnd />
                <Grid container sx={{ fontSize: 21 }}>
                  <Grid item xs={7}>
                    <Box sx={{ marginLeft: 1, marginBottom: 0.5 }}>Система:</Box>

                    <Box sx={{ marginLeft: 1, marginBottom: 2 }}>19:45:44 20.03.2022</Box>
                    <Box sx={{ marginLeft: 1, marginBottom: 0.5 }}>Контроллер:</Box>

                    <Box sx={{ marginLeft: 1, marginBottom: 2 }}>19:45:44 20.03.2022</Box>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Прочитать</b>
                    </Button>
                    <Button sx={styleButtBingModal} variant="contained">
                      <b>Установить</b>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </TabPanel>
        </TabContext>
      </Stack>
    </Grid>
  );
};

export default BindRight;
