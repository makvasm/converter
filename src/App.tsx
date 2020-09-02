import * as ReactDOM from "react-dom"
import * as React from 'react'
import Converter from "./components/Converter"
import { Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import Rates from "./components/Rates"

export default function App() {
  return (
    <Container>
      <Converter />
      <Rates />
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById("main"))