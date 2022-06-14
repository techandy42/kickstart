import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import Layout from '../components/Layout'
import { Link } from '../routes'

class CampaignIndex extends Component {
  // class method
  // server-side rendering
  // load the data before javascript is executed
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    return { campaigns }
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      }
    })

    return <Card.Group items={items} />
  }

  // primary is same as primary={true}
  render() {
    return (
      <Layout>
        <h3>Open Camapaigns</h3>
        <Link route='/campaigns/new'>
          <a>
            <Button
              floated='right'
              content='Create Campaign'
              icon='add circle'
              primary
            />
          </a>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default CampaignIndex
