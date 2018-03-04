import axios from 'axios'

const apiToken = "";

/**
  all brands fecther from api
**/
export async function fetchBrands(){
   console.log('calling api');
   const {data} = await axios.get('http://localhost:3001/common/brands/');
   return data.Results;
}
/**
  webpages fetcher by brandId
**/
export async function fetchWebPages(brandId){
  console.log(brandId+" brandid")
  const {data} = await axios.get('http://localhost:3001/web/pages/?brand='+brandId);
  const ids = data.Results.map(d => d.Id);
   const promises = ids.map(id => axios.get('http://localhost:3001/web/pages/'+id+'/'));
   return axios.all(promises).then((responses)=> {
       return responses.map(response =>({ ...response.data.Results[0],LastScored :
          response.data.Results[0].LastScored ? response.data.Results[0].LastScored : "LastScored N/A" }));
   });
}
/**
  webpages fetcher by brandId and campaignId
**/
export async function fetchWebPagesFilteredByCampaign(brandId,campaignId){
  const {data} = await axios.get('http://localhost:3001/web/pages/?brand='+brandId+'&campaign='+campaignId);
  const ids = data.Results.map(d => d.Id);
   const promises = ids.map(id => axios.get('http://localhost:3001/web/pages/'+id+'/'));
   return axios.all(promises).then((responses)=> {
       return responses.map(response =>({ ...response.data.Results[0],LastScored :
          response.data.Results[0].LastScored ? response.data.Results[0].LastScored : "LastScored N/A" }));
   });
}
/**
  campaigns fetcher by brandId
**/
export async function fetchCampaigns(brandId){
  console.log(brandId+"brandId");
  const {data} = await axios.get('http://localhost:3001/common/campaigns/?brand='+brandId);
  return data.Results;
}

/**
fetch webpage by webpage id
**/
export async function fetchWebPage(webpageId){
   const {data} = await axios.get('http://localhost:3001/web/pages/'+webpageId);
   return data.Results[0];
 }