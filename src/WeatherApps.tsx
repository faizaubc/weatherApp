import React, { Component } from 'react'
import {Row,Col} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faCloudSun, faCloudRain} from '@fortawesome/free-solid-svg-icons';

//declare the props being passed
type QuoteProps = {
    id: string;
    weatherD:[];
}


export default class WeatherApps extends Component<{id:any,weatherD:any} , QuoteProps> {

//converts the API temp data to the proper format
toCelsius(fahrenheit: any) {
        if(fahrenheit ===undefined) return 0;
        return (fahrenheit - 32) * 5 / 9;
}

RenderTheSymbol=(data:any)=>{
    if(data=== undefined) return "";

    const matchdata= data?.split(',')[0].toLowerCase();   
    if(matchdata.match("rain"))
       return <FontAwesomeIcon icon={faCloudRain}></FontAwesomeIcon>;
    else if (matchdata.match("clear"))
        return <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>;
    else if (matchdata.match("overcast"))
        return <FontAwesomeIcon icon={faCloud}></FontAwesomeIcon>;
    else if (matchdata.match("partially"))
        return <FontAwesomeIcon icon={faCloudSun}></FontAwesomeIcon>;
    else{
        return <FontAwesomeIcon icon={faCloudSun}></FontAwesomeIcon>;
    }
}

  render() {
    const data = this.props.weatherD;
    const datarecord = data?.splice(1,5);
    const weekday= ['Mon', 'Tues', 'Wed', 'Thurs', 'Sat', 'Sun'];
    console.log("The Data to be used for the top grid",data);
    console.log("The Data for the rest 4 bottom grid",datarecord);

    //The data from the api has temp in farenheit to we convert it 
    //The symbols are based on the "condions" in the api call. 
    //Then we render a symbol if the string has the condition value or else it goes to the next condition (there are 4)
    //The html is wrapped in div with flex css properties + to make it dynamic the antd library Col, Row are used
    //It is responsive as it adjusts well to screens size changes 
    if(data===undefined) return "Loading...!";
    return (
      <>
      <div className='contain'>
      <div className='wrapper'>
       <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='co'>
            <div>
                Today
            </div>
            <div className='div1'>
            <div>
                <div className='largeicon'>{this.RenderTheSymbol(data[0]?.conditions) } </div>
            </div>
             <div>
                <div className='largeicon'> {(this.toCelsius(data[0]?.temp)).toFixed(0)}°</div>
                {data[0]?.conditions}
            </div>
            </div>
        </div>   
        </Col>
       </Row>
       <Row>
   
          {datarecord.map((record:any,i:any) => (

            <Col xs={24} sm={6} md={6} lg={6} xl={6} key={i} > 
            <div className='co'>
            <div> {weekday[((new Date(record?.datetimeStr)).getDay())]}</div>
                      
            <div className='icon'>{this.RenderTheSymbol(record?.conditions)} </div>

            <div > {(this.toCelsius(record?.temp)).toFixed(0)}°</div>
            </div>          
            </Col>

          ))} 
       </Row>
       </div>
       </div>
      </>
    )
  }
}
