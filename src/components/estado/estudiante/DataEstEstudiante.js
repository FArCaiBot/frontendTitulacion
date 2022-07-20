import PropTypes from "prop-types";
import { filter } from "lodash";
import { useState } from "react";
import { Table, TableContainer, Card, TableBody, TableRow, TableCell } from "@mui/material";
import Scrollbar from "../../Scrollbar";
import { UserListHead, UserMoreMenu } from "../../../sections/@dashboard/table";

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'descripcion', label: 'Descripción', alignRight: false },
    { id: 'observaciones', label: 'Observaciones', alignRight: false },
    { id: '' },
];


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.descripcionPeriodo.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

DataEstEstudiante.propTypes = {
    data: PropTypes.object,
    delEstado: PropTypes.func,
    reset: PropTypes.func
}

export default function DataEstEstudiante({ data = [], delEstado, reset }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [filterName, setFilterName] = useState('');

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('id');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

    return (
            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            {/* Cabecera */}
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                onRequestSort={handleRequestSort}
                            />
                            {/* cuerpo */}
                             <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { id, descripcion, observaciones} = row;

                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                    >
                                        <TableCell component="th" scope="row" padding="normal">
                                            {id}
                                        </TableCell>
                                        <TableCell align="left">{descripcion}</TableCell>
                                        <TableCell align="left">{observaciones}</TableCell>                                        
                                        <TableCell align="left">
                                            <UserMoreMenu
                                                title={"estado"}
                                                body={`¿Está seguro que quiere eliminar el estado "${descripcion}"?. Le recordamos que esta acción no se puede deshacer`}
                                                onDelAction={() => delEstado(id)}
                                            >
                                                {/* <EditarEstAnt
                                                estado={row}                                                
                                                reset={reset}
                                                /> */}
                                                Hola
                                            </UserMoreMenu>
                                            
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>

                </Scrollbar>
            </Card>
    )
}