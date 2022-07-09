import { Card, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { filter } from "lodash";
import { UserListHead, UserListToolbar, UserMoreMenu } from "../../sections/@dashboard/table";
import Scrollbar from "../Scrollbar";
import SearchNotFound from "../SearchNotFound";
import EditarPeriodo from "./EditPeriod/EditPeriod";



const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'anio', label: 'Año', alignRight: false },
    { id: 'fechaInicio', label: 'Fecha Inicio', alignRight: false },
    { id: 'fechaFin', label: 'Fecha Fin', alignRight: false },
    { id: 'descripcionPeriodo', label: 'Descripción', alignRight: false },
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

DataPeriodo.propTypes = {
    data: PropTypes.object,
    delPeriodo: PropTypes.func,
    reset: PropTypes.func
}

export default function DataPeriodo({ data, delPeriodo, reset }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [filterName, setFilterName] = useState('');

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('id');


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
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} criteria="periodo" />
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
                                const { id, anio, fechaInicio, fechaFin, descripcionPeriodo } = row;

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
                                        <TableCell align="left">{anio}</TableCell>
                                        <TableCell align="left">{fechaInicio}</TableCell>
                                        <TableCell align="left">{fechaFin}</TableCell>
                                        <TableCell align="left">{descripcionPeriodo}</TableCell>
                                        <TableCell align="left">
                                            <UserMoreMenu
                                                title={"periodo académico"}
                                                body={`¿Está seguro que quiere eliminar el periodo "${descripcionPeriodo}"?. Le recordamos que esta acción no se puede deshacer`}
                                                onDelAction={() => delPeriodo(id)}
                                            >
                                                <EditarPeriodo
                                                id={id}
                                                period={row}
                                                reset={reset}
                                                />
                                            </UserMoreMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {isUserNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filterName} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Scrollbar>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}