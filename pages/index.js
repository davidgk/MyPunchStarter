import factory from "../ethereum/config/factory";
import {Component} from "react";


class CampaignIndex extends Component {

    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }

    constructor(props) {
        super(props);

    }

    render() {

        const comp = (idx) => <div>
            {this.props.campaigns[idx]}
        </div>;

        return (
            <div>
                {comp(0)}
                {comp(1)}
            </div>
        );
    }
}

export default CampaignIndex;