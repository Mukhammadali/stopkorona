const axios = require('axios');
const fetchCountryTotal = require();

const axiosInstance = Axios.create({
  baseURL: 'https://corona.lmao.ninja'
})


const fetchCountryTotal = ({ countryName }) =>
  axiosInstance.get(`/countries/${countryName}`).then(res => res.data)

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, boundActionCreators }) => {
  const { createNode } = actions;

  // fetch raw data from the randomuser api
  const fetchRandomUser = () => ;
  // await for results
  const res = await fetchCountryTotal({countryName: 'Uzbekistan'});

  if(res.data) {
    const data = res.data;
    // map into these results and create nodes
      // Create your node object
      const countryNode = {
        // Required fields
        id: createNodeId(data.country),
        parent: `__SOURCE__`,
        internal: {
          type: `Uzbekistan`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
          contentDigest: createContentDigest(myData),
        },
        children: [],
  
        // Other fields that you want to query with graphQl
        ...data
        // etc...
      }
  
      // Create node with the gatsby createNode() API
      createNode(countryNode);
  }
  return;
}