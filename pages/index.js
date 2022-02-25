import factory from "../ethereum/config/factory";
import {Component} from "react";
import {Button, Card, Container, Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/Layout";


class CampaignIndex extends Component {

    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }

    constructor(props) {
        super(props);
        const formattedCampaigns = this.props.campaigns.map((address) => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        })
        this.state = {campaigns: formattedCampaigns}
    }

    render() {
        return (
            <Layout>
                <div style={{display:"flex"}}>
                    <Container style={{ width:"80%"}}>
                        <h3>Open Campaigns</h3>
                        <Card.Group items={this.state.campaigns} />
                    </Container>
                    <Container style={{ width:"20%" }}>
                        <Button
                            floated="right"
                            content="Create Campaign"
                            icon="add circle"
                            primary
                        />
                    </Container>
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;