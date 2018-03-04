import React, { Component } from 'react';
import * as api from '../api/api';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

renderOptions(arr){
     return arr.map(el => <option key={el.Id} value={el.Id}>{el.Name}</option>)
   }


  render() {
    return (
      <div>
          <select onChange={this.onBrandSelectChange.bind(this)}>
            {
              this.renderOptions(this.state.brands)
            }
          </select>
          <select onChange={this.onCampaignSelectChange.bind(this)}>
          {
            this.renderOptions(this.state.campaigns)
          }
          </select>
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
            /> 
      </div>
    );
  }
}

export default Main;