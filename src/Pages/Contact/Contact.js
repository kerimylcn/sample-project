import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Cascader } from "antd";
import "./Contact.css";
import { inject, observer } from "mobx-react";
import Stores from "../../Stores/StoreIdentifier";
import { withNamespaces } from "react-i18next";

const { Option } = Select;
const countryList = [
  { id: "TR", name: "Turkey" },
  { id: "US", name: "United States of America" },
  { id: "GB", name: "United Kingdom" },
  { id: "DE", name: "Germany" },
  { id: "SE", name: "Sweden" },
  { id: "KE", name: "Kenya" },
  { id: "BR", name: "Brazil" },
  { id: "ZW", name: "Zimbabwe" },
];


function phoneIsValid(str) {
  var isPhone = /^(1\s|1|)?(((\d{3}))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/.test(str);
  return isPhone;
}

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};


const onFinish = (values) => {
  console.log(values);
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="90">+90</Option>
    </Select>
  </Form.Item>
);

function Contact2(props) {
  const { t } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: props.authStore.userInfo.email,
      name: props.authStore.userInfo.username,
    }
    );
    if (!props.authStore.isLogin){
      form.setFieldsValue({
        email: "",
        name:""
      });
    }
  }, [props.authStore.isLogin]);

  return (
    <div className="contact-container">
      <h3 className="contact-header">{t("Contact US")}</h3>
      <br></br>
      <br></br>
      <div className="form-wrapper">
        <Form
          form={form}
          className="form-container"
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item
            name={"title"}
            label={t("title")}
            rules={[
              {
                required: true,
                message:t("Please input your title!")
                
              
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"name"}
            label={t("Name")}
            rules={[
              {
                required: true,
                message:t("Please input your name!")
              },
            ]}
          >
            <Input />
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
          <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{  required: true, message: t('Please input your phone number!') },

        ({ getFieldValue }) => ({
          validator(_, value) {
            //if (!value || getFieldValue('password') === value) {
              //return Promise.resolve();
            
            if (phoneIsValid(value) ){
              return Promise.resolve();
            }
            return Promise.reject(new Error (t("Please enter correct phone number")));
          },
        })
      ]}
      >
        <Input maxLength={10} addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

          <Form.Item
            name="country_code"
            label={t("Country")}
            rules={[
              {
                required: true,
                message: t("Please select your Country"),
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder={t("Select a Country")}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {countryList.map((country) => {
                return (
                  <Option key={country.id} value={country.id}>
                    {t(country.id)}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name={"text"} label={t("Introduction")}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Submit")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const Contact = inject(Stores.AuthStore)(observer(Contact2));
export default withNamespaces()(Contact);
