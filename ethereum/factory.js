import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCFf1a4eBDc85006326DEBDe9940ACE64a9997b89',
)

export default instance
