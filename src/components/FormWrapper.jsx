import React from 'react';
import { Card, Container } from 'react-bootstrap';

function FormWrapper(props) {
  const { title, children } = props;
  return (
    <Container className="d-flex h-100 justify-content-center align-items-center" fluid>
      <Card className="w-50 text-center shadow-sm">
        <Card.Body className="p-0">
          <Card.Title className="my-5">{title}</Card.Title>
          {children}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FormWrapper;
