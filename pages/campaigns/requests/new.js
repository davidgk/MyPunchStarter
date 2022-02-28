import {Component} from "react";
import Layout from "../../../components/Layout";
import ethereumService from "../../../services/EthereumService";
import {Router, Link} from "../../../routes";
import {Button, Container, Form, Input, Label, Message} from "semantic-ui-react";
import EthereumService from "../../../services/EthereumService";


class RequestNew extends Component {
    state = {
        requestValue: '',
        description: '',
        recipient: '',
        errorMessage: ""
    }

    static async getInitialProps(props){
        const address = props.query.address;
        return {address};
    }

    constructor(props) {
        super(props);
    }

    onSubmit = async(event) => {
        event.preventDefault();
        debugger
        this.setState({loading: true})
        try {
            this.setState({errorMessage: ''})
            let requestValue = Number(this.state.requestValue);
            let recipient = this.state.recipient;
            let description = this.state.description;
            await ethereumService.createRequest(this.props.address, description, requestValue, recipient);
            this.setState({description: '', requestValue: '', recipient: ''})
            await Router.pushRoute(`/campaigns/${this.props.address}`)
        } catch (e) {
            this.setState({errorMessage: e.message})
        }
        this.setState({loading: false})
    }

    render () {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    Back
                </Link>
                <h4>Create a Request</h4>
                <Container>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <Label>Description</Label>
                            <Input
                                value = {this.state.description}
                                onChange={event => this.setState({description: event.target.value})}
                                placeholder='Add a request description' />
                        </Form.Field>
                        <Form.Field>
                            <Label>Amount in Ether</Label>
                            <Input
                                type="number"
                                value = {this.state.requestValue}
                                label="wei"
                                labelPosition="right"
                                onChange={event => this.setState({requestValue: event.target.value})}
                                placeholder='value to support this recipient' />
                        </Form.Field>
                        <Form.Field>
                            <Label>Recipient</Label>
                            <Input
                                value = {this.state.recipient}
                                labelPosition="right"
                                onChange={event => this.setState({recipient: event.target.value})}
                                placeholder='Who will be the recipient' />
                        </Form.Field>
                        <Message
                            error
                            header="Ooops!"
                            content= {this.state.errorMessage}
                        />
                        <Button loading={this.state.loading} primary type='submit'>Create</Button>
                    </Form>
                </Container>
            </Layout>
        );
    }
}

export default RequestNew;