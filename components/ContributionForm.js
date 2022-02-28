import {Component} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import ethereumService from "../services/EthereumService";
import {Router} from "../routes";



class ContributionForm extends Component {
    state = {
        minimumContribution: '',
        errorMessage: ""
    }

    constructor(props) {
        super(props);
    }

    onSubmit = async(event) => {
        event.preventDefault();
        this.setState({loading: true})
        try {
            this.setState({errorMessage: ''})
            let contribution = Number(this.state.minimumContribution);
            if (contribution < Number(this.props.minContribution)) throw new Error("Contribution should be over than " + this.props.minContribution  )
            await ethereumService.createContributor(this.props.address, contribution);
            this.setState({minimumContribution: ''})
            await Router.pushRoute(`/campaigns/${this.props.address}`)
        } catch (e) {
            this.setState({errorMessage: e.message})
        }
        this.setState({loading: false})
    }

    render () {
        return (
            <div>
                <h4> Contribute to this Campaign </h4>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <Input
                            type="number"
                            value = {this.state.minimumContribution}
                            label="wei"
                            labelPosition="right"
                            onChange={event => this.setState({minimumContribution: event.target.value})}
                            placeholder='Will be the minimum value to be project support' />
                    </Form.Field>
                    <Message
                        error
                        header="Ooops!"
                        content= {this.state.errorMessage}
                    />
                    <Button loading={this.state.loading} primary type='submit'>Contribute!</Button>
                </Form>
            </div>
        );
    }
}

module.exports = ContributionForm