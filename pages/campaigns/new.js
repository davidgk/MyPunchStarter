import Layout from "../../components/Layout";
import {Button, Form, Input, Message} from "semantic-ui-react";
import ethereumService from "../../services/EthereumService";

const {Component} = require("react");


class CampaignNew extends Component {
    state= {
        minimumContribution: '',
        errorMessage: '',
        loading: false,
    }


    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({loading: true})
        try {
            this.setState({errorMessage: ''})
            await ethereumService.createCampaign(Number(this.state.minimumContribution));
        } catch (e) {
            this.setState({errorMessage: e.message})
        }
        this.setState({loading: false})
    };
    render() {
        return (
            <Layout>
                <div>
                    <h3>Create a new Campaign!</h3>
                </div>
                <Form style={{marginTop: "20px"}} onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimun Contribution</label>
                        <Input
                            type="number"
                            value = {this.state.minimumContribution}
                            label="wei"
                            labelPosition="right"
                            onChange={event => this.setState({minimumContribution: event.target.value})}
                            placeholder='Will be the minimum value to be your project supporters' />
                    </Form.Field>
                    <Message
                        error
                        header="Ooops!"
                        content= {this.state.errorMessage}
                    />
                    <Button loading={this.state.loading} primary type='submit'>Submit</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;