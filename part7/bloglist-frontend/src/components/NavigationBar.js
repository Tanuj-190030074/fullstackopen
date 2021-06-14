import {Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import {
    Link
  } from "react-router-dom"
import { useSelector } from 'react-redux'
const NavigationBar=({handleLogout})=>{
    const user=useSelector(state=>state.user)
     const padding = { padding: 5,color:"white"}
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">
      <Link style={padding} to="/" >Blogs</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
      <Link style={padding} to="/users">Users</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
      {user
            ? <em>{user.username} logged in <Button variant="danger" size="sm" onClick={handleLogout}>logout</Button></em>
            : <Link style={padding} to="/login">login</Link>
          }
    </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default NavigationBar