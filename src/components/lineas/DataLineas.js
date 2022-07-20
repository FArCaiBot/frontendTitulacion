import PropTypes from "prop-types";
import { filter } from "lodash";
import { useState } from "react";
import { Table, TableContainer, Card, Container, TableBody, TableRow, TableCell } from "@mui/material";
import Scrollbar from "../Scrollbar";
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/table";
import EditarLinea from "./EditLinea/EditLinea";
/* import EditarEstAnt from "./EditEstAnteproy/EditEstAnt"; */


const TABLE_HEAD = [
    { id: 'codigo', label: 'Código', alignRight: false },
    { id: 'lineaInvestigacion', label: 'Linea de Investigación', alignRight: false },
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

DataLinea.propTypes = {
    data: PropTypes.object,
    delLinea: PropTypes.func,
    reset: PropTypes.func
}

export default function DataLinea({ data = [], delLinea, reset }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [filterName, setFilterName] = useState('');

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('codigo');


    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
                                const { codigo, lineaInvestigacion} = row;

                                return (
                                    <TableRow
                                        hover
                                        key={codigo}
                                        tabIndex={-1}
                                        role="checkbox"
                                    >
                                        <TableCell component="th" scope="row" padding="normal">
                                            {codigo}
                                        </TableCell>
                                        <TableCell align="left">{lineaInvestigacion}</TableCell>
                                        
                                        <TableCell align="left">
                                            <UserMoreMenu
                                                title={"linea de investigacion"}
                                                body={`¿Está seguro que quiere eliminar el estado "${lineaInvestigacion}"?. Le recordamos que esta acción no se puede deshacer`}
                                                onDelAction={() => delLinea(codigo)}
                                            >
                                                <EditarLinea
                                                linea={row}                                                
                                                reset={reset}
                                                />
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