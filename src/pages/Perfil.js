import { Avatar, Box, Card, CardContent, CardHeader, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Page from "../components/Page";
import { useAuth } from "../hooks";
import account from '../_mock/account';
import ChangePassword from "../components/auth/ChangePassword";

export default function Perfil() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { auth } = useAuth();
    return (
        <Page title="Perfil">
            <Container>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 2
                    }}

                >
                    <Container maxWidth="lg">
                        <Typography sx={{ mb: 3 }} variant="h4">
                            Cuenta
                        </Typography>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Info" value="1" />
                                        <Tab label="Settings" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Grid container spacing={3}>
                                        <Grid
                                            item
                                            lg={4}
                                            md={6}
                                            xs={12}
                                        >
                                              <Card>
                                                    <CardContent>
                                                        <Box
                                                            sx={{
                                                                alignItems: 'center',
                                                                display: 'flex',
                                                                flexDirection: 'column'
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={account.photoURL}
                                                                sx={{
                                                                    height: 64,
                                                                    mb: 2,
                                                                    width: 64
                                                                }}
                                                            />
                                                            <Typography
                                                                color="textPrimary"
                                                                gutterBottom
                                                                variant="h5"
                                                                align="center"
                                                            >
                                                                {auth.userData.nombres} {auth.userData.apellidos}
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                variant="body2"
                                                            >
                                                                {auth.userData.email}
                                                            </Typography>
                                                            {auth.userData.roles.map(
                                                                rol =>
                                                                    <Typography
                                                                        key={rol.index}
                                                                    >
                                                                        {rol}
                                                                    </Typography>
                                                            )}


                                                        </Box>

                                                    </CardContent>
                                                </Card>
                                        </Grid>
                                        <Grid
                                        item
                                        lg={8}
                                        md={6}
                                        xs={12}
                                        >
                                        <form>
                                                <Card>
                                                    <CardHeader
                                                        subheader="La información no puede ser editada, comuníquese con el administrador"
                                                        title="Perfil"
                                                    />
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid
                                                            container
                                                            spacing={3}
                                                        >
                                                            <Grid
                                                                item
                                                                md={6}
                                                                xs={12}
                                                            >
                                                                <TextField
                                                                    fullWidth
                                                                    label="Cedula"
                                                                    name="cedula"
                                                                    value={auth.userData.cedulaUsuario}
                                                                    variant="outlined"
                                                                    disabled
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                md={6}
                                                                xs={12}
                                                            >
                                                                <TextField
                                                                    fullWidth
                                                                    label="Nombres"
                                                                    name="nombres"
                                                                    value={auth.userData.nombres}
                                                                    variant="outlined"
                                                                    disabled
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                md={6}
                                                                xs={12}
                                                            >
                                                                <TextField
                                                                    fullWidth
                                                                    label="Apellidos"
                                                                    name="apellidos"
                                                                    required
                                                                    variant="outlined"
                                                                    disabled
                                                                    value={auth.userData.apellidos}
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                md={6}
                                                                xs={12}
                                                            >
                                                                <TextField
                                                                    fullWidth
                                                                    label="Email Address"
                                                                    name="email"
                                                                    required
                                                                    value={auth.userData.email}
                                                                    disabled
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>


                                                </Card>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="2">
                                        <ChangePassword/>
                                </TabPanel>
                                
                            </TabContext>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </Page>
    );
}