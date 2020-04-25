import React,{useEffect,useState,useContext} from 'react'
import {Card,Row,Col,Container} from 'react-bootstrap'
import axios from 'axios';
import {AuthContext} from '../../context/auth-context'


 const Comment = props => {
    const auth  = useContext(AuthContext)
    const [currentUser,setCurrentUser] = useState('')
     useEffect(() => {
          const getUser = async () => {
              const res =  await axios.post(process.env.REACT_APP_BACKEND_URL+`/users/user`,{userId:props.user}, {
                headers: {Authorization : `Bearer ${auth.token}`} })
                setCurrentUser(res.data.user)
                console.log(res.data)
          }
          getUser()
     },[])
     
    return (
        <div className='comments-container'>
           
            <React.Fragment>
            {currentUser === undefined && <div></div>}
            {currentUser !== undefined && 
                <Container>
                    <Row>
                       
                            <Col sm={3}>
                                <div className='avatar-container'>
                                    <Card.Img className='avatar-img' variant="top" src={`http://localhost:5000/${currentUser.image}`} />
                                    <Card.Title className='username' >{currentUser.username}</Card.Title>
                                </div>
                            </Col>
                            <Col sm={9}>
                                <Card.Body>
                                {props.content}
                                </Card.Body>
                            </Col>
                       
                    </Row>
                </Container>
            }  
            </React.Fragment>
                          
          
        </div>
    )
}
export default Comment