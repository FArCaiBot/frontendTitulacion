import { Stack, Typography, Container, Button } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataEstado from "../components/periodo/DataPeriodo";
import { eliminarPeriodo, getPeriodosAPI } from "../api/periodoAcademicoAPI";
import Iconify from "../components/Iconify";
import Page from "../components/Page";

export default function Estados() {


    return (
        <div>
            <Page title="Estados">
                <Container>
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Estados del proyecto
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill"
                            />}>
                            Nuevo
                        </Button>
                    </Stack>
                </Container>
            </Page>
        </div>
    );
}