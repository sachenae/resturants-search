import React, { Component } from 'react';
import MyMap from '../layout/MyMap';
import MapStreetView from '../layout/MapStreetView';


class Home extends React.PureComponent {

    componentWillMount() {
        this.setState({ markers: [] })
      }
    
      componentDidMount() {
        const url = './src/resturants.json'
    
        fetch(url)
          .then(res => res.json())
          .then(data => {
            this.setState({ markers: data });
            console.log(JSON.stringify(data));
          });
          
      }

    render(){
        return(
            
                <div className="row" class="m-auto">
                 <div className="col-md-8">
                <MyMap 
                markers={this.state.markers}
               />
               </div>
            <div className="col-md-4"> 
               <MapStreetView 
                markers={this.state.markers}
               />
                </div>
               <h5>  Zoom and scroll the map to discover the resturants, </h5>
               <h5>  The cluster number represents the number of resutrant in that area, click to see more</h5>
               <h5>  The markers show the information of resturant when clicked</h5>
            </div>
        );
    }
}

export default Home;