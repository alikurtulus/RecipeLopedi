import React,{useEffect,useState,useContext} from 'react'
import {Card,Row,Col,Container,Figure} from 'react-bootstrap'
import axios from 'axios';
import {AuthContext} from '../../context/auth-context'
import './Comment.css'

 const Comment = props => {
    const auth  = useContext(AuthContext)
    const [currentUser,setCurrentUser] = useState('')
    const [date,SetDate] = useState('')
     useEffect(() => {
          const getUser = async () => {
              const res =  await axios.post(process.env.REACT_APP_BACKEND_URL+`/users/user`,{userId:props.user}, {
                headers: {Authorization : `Bearer ${auth.token}`} })
                setCurrentUser(res.data.user)
                let date = new Date(props.updatedAt);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                 let dt = date.getDate();

                if (dt < 10) {
                dt = '0' + dt;
                }
                if (month < 10) {
                month = '0' + month;
                } 
                SetDate(dt+'-' + month + '-'+year);
                
          }
          getUser()
     },[])
     
    return (
        <div  className='comments-container'>
           
            <React.Fragment>
            {currentUser === undefined && <div></div>}
            {currentUser !== undefined && 
                    <Row>
                        <Col sm={2}>
                                <div className='avatar-container'>
                                    <Figure>
                                        <Figure.Image
                                            width={171}
                                            height={180}
                                            className='avatar-img'
                                            alt="171x180"
                                            src={process.env.REACT_APP_ASSET_URL+`/${currentUser.image}`}
                                        />
                                        
                                    </Figure>
                                </div>
                        </Col>
                        <Col sm={10} className='comment-content'>
                            <h5>{currentUser.username}</h5>
                            <p>
                              {props.content}
                            </p>
                            <p className='date'>{date}</p>
                        </Col>
                    </Row>
                
            }  
            </React.Fragment>
                          
          
        </div>
    )
}
export default Comment