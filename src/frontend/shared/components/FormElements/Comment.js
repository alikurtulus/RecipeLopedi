import React,{useEffect,useState,useContext} from 'react'
import {Card,Row,Col,Container,Figure,Button,InputGroup,FormControl} from 'react-bootstrap'
import axios from 'axios';
import {AuthContext} from '../../context/auth-context'
import './Comment.css'

 const Comment = props => {
    const auth  = useContext(AuthContext)
    const [currentUser,setCurrentUser] = useState('')
    const [date,SetDate] = useState('')
    const [recentUser,setRecentUser] = useState(auth.userId)
   
    
     useEffect(() => {
          const getUser = async () => {
              const res =  await axios.post(process.env.REACT_APP_BACKEND_URL+`/users/user/`,{userId:props.user}, {
                headers: {Authorization : `Bearer ${auth.token}`} })
                setCurrentUser(res.data.user)
             
                let date = new Date(props.updatedAt);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                setRecentUser(auth.userId)
               

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
                            <div className='btn-crud-buttons'>
                                {recentUser === props.user ?  <Button variant="link" onClick={props.deleteComment}>Delete</Button>: ''}
                                {recentUser  === props.user ? <Button variant="link" onClick={props.updateComment}>Edit</Button> : ''}
                            </div>
                            <div>
                            {props.isEdit && props.selectedIndex === props.id ?<InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Give some comments ..."
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onChange={props.updateCommentChange}
                                           
                                        />
                                        <InputGroup.Append>
                                        <Button variant="success" onClick={props.updatedCommentSave} >Save</Button>
                                        </InputGroup.Append>
                                    </InputGroup> : ''}

                            </div>
                        </Col>
                    </Row>
            }  
            </React.Fragment>
                          
          
        </div>
    )
}
export default Comment