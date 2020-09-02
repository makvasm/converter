import * as React from 'react'
import { currs } from "./Converter"
import Form from "react-bootstrap/Form"

interface Rates {
  base: string,
  date: string,
  rates: {}
}

export default function Rates() {

  const [rates, setRates] = React.useState({ rates: [] })
  const [base, setBase] = React.useState("EUR")

  React.useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
      .then(res => {
        res.json().then(rates => setRates(rates))
      })
  }, [base])

  return (
    <>
      <Form.Control as="select"
        defaultValue="EUR"
        onChange={(event: any) => {
          setBase(event.currentTarget.value)
        }}
      >

        {currs.map((value, index) => (
          <option key={index} title={value.shrt} >{value.name}</option>
        ))}

      </Form.Control>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}>
        <div style={{margin: "auto"}}>{base}</div>
        <div>
          {Object.entries(rates.rates).map(([key, val], ind) => (
            <div key={ind}>{`${key}: ${val}`}</div>
          ))}
        </div>
      </div>
    </>
  )
}
