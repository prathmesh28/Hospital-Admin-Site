import  React from "react";
import Header from '../Dashboard/Header'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardGroup
   
  } from '@coreui/react'
  import {
    CChartBar,
  } from '@coreui/react-chartjs'

  import Firebase from '../../firebase'
  import _ from 'lodash';
export default class Data extends React.Component{
    state = { 
        data:null,
        loading:false,
    
      }
    componentDidMount(){
        this.setState({loading:true})
    
        Firebase.database().ref('/Users/').on("value",(item) => {
             // console.log(item.val())
              const users = _.map( item.val(), (e) => {
               // return e.data 
                console.log(e.data.Date)
              })
              
              this.setState({ data:users})
            })
    
            setTimeout(() => {
              this.setState({loading:false})
             }, 3000);
      }
    
    render(){
        return(
            <>
            <Header/>
            <CCardGroup columns className = "cols-2" >
                    <CCard>
                <CCardHeader>
                Bar Chart
                <div className="card-header-actions">
                    <small className="text-muted">docs</small>
                 
                </div>
                </CCardHeader>
                <CCardBody>
                <CChartBar
                    type="bar"
                    datasets={[
                    {
                        label: 'No. of users',
                        backgroundColor: '#3399ff',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    }
                    ]}
                    labels="months"
                    options={{
                    tooltips: {
                        enabled: true
                    }
                    }}
                />
                </CCardBody>
            </CCard>

         </CCardGroup>
         
            </>
        )
    }
}