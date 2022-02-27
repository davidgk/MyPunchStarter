import {Component} from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/config/factory";
import EthereumService from "../../services/EthereumService";


class CampaignShow extends Component {


    // static async getInitialProps(){
    //     //const campaignSummary = await EthereumService.getContractSummary();
    //     return {};
    // }

    render () {
        return (
            <Layout>
                <h2>Show!</h2>
            </Layout>
            );
    }
}

export default CampaignShow;