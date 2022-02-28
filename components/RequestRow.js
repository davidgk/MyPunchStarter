import {Component} from "react";
import {Button, Table, TableCell, TableRow} from "semantic-ui-react";
import EthereumService from "../services/EthereumService";
import {Router} from "../routes";
import ethereumService from "../services/EthereumService";


class RequestRow extends Component {

    state = {
        errorMessage: "",
        loading: false
    }
    constructor(props) {
        super(props);
    }


    onFinalize = async () => {
        this.setState({loading: true})
        debugger;
        try {
            this.setState({errorMessage: ''})
            await EthereumService.finalizeRequest(this.props.order-1, this.props.address )
            await Router.pushRoute(`/campaigns/${props.address}/requests`)
        } catch (e) {
            this.setState({errorMessage: e.message})
        }
        this.setState({loading: false})
    };

    onApprove = async () => {
        this.setState({loading: true})
        debugger;
        try {
            this.setState({errorMessage: ''})
            await EthereumService.approveRequest(this.props.order-1, this.props.address )
            await Router.pushRoute(`/campaigns/${props.address}/requests`)
        } catch (e) {
            this.setState({errorMessage: e.message})
        }
        this.setState({loading: false})

    };

    render () {
        return (
            <TableRow>
                <TableCell>{this.props.order}</TableCell>
                <TableCell>{this.props.request.description}</TableCell>
                <TableCell>{this.props.request.value}</TableCell>
                <TableCell>{this.props.request.recipient}</TableCell>
                <TableCell>{this.props.request.approvalCount}/{this.props.approversCount}</TableCell>
                <TableCell >
                    <Button loading={this.state.loading} onClick={this.onApprove} color="green" basic>Approve</Button>
                </TableCell>
                <TableCell >
                    <Button loading={this.state.loading} onClick={this.onFinalize} color="red" basic>Finalize</Button>
                </TableCell>
            </TableRow>
        )
    }

}

export default RequestRow;