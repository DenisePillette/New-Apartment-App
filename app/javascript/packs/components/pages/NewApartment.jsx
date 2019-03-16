import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Table, Row, Form, Col, FormControl, Button, Container, Card } from 'react-bootstrap'
import AuthService from '../../services/AuthService'
import ApartmentService from '../../services/ApartmentService'
import withAuth from '../../services/withAuth'

const Auth = new AuthService()
const Apartment = new ApartmentService()

class NewApartment extends Component {
  constructor() {
    super()
    this.state = {
      new_apartment: {
        name: "",
        user_id: Auth.getUserId()
      },
      createSuccess: false,
    }
  }

  handleChange(event) {
    let apartment = this.state.new_apartment
    apartment[event.target.name] = event.target.value
    this.setState({ new_apartment: apartment })
  }

  handleSubmit(event) {
    event.preventDefault()
    Apartment.createApartment(Auth.getToken(), this.state.new_apartment)
      .then (successApartment => {
        console.log("Apartment Success", successApartment);
        this.setState({createSuccess: true})
      })
      .catch(err =>{ alert(err) })
  }

  render() {
    return (
      <div>
      <br />
        <Container>
          <Card>
            <Card.Body>
              <Card.Title className="center">
                <h1>
                  List an Apartment!
                </h1>
              </Card.Title>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Building Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" name="name" onChange={this.handleChange.bind(this)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridContact">
                    <Form.Label>Contact Name</Form.Label>
                    <Form.Control type="contact" placeholder="Enter name" />
                  </Form.Group>
                </Form.Row>

                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="phone" placeholder="#" />
                <br />

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Form.Row>

                <Form.Label><h5>Price</h5></Form.Label>
                <Form.Control type="price" placeholder="$" />
                <br />

                <input type="file" name="photo" onChange={this.handleChange.bind(this)} />

                <Button variant="dark" type="submit" id="submit" className="center" onClick={this.handleSubmit.bind(this)}>
                  Submit
                </Button>
                {this.state.createSuccess && <Redirect to="/viewapartments" />}
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <br />
      </div>
    )
  }
}

export default withAuth(NewApartment);
