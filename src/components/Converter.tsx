import * as React from 'react'
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

interface currs {
  shrt: string,
  name: string
}

export let currs: currs[] = [
  { shrt: "$", name: "CAD" }, { shrt: "元", name: "HKD" }, { shrt: "kr", name: "ISK" }, { shrt: "₱", name: "PHP" },
  { shrt: "kr", name: "DKK" }, { shrt: "ft", name: "HUF" }, { shrt: "Kč", name: "CZK" }, { shrt: "A$", name: "AUD" },
  { shrt: "lei", name: "RON" }, { shrt: "kr", name: "SEK" }, { shrt: "Rp", name: "IDR" }, { shrt: "₹", name: "INR" },
  { shrt: "R$", name: "BRL" }, { shrt: "₽", name: "RUB" }, { shrt: "kn", name: "HRK" }, { shrt: "¥", name: "JPY" },
  { shrt: "฿", name: "THB" }, { shrt: "CHF", name: "CHF" }, { shrt: "S$", name: "SGD" }, { shrt: "zł", name: "PLN" },
  { shrt: "лв", name: "BGN" }, { shrt: "₺", name: "TRY" }, { shrt: "¥", name: "CNY" }, { shrt: "kr", name: "NOK" },
  { shrt: "$", name: "NZD" }, { shrt: "R", name: "ZAR" }, { shrt: "$", name: "USD" }, { shrt: "$", name: "MXN" },
  { shrt: "₪", name: "ILS" }, { shrt: "£", name: "GBP" }, { shrt: "₩", name: "KRW" }, { shrt: "RM", name: "MYR" },
  { shrt: "€", name: "EUR" }
]


export default function Converter() {

  // Конвертировать значения и записать в ридонли инпут
  const convert = () => {
    let val: number = parseInt(inptRefFrom.current.value, 10)
    if (val <= 0 || !val) return
    fetch(`https://api.exchangeratesapi.io/latest?base=${slctRefFrom.current.value}&symbols=${slctRefTo.current.value}`)
      .then(res => {
        res.json().then(data => {
          inptRefTo.current.value = (val * data.rates[slctRefTo.current.value]).toFixed(2)
        })
      })
  }

  // Рефы селектов
  let slctRefFrom = React.useRef(null)
  let slctRefTo = React.useRef(null)

  // Рефы инпутов
  let inptRefTo = React.useRef(null)
  let inptRefFrom = React.useRef(null)

  return (
    <>
      <Form>
        <Row>

          <Col>
            <InputGroup>
              <InputGroup.Prepend>
                {/* Селект со всеми валютами */}
                <Form.Control as="select" ref={slctRefFrom} defaultValue={"EUR"} >
                  {currs.map((value, index) => (
                    <option key={index} title={value.shrt} >{value.name}</option>
                  ))}

                </Form.Control>
              </InputGroup.Prepend>

              {/* Количество валюты для конвертации */}
              <Form.Control
                type="number"
                min="1"
                aria-label="Amount"
                as="input"
                ref={inptRefFrom}
                onChange={convert}
              />
            </InputGroup>
          </Col>

          {/* Поменять валюты местами */}
          <img
            className="switch"
            src="/assets/switch.png"
            style={{
              width: "70px",
              height: "50px",
            }}
            onClick={() => {
              [slctRefTo.current.value, slctRefFrom.current.value] = [slctRefFrom.current.value, slctRefTo.current.value]
              convert()
            }}
          ></img>
          <Col>
            <InputGroup>
              <InputGroup.Append>
                {/* Селект со всеми валютами */}
                <Form.Control as="select" ref={slctRefTo} onChange={convert}>

                  {currs.map((value, index) => (
                    <option key={index} title={value.shrt}>{value.name}</option>
                  ))}

                </Form.Control>
              </InputGroup.Append>

              {/* Результат конвертации */}
              <Form.Control ref={inptRefTo} type="number" readOnly as="input" />
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </>
  )
}

