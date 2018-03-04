import React, { Component } from 'react';
import * as api from '../api/api';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SelectArea from './selectarea.js';


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
        currentBrand  : '',
        loading : false
      }
      this.fetchBrands();
  }
  onBrandSelectChange(event,index,value){
    this.state.loading = true;
    const brandId = value;
      this.fetchCampaigns(value);
    api.fetchWebPages(value).then((res)=>{
  
      this.setState({brands : this.state.brands, webpages : res,currentBrand : brandId,loading :false });
    })
  }

  onCampaignSelectChange(event,index,value){
      api.fetchWebPagesFilteredByCampaign(this.state.currentBrand,value)
      .then((res)=>{
        this.setState({brands : this.state.brands, webpages :res,currentBrand : this.state.currentBrand ,
          campaigns :this.state.campaigns,currentCampaign : value})
      })
  }

  fetchCampaigns(brandId){
  
      api.fetchCampaigns(brandId).then((res)=>{
      console.log(res);
      this.setState({brands : this.state.brands, webpages : this.state.webpages, campaigns : res,currentBrand : this.state.currentBrand});
    })
  }

  fetchBrands(){
    api.fetchBrands().then((res)=>{
      this.setState({brands : res});
    })
  }

renderOptions(arr){
     return arr.map(el => <option key={el.Id} value={el.Id}>{el.Name}</option>)
   }


  render() {
    return (
      <div>
          <SelectArea brands={this.state.brands} currentBrand={this.state.currentBrand} 
          currentCampaign={this.state.currentCampaign} campaigns={this.state.campaigns} 
          onBrandSelectChange={this.onBrandSelectChange.bind(this)} 
          onCampaignSelectChange={this.onCampaignSelectChange.bind(this)} />
          
          <ReactTable 
            noDataText="No Web Pages to show, select a different brand or campaign"
            data={this.state.webpages}
            columns={[
                {
                  Header : "Id",accessor : "Id"
                },
                {
                  Header: "URL", accessor : "Url"
                },
                {
                  Header: "Score", accessor: "Score"
                },
                {
                  Header:"Last Scored Date", accessor:"LastScored"
                }
              ]}
            defaultPageSize={17}
            className="-striped -highlight" 
            loading={this.state.loading}
            /> 
      </div>
    );
  }
}

export default Main;