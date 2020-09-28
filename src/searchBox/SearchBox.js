import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

const SearchBox = ({ setKeyword, handleSubmit }) => {
  return (
    <div>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#home">GitIss</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default SearchBox;
