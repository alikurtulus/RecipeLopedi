import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,CardDeck,Modal,Button,ListGroup,Table,ListGroupItem } from 'react-bootstrap'
import '../recipes/components/NewRecipe.css'

const nutrientIndicators = ['calories','carbohydrates','fat','protein']
const  DailyPlan = props => {
    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                      <Row className='meals-container'>
                      {props.data.meals === undefined  && (<p></p>)}
                        {props.data.meals !== undefined && props.data.meals.map(m =>
                            ( <Col sm={4}>
                               <Card key={m.id} style={{ width: '18rem' }}>
                                   <Card.Body>
                                       <Card.Title>{m.title}</Card.Title>
                                       <ListGroup className="list-group-flush details">
                                           <ListGroupItem><strong>ReadyInMinutes:</strong> {m.readyInMinutes}</ListGroupItem>
                                           <ListGroupItem><strong>Servings:</strong> {m.servings}</ListGroupItem>
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
                                      <td>{props.data.nutrients.calories}cal</td>
                                      <td>{props.data.nutrients.carbohydrates}</td>
                                      <td>{props.data.nutrients.fat}</td>
                                      <td>{props.data.nutrients.protein}</td>
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