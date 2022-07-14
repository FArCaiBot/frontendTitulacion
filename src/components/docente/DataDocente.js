import { Card, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import { filter, size } from "lodash";
import { useState } from "react";
import PropTypes from "prop-types";
import { UserListHead, UserListToolbar, UserMoreMenu } from "../../sections/@dashboard/table";
import Label from "../Label";
import Scrollbar from "../Scrollbar";
import SearchNotFound from "../SearchNotFound";


const TABLE_HEAD = [
    { id: 'idUsuario', label: 'ID', alignRight: false },
    { id: 'cedulaUsuario', label: 'Cédula', alignRight: false },
    { id: 'nombres', label: 'Nombres', alignRight: false },
    { id: 'apellidos', label: 'Apellidos', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'roles', label: 'Roles', alignRight: false },
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
        return filter(array, (_user) => `${_user.nombres + _user.apellidos}`.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

DataDocente.propTypes = {
    data: PropTypes.array,
    delDocente: PropTypes.func,
    reset: PropTypes.func
}


export default function DataDocente({ data = [], delDocente, reset }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [filterName, setFilterName] = useState('');

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('idUsuario');


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
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} criteria="docente" />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { idUsuario, cedulaUsuario, nombres, apellidos, email, roles } = row;

                                return (
                                    <TableRow
                                        hover
                                        key={idUsuario}
                                        tabIndex={-1}
                                        role="checkbox"
                                    >
                                        <TableCell component="th" scope="row" padding="normal">
                                            {idUsuario}
                                        </TableCell>
                                        <TableCell align="left">{cedulaUsuario}</TableCell>
                                        <TableCell align="left">{nombres}</TableCell>
                                        <TableCell align="left">{apellidos}</TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">
                                            <Stack spacing={1} direction={{ xs: 'row' }}>
                                                {roles.map((rol) =>
                                                    <Label key={rol.index} variant="ghost"
                                                        color={
                                                            (rol === 'ROLE_ADMIN' && 'error') || (rol === 'ROLE_MIEMBRO' && 'secondary') || 'success'}>
                                                        {rol.replace("ROLE_", "")}
                                                    </Label>

                                                )}
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">
                                            <UserMoreMenu
                                                title={"docente"}
                                                body={`¿Está seguro que quiere eliminar al docente "${nombres} ${apellidos}"?. Le recordamos que esta acción no se puede deshacer`}
                                                onDelAction={() => delDocente(idUsuario)}
                                            />

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
                        {isUserNotFound && size(data)>0 && (
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
    );
}