import React, { useState } from 'react'
import {
    CToggler,
    CHeaderNavLink,
    CNavbarBrand,
    CCollapse,
    CNavbarNav,
    CNavbar,
    CImg
  } from '@coreui/react'
import Img from '../../assets/brand.jpg'
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return  (
    <CNavbar expandable="sm" color={"#95e3ff"} style={{backgroundColor:"#95e3ff"}}>
            <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
            <CNavbarBrand>
              <CImg
                  src={Img}
                  className="d-inline-block align-middle"
                  alt="CoreuiVue"
                  width={50}
                  height={50}
                />
                <CHeaderNavLink to="/dashboard">
              <span ><b>Hospital Admin</b></span>
              </CHeaderNavLink>
            </CNavbarBrand>
            <CCollapse show={isOpen} navbar>
              
              <CNavbarNav className="ml-auto">
                
                <CHeaderNavLink to="/logout">LogOut</CHeaderNavLink>
              </CNavbarNav>
              <CNavbarNav>
                
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
  )
}
