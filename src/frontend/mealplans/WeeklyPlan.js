import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,CardDeck,Modal,Button,ListGroup,Table,ListGroupItem,Spinner} from 'react-bootstrap'
import '../recipes/components/NewRecipe.css'
import DailyPlan2 from './DailyPlan2'
import DailyPlan from './DailyPlan'

const  WeeklyPlan = props => {

    const [myData,setMyData] = useState()
    
    useEffect(()=>{
        if(props.week !== true){
            const chunkArray = (myArr,chunkSize) =>{
                let index = 0
                const arrayLength = myArr.length;
                const tempArray = [];
               for( index=0;index<arrayLength;index +=chunkSize){
                  let myChunk = myArr.slice(index, index+chunkSize)
                  // Do something if you want with the group
                  tempArray.push(myChunk);
               }
               return tempArray
            }
            let data = chunkArray(props.data.meals,3)
            setMyData({meals:data,nutrients:props.data.nutrients})
        }

        
        
    },[])

    
   

    return (
        <div>
            {props.data === undefined &&   <Spinner animation="border" variant="primary" /> }
                {props.data.week !== undefined && 
                 
                <React.Fragment>
            
                 <h4>monday</h4>
                 {props.data.week.monday !== undefined && <DailyPlan data={props.data.week.monday} />}
                 <hr/>
                 <h4>tuesday</h4>
                 {props.data.week.tuesday !== undefined && <DailyPlan data={props.data.week.tuesday} />}
                 <hr/>
                 <h4>wednesday</h4>
                 {props.data.week.wednesday !== undefined && <DailyPlan data={props.data.week.wednesday} />}
                 <hr/>
                 <h4>thursday</h4>
                 {props.data.week.thursday !== undefined && <DailyPlan data={props.data.week.thursday} />}
                 <hr/>
                 <h4>friday</h4>
                 {props.data.week.friday !== undefined && <DailyPlan data={props.data.week.friday} />}
                 <hr/>
                 <h4>saturday</h4>
                 {props.data.week.saturday !== undefined && <DailyPlan data={props.data.week.saturday} />}
                 <hr/>
                 <h4>sunday</h4>
                 {props.data.week.sunday !== undefined && <DailyPlan data={props.data.week.sunday} />}
               
                </React.Fragment>
                 }
                 {props.data.week == undefined && 
                        <React.Fragment>
                              <DailyPlan2 data={myData} />
                        </React.Fragment> 
                 }
                 
                
                
                 

        </div>
    )
}
export default WeeklyPlan