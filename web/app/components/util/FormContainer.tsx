import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface FormContainerProps extends React.PropsWithChildren {
  title: string;
}

export const FormCol: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Col
    sm={{ span: 8, offset: 2 }}
    md={{ span: 6, offset: 3 }}
    lg={{ span: 4, offset: 4 }}
  >
    {children}
  </Col>
);

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
}) => (
  <Container>
    <Row>
      <FormCol>
        <h4 className="text-center">{title}</h4>
        {children}
      </FormCol>
    </Row>
  </Container>
);
