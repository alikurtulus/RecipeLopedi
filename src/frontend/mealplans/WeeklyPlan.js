import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,CardDeck,Modal,Button,ListGroup,Table,ListGroupItem } from 'react-bootstrap'
import '../recipes/components/NewRecipe.css'
import DailyPlan from './DailyPlan'

const  WeeklyPlan = props => {
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
                
           
            
            
          

        </div>
    )
}
export default WeeklyPlan