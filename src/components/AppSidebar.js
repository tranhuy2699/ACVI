import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, Menu, Switch, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppleOutlined, AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import 'antd/dist/antd.css'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import logiProject from '../assets/brand/logiadvi.svg'
import toogleSidebar from '../assets/brand/toogleesidebar.svg'

// sidebar nav config
import navigation from '../_nav'

const getItem = (label, key, icon, children) => {
  return {
    label,
    key,
    icon,
    children,
  }
}
const items = [
  // {
  //   key: '1',
  //   icon: <AppleOutlined />,
  //   label: 'Theo dõi tình hình quản lý mua hàng',
  //   path: 'list-quotation'
  // }
  getItem('Theo dõi tình hình quản lý mua hàng', 'list-quotation1', <AppleOutlined />),
  getItem('Quản lý Yêu cầu báo giá', 'sub1', <AppstoreOutlined />, [
    getItem('Danh sách yêu cầu báo giá', 'list-quotation'),
    getItem('Phê duyệt yêu cầu báo giá', 'list-quotation3'),
  ]),
  getItem('Quản lý báo giá sản phẩm', 'sub2', <AppleOutlined />, [
    getItem('Tiếp nhận & duyệt báo giá', 'list-quotation4'),
    getItem('Báo giá được phân công', 'list-quotation5'),
  ]),
  getItem('Quản lý báo giá KH', 'sub3', <AppleOutlined />, [
    getItem('Danh sách báo giá KH', '6'),
    getItem('Phê duyệt báo giá KH', '7'),
  ]),
  // getItem('Quản lý Đơn hàng mua', 'sub4', <AppleOutlined />, [
  //   getItem('Danh sách Đơn hàng mua', '8'),
  //   getItem('Phê duyệt Đơn hàng mua', '9'),
  // ]),
  // getItem('Quản lý Mua hàng hóa', '10', <AppleOutlined />),
  // getItem('Quản lý danh mục', 'sub5', <AppleOutlined />, [
  //   getItem('Danh mục Nhóm hàng hóa', '11'),
  //   getItem('Danh mục Hàng hóa', '12'),
  //   getItem('Danh mục Nhà cung cấp', '13'),
  // ]),
  // getItem('Quản trị hệ thống', 'sub6', <AppleOutlined />, [
  //   // getItem('Quản trị hệ thống', '14'),
  // ]),
  // getItem(
  //   <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //     Ant Design
  //   </a>,
  //   'link',
  //   <AppleOutlined />,
  // ),
]
const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const onClick = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };
  console.log(items)
  return (
    <CSidebar
      className="background-menu"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex background-menu justify-content" to="/">
        <img className="" src={logiProject} alt="logo" ></img>
        <span className="titleProject"> Hệ thống quản lý mua hàng </span>
        <img onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })} className="" src={toogleSidebar} alt="logo"></img>
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      {/* <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav> */}
      <Menu
        className=""
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          width: 256,
        }}
        onClick={onClick}
        inlineCollapsed={collapsed}
        mode="inline"
        theme="light"
        items={items}
      >
        {/* <Menu.Item key="1">
          <AppleOutlined />
          <span>Deshboard</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2">
          <AppstoreOutlined />
          <span>Meseros</span>
          <Link to="/meseros" />
        </Menu.Item> */}
      </Menu>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
