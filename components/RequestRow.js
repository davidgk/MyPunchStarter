import {Component} from "react";
import {Table, TableCell, TableRow} from "semantic-ui-react";


const RequestRow = (props) => {
    const request = props.request
    const order = props.order
    return (
        <TableRow>
            <TableCell>{order}</TableCell>
            <TableCell>{request.description}</TableCell>
            <TableCell>{request.value}</TableCell>
            <TableCell>{request.recipient}</TableCell>
            <TableCell>{request.approvalCount}</TableCell>
            <TableCell >
                Green
            </TableCell>
            <TableCell >
                Red
            </TableCell>
        </TableRow>
    )

}

export default RequestRow;