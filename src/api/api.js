import axios from 'axios'

const apiToken = "";

export async function fetchBrands(){
   console.log('calling api');
   const {data} = await axios.get('http://localhost:3001/common/brands/');
   return data.Results;
}

export async function fetchWebPages(brandId){
  console.log(brandId+" brandid")
  const {data} = await axios.get('http://localhost:3001/web/pages/?brand='+brandId);
  return data.Results;
}

export async function fetchWebPagesFilteredByCampaign(brandId,campaignId){
  const {data} = await axios.get('http://localhost:3001/web/pages/?brand='+brandId+'&campaign='+campaignId);
  return data.Results;
}

export async function fetchCampaigns(brandId){
  console.log(brandId+"brandId");
  const {data} = await axios.get('http://localhost:3001/common/campaigns/?brand='+brandId);
  return data.Results;
}