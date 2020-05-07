import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,CardDeck,Modal,Button,ListGroup,Table,ListGroupItem,Image } from 'react-bootstrap'
import './DailyPlan2.css'
import clockIcon from '../images/clock.png'
import servedIcon from '../images/served.png'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const nutrientIndicators = ['calories','carbohydrates','fat','protein']

const  DailyPlan2 = props => {
    return (
        <React.Fragment>
        {props.data === undefined && <div></div> }
        {props.data !== undefined && 

            <React.Fragment>
              <Container className='meal-plan-container'>
              {props.data.meals.map((m,i) => 
                    <div key={i} >
                        <h4>{days[i]}</h4>
                        <Row  className='meals-container'>
                        {m.map((meal,j) =>
                               <Col  key={meal.id} sm={4}>
                                    <Card key={meal.id} style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>{meal.title}</Card.Title>
                                            <ListGroup className="list-group-flush details">
                                                <ListGroupItem>
                                                    <span ><Image className='clock-icon' src={clockIcon} /></span>
                                                    <strong>ReadyInMinutes:</strong> {meal.readyInMinutes}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <span><Image className='served-icon' src={servedIcon} /></span>
                                                    <strong>Servings:</strong> {meal.servings}
                                                </ListGroupItem>
                                            </ListGroup>
                                            <a variant="primary" className='btn-see-more' target="_blank" href={meal.sourceUrl}>See more</a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                        )}
                         </Row>
                        <Row>
                            <Col sm={12} className='nutrients-container'>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                            {nutrientIndicators.map( n => 
                                                <th key={n}>{n} </th>
                                            )}    
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {props.data.nutrients === undefined && (<div></div>)}
                                                {props.data.nutrients !== undefined && (
                                                    <>
                                                    <td>{props.data.nutrients[i].calories}cal</td>
                                                    <td>{props.data.nutrients[i].carbohydrates}</td>
                                                    <td>{props.data.nutrients[i].fat}</td>
                                                    <td>{props.data.nutrients[i].protein}</td>
                                                    </>
                                                )}
                                            
                                            </tr>
                                        
                                        </tbody>
                                    </Table>
                            </Col>
                        </Row>
                        <hr/>
                    </div>
                    
                )}
                
              </Container>
            
            </React.Fragment>
           
        }
        </React.Fragment>
    )
}
export default DailyPlan2