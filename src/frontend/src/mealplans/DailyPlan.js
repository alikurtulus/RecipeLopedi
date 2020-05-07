import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,CardDeck,Modal,Button,ListGroup,Table,ListGroupItem,Image } from 'react-bootstrap'
import clockIcon from '../images/clock.png'
import servedIcon from '../images/served.png'


const nutrientIndicators = ['calories','carbohydrates','fat','protein']
const  DailyPlan = props => {
    return (
        <React.Fragment>
            <Row className='meals-container'>
                <Col sm={12}>
                      <Row className='meals-container'>
                        {props.data.meals === undefined   && <Spinner animation="border" variant="primary" /> }
                        {props.data.meals !== undefined && props.data.meals.map(m =>
                            ( <Col sm={4}>
                               <Card key={m.id} style={{ width: '18rem' }}>
                                   <Card.Body>
                                       <Card.Title>{m.title}</Card.Title>
                                       <ListGroup className="list-group-flush details">
                                           <ListGroupItem>
                                               <span ><Image className='clock-icon' src={clockIcon} /></span>
                                               <strong>ReadyInMinutes:</strong> {m.readyInMinutes}
                                            </ListGroupItem>
                                           <ListGroupItem>
                                               <span><Image className='served-icon' src={servedIcon} /></span>
                                               <strong>Servings:</strong> {m.servings
                                            }</ListGroupItem>
                                        </ListGroup>
                                       <a variant="primary" className='btn-see-more' target="_blank" href={m.sourceUrl}>See more</a>
                                   </Card.Body>
                               </Card>
                            </Col>
                            )
                        )}
                      </Row>
                </Col>
            </Row>
            <Row>
                {props.data === undefined && (<p></p>)}
                {props.data !== undefined &&
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
                                    {props.data.nutrients[0] !== undefined &&
                                      ( <>
                                        <td>{props.data.nutrients[0].calories}cal</td>
                                        <td>{props.data.nutrients[0].carbohydrates}</td>
                                        <td>{props.data.nutrients[0].fat}</td>
                                        <td>{props.data.nutrients[0].protein}</td>
                                        </>
                                      )
                                    }
                                    {props.data.nutrients[0] === undefined &&
                                      ( <>
                                        <td>{props.data.nutrients.calories}cal</td>
                                        <td>{props.data.nutrients.carbohydrates}</td>
                                        <td>{props.data.nutrients.fat}</td>
                                        <td>{props.data.nutrients.protein}</td>
                                        </>
                                      )
                                    }
                                     
                                    </>
                                )}
                               
                            </tr>
                        
                        </tbody>
                    </Table>
                </Col>
                  
                }
           </Row>
    
      </React.Fragment>

       
    )
}
export default DailyPlan