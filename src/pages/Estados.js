import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Stack, Typography, Container, Button, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EstProy from "../components/estado/proyecto/EstProy";
import EstAnteproy from "../components/estado/anteproyecto/EstAnteproy";
import Page from "../components/Page";
import EstEstudiante from "../components/estado/estudiante/EstEstudiante";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Estados() {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Page title="Estados">
                <Container>
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Estados
                        </Typography>
                    </Stack>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Anteproyecto" value="1" />
                                    <Tab label="Proyecto" value="2" />
                                    <Tab label="Estudiante" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <EstAnteproy/>
                            </TabPanel>
                            <TabPanel value="2">
                                <EstProy/>
                            </TabPanel>
                            <TabPanel value="3">
                                <EstEstudiante/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </Page>
        </div>
    );
}