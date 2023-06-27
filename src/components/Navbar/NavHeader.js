'use client'
// Have 'use client' here to make this a dynamic page. In production everything is static by default, so react hooks won't work without this.

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {menuLinks, site} from './MenuLinks'                         // Object containing the navbar links
import {userMenuLinks} from './UserMenuLinks'
import styles from '@/styles/navbar/Navbar.module.scss'
import Image from 'next/image'
import NavItem from 'react-bootstrap/NavItem'
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus, FaUserCircle } from 'react-icons/fa';           // npm install react-icons


// MenuItem generates the Nav Links. 
// Both Normal Links and Dropdown Menu Links.
// Use NextJS <Link>. passHref forces the Link to send the href property to its child component <Nav.Link>
// React-Bootstrap supplies the <Nav.Link>
const MenuItem = ({title, path, subMenu, id, icon, icon_alt }) => {

  const router = useRouter();

  // The MenuLinks.js object has 2 kinds of links. Normal ones [title, path] and Dropdown Menu Links [title, id, submenu]
  // So how do we know which kind of link this menu itme is?
  // Check if the object has a subMenu field. If it does, make a <NavDropdown> else make a normal  <Nav.Link>
  if (subMenu) {

    // DropDown Menu - subMenu field exists

    // The subMenu contains the link title and path for the drowdown menu link
    // We need to show which link is the active page.
    // To set the link as the 'active' link. The MenuLinks.js object path will match the userRouter()'s current path.
    // If it is the active link then {router.pathname === path}
    const activeChild = subMenu.find((item) => {
      if (router.pathname === item.path) {
      return true
      }
      return false
    })

    // To style the dropdown menu link you have to put a <span> tag in the title and style that!
    // title={<span  className={styles.navDropDownLink}>{title}</span>}
    // Even thow an image icon in there too!
    // title={<span  className={styles.navDropDownLink}><Image src={icon} width="25" height="25" /> {title}</span>}
    return (
    <NavDropdown title={<span  className={styles.navDropDownLink}><Image src={icon} width="25" height="25" alt={icon_alt} /> {title}</span>} id={`nav-dropdown-${id}`} active={activeChild}>
      {subMenu.map((item, index) => (
        <DropdownItem {...item} key={index}/>
      ))}
      </NavDropdown>
    )
    }

    // Normal Link. No subMenu field in link object.
    // To set the link as the 'active' link. The MenuLinks.js object path will match the userRouter()'s current path.
    // active={router.pathname === path}
    return (
     <Nav.Link as={Link} href={path} active={router.pathname === path} className={styles.navLinks}><Image src={icon} width="25" height="25" alt={icon_alt} /> {title}</Nav.Link>
    )
}


// Dropdown Menu
// 
// React-Bootstrap supplies the <NavDropdown.Item>
const DropdownItem = ({ title, path, divider }) => {

  const router = useRouter();
  
  // To get a dividing line between the dropdown links
  // Set the { diver: true } in MenuLinks.js
  if (divider) {
    // When iterating through the dropdown object there is a divider object
    // return the divding line
    return (
      <NavDropdown.Divider />
    )
  }
  
  // Matches a normal link object in the dropdown.
  return (
    <NavDropdown.Item as={Link} href={path} active={router.pathname === path} className={styles.navDropdownSubLinks}>{title}</NavDropdown.Item>
  )
  }


  // User Profile Dropdown 
  //
  // Similar to the MenuLinks function, except we use the session.user.username in the dropdown title.
  const UserLinksMenuItem = ({title, path, subMenu, id, session}) => {

    const router = useRouter();
  
    // The MenuLinks.js object has 2 kinds of links. Normal ones [title, path] and Dropdown Menu Links [title, id, submenu]
    // So how do we know which kind of link this menu itme is?
    // Check if the object has a subMenu field. If it does, make a <NavDropdown> else make a normal  <Nav.Link>
    if (subMenu) {
  
      // DropDown Menu - subMenu field exists
  
      // The subMenu contains the link title and path for the drowdown menu link
      // We need to show which link is the active page.
      // To set the link as the 'active' link. The MenuLinks.js object path will match the userRouter()'s current path.
      // If it is the active link then {router.pathname === path}
      const activeChild = subMenu.find((item) => {
        if (router.pathname === item.path) {
        return true
        }
        return false
      })
  
      // To style the dropdown menu link you have to put a <span> tag in the title and style that!
      // title={<span  className={styles.navDropDownLink}>{title}</span>}
      // Even use a Font Awesome Icon in there as well!
      // title={<span  className={styles.navDropDownLink}><FaUserCircle /> {title}</span>}
      return (
        <NavDropdown title={<span><FaUserCircle className={styles.faStyles} /> {session?.user.username}</span>} id={`nav-dropdown-${id}`} active={activeChild}>
        {subMenu.map((item, index) => (
          <DropdownItem {...item} key={index} ></DropdownItem>
        ))}
        </NavDropdown>
      )
      }
  
      // Normal Link. No subMenu field in link object.
      // To set the link as the 'active' link. The MenuLinks.js object path will match the userRouter()'s current path.
      // active={router.pathname === path}
      return (
        <Nav.Link as={Link} href={path} active={router.pathname === path} className={styles.navDropdownLink}>{title}</Nav.Link>
      )
  }


const NavHeader = () => {

  // Next-Auth Login Session
  // Grab the data from the session and rename it to session.
  // Use this to display the Login or Signout links.
    const { data: session} = useSession();


    // <Container fluid> - fluid makes the navbar full width
    // site.title comes from MenuLinks.js it's our Site Logo Name.
    // <Navbar.Brand href="/">{site.title}</Navbar.Brand>
    return (
      <Navbar className={styles.navbar} expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" >
            <Image
                src="/smilelogo.png"
                width="140"
                height="40"
                className="d-inline-block align-top"
                alt="logo"
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Iterate over the links object imported from MenuLinks.js */}
              {menuLinks.map((item, index) => (
                <MenuItem {...item} key={index} />
              ))}
            </Nav>
            <Nav pullright="true">
              {/* Right-Side Login Link */}
              {/* Next-Auth handles what links to show */}
              {session?.user ? (
                <>
                {/* Iterate over to produce profile dropdown menu UserMenuLinks.js */}
                  {userMenuLinks.map((item, index) => (
                    <UserLinksMenuItem {...item} key={index} session={session}/>
                  ))}
                  <NavItem>
                    <Nav.Link as={Link} href='/members/signout' onClick={() => signOut({callbackUrl: '/'})}><FaSignOutAlt className={styles.faStyles} /> Signout</Nav.Link>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <Nav.Link as={Link} href='/members/login' onClick={() => signIn()} className={styles.loginRegLinks}><FaSignInAlt className={styles.faStyles}  /> Login</Nav.Link>
                  </NavItem>
                  <NavItem>
                    <Nav.Link as={Link} href='/members/register' className={styles.loginRegLinks}><FaUserPlus className={styles.faStyles}  /> Register</Nav.Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavHeader;