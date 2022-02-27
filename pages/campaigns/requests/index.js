import {Component} from "react";
import Layout from "../../../components/Layout";
import {Button, Container} from "semantic-ui-react";
import {Router} from "../../../routes";
import EthereumService from "../../../services/EthereumService";
import RequestTable from "../../../components/RequestTable";


class CampaignRequest extends Component {

    static async getInitialProps(props){
        const requestCount = await EthereumService.getRequestCount(props.query.address);
        return {address: props.query.address, requestCount};
    }

    addRequest = async () => {
        await Router.pushRoute(`/campaigns/${this.props.address}/requests/new`)
    }

    render() {
        return (
          <Layout>
              <Container>
                  <Container>
                      <div style={{display:"flex"}}>
                          <h3>Requests</h3>
                          <Button
                              onClick={this.addRequest}
                              primary >
                              Add Request
                          </Button>
                      </div>
                  </Container>
              </Container>
              <Container>
                  { this.renderRequestTable() }
              </Container>
              <Container>
                  <h3>Found {this.props.requestCount || 0} Request</h3>
              </Container>

          </Layout>
        );
    }

    renderRequestTable = () =>  {
        if(this.props.requestCount > 0) {
            return (
                <RequestTable/>
            )
        }
    }
}

export default CampaignRequest;