import React, { Component } from 'react';
import * as api from '../api/api';
class Main extends Component {
  getInitialState() {return {
    brands : [],
    webpages : [],
    campaigns : []
  }
}
  constructor(){
      super();
      this.state  = {
        brands : [],
        webpages : [],
        campaigns : [],
        currentBrand  : ''
      }
      this.fetchBrands();
  }
  onBrandSelectChange(event){
    console.log(event.target.value);
    const brandId = event.target.value;
      this.fetchCampaigns(event.target.value);
    api.fetchWebPages(event.target.value).then((res)=>{
      console.log(res);
      this.setState({brands : this.state.brands, webpages : res,currentBrand : brandId });
    })
  }

  onCampaignSelectChange(event){

      api.fetchWebPagesFilteredByCampaign(this.state.currentBrand,event.target.value)
      .then((res)=>{
        this.setState({brands : this.state.brands, webpages :res,currentBrand : this.state.currentBrand ,campaigns :this.state.campaigns})
      })
  }

  fetchCampaigns(brandId){
      console.log(brandId);
      api.fetchCampaigns(brandId).then((res)=>{
      console.log(res);
      this.setState({brands : this.state.brands, webpages : this.state.webpages, campaigns : res,currentBrand : this.state.currentBrand});
    })
  }

  fetchBrands(){
    api.fetchBrands().then((res)=>{
      console.log(res);
      this.setState({brands : res});
    })
  }

  render() {
    return (
      <div>
        <div>
          <select onChange={this.onBrandSelectChange.bind(this)}>
            {
              this.state.brands.map(el => {return <option key={el.Id} value={el.Id}>{el.Name}</option> })
            }
          </select>
          <select onChange={this.onCampaignSelectChange.bind(this)}>
          {
            this.state.campaigns.map(el => {return <option key={el.Id} value={el.Id}>{el.Name}</option> })
          }
          </select>
        </div>
          <ul>
            {
              !this.state.webpages || !this.state.webpages.length
              ?  <p>No data</p>
              : this.state.webpages.map(el => {return <li key={el.Id}>{el.Url}</li>})
            }
          </ul>
      </div>
    );
  }
}

export default Main;