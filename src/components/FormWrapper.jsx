import React from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';

function FormWrapper(props) {
  const { title, children } = props;
  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md="8" xxl="6">
          <Card className="text-center shadow-sm">
            <Card.Body className="p-0">
              <Card.Title className="my-5">{title}</Card.Title>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormWrapper;
