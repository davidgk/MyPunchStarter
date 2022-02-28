import {Component} from "react";
import Layout from "../../../components/Layout";
import {Button, Container, Grid, GridColumn, GridRow} from "semantic-ui-react";
import {Router} from "../../../routes";
import EthereumService from "../../../services/EthereumService";
import RequestTable from "../../../components/RequestTable";


class CampaignRequest extends Component {

    static async getInitialProps(props){
        let { address } = props.query;
        const requestCount = await EthereumService.getRequestCount(address);
        return {address, requestCount};
    }

    addRequest = async () => {
        await Router.pushRoute(`/campaigns/${this.props.address}/requests/new`)
    }

    render() {
        return (
          <Layout>
              <Container>
                  <Grid columns={2} divided>
                       <GridRow>
                           <GridColumn>
                               <h3>Requests</h3>
                           </GridColumn>
                           <GridColumn>
                               <Button
                                   onClick={this.addRequest}
                                   primary >
                                   Add Request
                               </Button>
                           </GridColumn>
                       </GridRow>
                  </Grid>
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
        } else {
            return (<div style={{margin: "30px"}}>
                <h3>No request for this contract. </h3>
            </div>
            );
        }
    }
}

export default CampaignRequest;