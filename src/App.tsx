import React, { Component } from 'react';
import './App.css';
import {Row,Col} from 'antd';
import WeatherApps from './WeatherApps';


export default class App extends Component {
  state = { id: "jp" , weatherD:[]};

  //fetches once on load
  componentDidMount(){
    this.fetchData();
  }

 //fetches when state variable id has changed on click to 
 //grab the updated data
  componentDidUpdate(prevProps:any, prevState:any){
    if (prevState.id !== this.state.id) {
        this.fetchData();
      }
  }

  //update the CSS property of the title
  updateCSSTitleNewClass=(ele:string)=>{
    const elem= document.getElementById(ele);
        if(elem)
          elem.className= "newclass";
  }

  updateCSSTitleOldClass=(ele:string)=>{
    const elem= document.getElementById(ele);
        if(elem)
          elem.className= "hov";
  }

   //click event for the city when selected 
  click=(event: React.MouseEvent<HTMLLabelElement, MouseEvent>)=>{
    const id_= (event.target as HTMLElement).id;
    //if one clicks on the same data again return
    if(id_ === this.state.id)return;
    console.log("The index you clicked on is ",id_);
    //update the state of id
    this.setState(state=>({
      id:id_
    }));
  }

  //fetch data function
  //based on the index selected it grabs the correct data from the API
  //API is from Rapid API called visual-crossing-weather it has hard limit of 500 requests/ month or else one has to pay
  fetchData(){
    const id = this.state.id;
    let loc="Tokyo,Japan";
    
    if(id ==="jp"){
       //store the location per id chosen
        loc="Tokyo,Japan";
        //adjust the city being selected (for the css make it darker etc)
        this.updateCSSTitleNewClass('jp');
        this.updateCSSTitleOldClass('can');
        this.updateCSSTitleOldClass('italy');       
    }
    else if (id ==="can"){
        loc="Vancouver,BC,Canada";
        this.updateCSSTitleNewClass('can');
        this.updateCSSTitleOldClass('jp');
        this.updateCSSTitleOldClass('italy');
    }else if (id ==="italy"){
        loc="Venice,Veneto,Italy";
        this.updateCSSTitleNewClass('italy');
        this.updateCSSTitleOldClass('can');
        this.updateCSSTitleOldClass('jp');
    }
  console.log("The city selected is:",loc);

  //make a fetch request with the request options to fetch the data 
  //update the state of weather data that is retrieved on click
  const requestOptions = {
        method: 'GET',
        headers: { 
        'X-RapidAPI-Key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280',
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
     },
      
    };
    fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${loc}&contentType=json&unitGroup=us&shortColumnNames=0`, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ weatherD: data?.locations?.[loc]?.values?.filter((dat:any)=> (new Date(dat.datetimeStr)).getTime() >= (new Date()).getTime()).sort((a:any,b:any) => b-a).slice(0,5)})).catch((error) => {
          console.log(error)
        });
 
  console.log("The Data (prev state:)",this.state.weatherD);
}

  render() {
    //uses the library antd for React to format the grid
    return (
      <>
      <div className='all'>
            <div className='all'>
                <Row>
                    <Col  xs={24} sm={8} md={8} lg={8} xl={8}><div className='lab'><label className='hov' id = "jp" onClick={this.click}>TOKYO</label></div></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}><div className='lab'><label  className='hov' id = "can" onClick={this.click}>VANCOUVER</label></div></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}><div className='lab'><label  className='hov' id = "italy" onClick={this.click}>VENICE</label></div></Col>
                </Row>
            </div>
          <WeatherApps id = {this.state.id} weatherD={this.state.weatherD}/>
      </div>
      </>
    )
  }
}
