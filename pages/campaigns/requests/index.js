import {Component} from "react";
import Layout from "../../../components/Layout";
import {Button, Container, Grid, GridColumn, GridRow} from "semantic-ui-react";
import {Router, Link} from "../../../routes";
import EthereumService from "../../../services/EthereumService";
import RequestTable from "../../../components/RequestTable";


class CampaignRequest extends Component {

    static async getInitialProps(props){
        let { address } = props.query;
        let requests = []
        let approversCount = 0
        const {requestCount, campaign} = await EthereumService.getRequestCount(address);
        if(requestCount> 0) {
            requests = await EthereumService.getAllRequest(address, campaign, requestCount);
            approversCount = await EthereumService.getApproversCount(address, campaign);
        }
        return {address, requestCount, requests, approversCount};
    }

    addRequest = async () => {
        await Router.pushRoute(`/campaigns/${this.props.address}/requests/new`)
    }

    render() {
        return (
          <Layout>
              <Link route={`/campaigns/${this.props.address}`}>
                  Back
              </Link>
              <Container>
                  <h3>Requests</h3>
                  <Button
                      onClick={this.addRequest}
                      floated="right"
                      style={{marginBottom: "20px"}}
                      primary >
                      Add Request
                  </Button>

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
                <RequestTable
                    requests={this.props.requests}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            )
        } else {
            return (<div style={{margin: "30px"}}>
                <h3>No request for this contract. </h3>
            </div>
            );
        }
    }
}

export default CampaignRequest;