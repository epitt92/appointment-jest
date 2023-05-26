import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, message, Row, Col } from "antd";
import Loader from "./Loader";

const { Step } = Steps;

const NewAppointmentForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      let response = await fetch("https://kumba.free.beeceptor.com/submit", {
        method: "POST",
        body: JSON.stringify(values),
      });
      response = await response.json();
      if (response.status === "success") {
        setCurrentStep(currentStep + 1);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleNext = async () => {
    setCurrentStep(currentStep + 1);
  };

  const fetchContent = async () => {
    try {
      setLoading(true);
      let response = await fetch("https://kumba.free.beeceptor.com/me");
      response = await response.json();
      if (response.status === "success") {
        const { name, email } = response.data;
        const names = name.split(" ");
        form.setFieldsValue({ firstName: names[0], lastName: names[1], email });
      }
    } catch (error) {
      // Do nothing and continue to next step
      setCurrentStep(currentStep + 1);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (currentStep) return;
    fetchContent();
  }, [currentStep]);
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Row justify={"center"}>
      <Col span={12}>
        <Steps current={currentStep}>
          <Step title="Step 1" />
          <Step title="Step 2" />
        </Steps>

        {loading ? (
          <Loader />
        ) : (
          <>
            {currentStep === 0 && (
              <Form form={form} onFinish={handleNext}>
                <Form.Item name="firstName" label="First Name">
                  <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ type: "email" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </Form.Item>
              </Form>
            )}

            {currentStep === 1 && (
              <Form form={form} onFinish={handleFinish}>
                <Form.Item
                  name="dateTime"
                  label="Date and Time"
                  rules={[{ required: true }]}
                >
                  <Input type="datetime-local" />
                </Form.Item>
                <Form.Item>
                  <Button onClick={handlePrev}>Previous</Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}

            {currentStep === 2 && <div>Success! Appointment created.</div>}
          </>
        )}
      </Col>
    </Row>
  );
};

export default NewAppointmentForm;
