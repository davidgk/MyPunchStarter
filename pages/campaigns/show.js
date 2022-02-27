import {Component} from "react";
import Layout from "../../components/Layout";
import EthereumService from "../../services/EthereumService";


class CampaignShow extends Component {
    static async getInitialProps(props){
        const campaignAddress = props.query.address;
        const campaignSummary = await EthereumService.getContractSummary(campaignAddress);
        return {campaignSummary};
    }

    render () {
        return (
            <Layout>
                <h2>minContribution: {this.props.campaignSummary.minContribution}</h2>
                <br/>
                <h2>contributors: {this.props.campaignSummary.contributors}</h2>
                <br/>
                <h2>pendingRequest: {this.props.campaignSummary.pendingRequest}</h2>
                <br/>
                <h2>balance: {this.props.campaignSummary.balance}</h2>
                <br/>
            </Layout>
        );
    }
}

export default CampaignShow;