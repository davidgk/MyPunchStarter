import {Component} from "react";
import Layout from "./Layout";
import {Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import RequestRow from "./RequestRow";


class RequestTable extends Component {

    constructor(props) {
        super(props);
    }

    renderTableRows = () => {
        return this.props.requests.map((req, index) => {
            return <RequestRow
                request={req} key={index}
                order={index+1}
                address={this.props.address}
                approversCount={this.props.approversCount}/>
        })
    }


    render() {
        return (
            <div style={{paddingTop: "15px",  paddingBottom: "15px"}}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Amount</TableHeaderCell>
                            <TableHeaderCell>Recipient</TableHeaderCell>
                            <TableHeaderCell>Approval Count</TableHeaderCell>
                            <TableHeaderCell>Approve</TableHeaderCell>
                            <TableHeaderCell>Finalize</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.renderTableRows()}
                    </TableBody>

                </Table>
            </div>

        );
    }
}

export default RequestTable;