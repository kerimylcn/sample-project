import React, { useState,useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal, Select,message,Menu,Space,Dropdown } from "antd";
import { UserOutlined , LoginOutlined} from '@ant-design/icons';
import { inject, observer } from "mobx-react";
import Stores from "../../Stores/StoreIdentifier";
import i18n from '../../i18n';
import { withNamespaces } from 'react-i18next';
const { Option } = Select;

function Navbar2(props) {
  
   



  const {t} = props;
  const [clicked, setClicked] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  


 

  const handleClick = () => {
    setClicked(!clicked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    props.authStore.setUserInfo(values)
    setIsModalVisible(!isModalVisible);
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleChange(value) {
    i18n.changeLanguage(value);
  }

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    
    console.log('click', e);

    if(e.key === "2" ){
      props.authStore.setLogout();
      console.log(props.authStore.isLogin)
    }
    
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
      {props.authStore.userInfo.email}
      </Menu.Item>
      <Menu.Item key="2" icon={<LoginOutlined /> }>
        {t("Logout")}
      </Menu.Item>
      
    </Menu>
  );

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        Sample <i className="fab fa-react"></i>
      </h1>
      
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link className="nav-links" to="/">
            {t("home")}
          </Link>
        </li>
        <li>
          <Link className="nav-links" to="/contact">
            {t("contact")}
          </Link>
        </li>

        <li> 
          {
            props.authStore.isLogin === true? (
              <Space wrap>
              <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
              {props.authStore.userInfo.username}
            </Dropdown.Button>
            </Space>

            ):(
              <Button type="primary"  className="login-button" onClick={showModal}>
            {t("login")}
          </Button>
            )
          }
        </li>
        <li>
        <Select defaultValue="en" value={i18n.language} className="login-button" style={{ width: 75 }} onChange={handleChange}>
      <Option value="en">EN</Option>
      <Option value="tr">TR</Option>
    </Select>

        </li>
      </ul>
      
      <Modal
        title={t("login")}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={t("title")}
            name="title"
            rules={[{ required: true, message: t("Please input your title!")}]}
          >
            <Input />
          </Form.Item>

          
          <Form.Item
            label={t("Username")}
            name="username"
            rules={[{ required: true, message: t("Please input your username!") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Password")}
            name="password"
            rules={[{ required: true, message: t("Please input your password!") }]}
            className="input-password"
          >
            <Input.Password className="input-password" />
          </Form.Item>

          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: t("Please input your e-mail!"),
              },
            ]}
          >
            <Input />
          </Form.Item>

         

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {t("Submit")}
            </Button>
          </Form.Item>
          <Select defaultValue="en" value={i18n.language} className="login-button" style={{ width: 75 }} onChange={handleChange}>
      <Option value="en">EN</Option>
      <Option value="tr">TR</Option>
    </Select>
        </Form>
      </Modal>
    </nav>
  );
}

const Navbar = inject(Stores.AuthStore)(observer(Navbar2));

export default withNamespaces()(Navbar);
