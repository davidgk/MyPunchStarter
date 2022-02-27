import {Component} from "react";
import Layout from "../../components/Layout";
import ContributionForm from "../../components/ContributionForm";
import EthereumService from "../../services/EthereumService";
import {Button, CardGroup, Container} from "semantic-ui-react";
import web3 from "../../ethereum/config/web3";
import {Router} from "../../routes";


class CampaignShow extends Component {
    static async getInitialProps(props){
        const campaignAddress = props.query.address;
        const campaignSummary = await EthereumService.getContractSummary(campaignAddress);
        return {campaignAddress, campaignSummary};
    }

    renderCards() {
        const items = [
            {
                header: this.props.campaignSummary.minContribution,
                description: "To be a contributor, this is the minimum amount of Wei to participate",
                meta: "Minimum Contribution (Wei) "
            },
            {
                header: this.props.campaignSummary.contributors,
                description: "Amount of contributors which have been donated to the cause",
                meta: "Contributors"
            },
            {
                header: this.props.campaignSummary.pendingRequest,
                description: "The amount of authorizations the owner request for spending",
                meta: "Pending Request"
            },
            {
                header: web3.utils.fromWei(String(this.props.campaignSummary.balance || 0), 'ether') ,
                description: "How many Wei this Campaign has been collected up to now.",
                meta: "Campaign Balance (Ether)"
            }
        ];
        return <CardGroup items={items} itemsPerRow="2"/>
    }


    viewRequest = async () => {
        await Router.pushRoute(`/campaigns/${this.props.campaignAddress}/requests`)
    }


    render () {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <div style={{display: "flex"}}>
                    <Container style={{ width:"60%"}}>
                        {this.renderCards()}
                        <div style={{marginTop: "15px"}}>
                            <Button
                                onClick={this.viewRequest}
                                primary >
                                View Request
                            </Button>
                        </div>
                    </Container>
                    <Container style={{ width:"40%", paddingLeft: "20px"}}>
                        <ContributionForm address={this.props.campaignAddress} minContribution={this.props.campaignSummary.minContribution}/>
                    </Container>
                </div>
            </Layout>
        );
    }
}

export default CampaignShow;