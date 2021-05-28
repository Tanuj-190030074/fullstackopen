import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodclick= ()=>{
    setGood(good+1)
  }

  const neutralclick = ()=>{
    setNeutral(neutral+1)
  }

  const badclick = ()=>{
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodclick} text='good' />
      <Button onClick={neutralclick} text='neutral' />
      <Button onClick={badclick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let all= good+neutral+bad
  if (all>0) {
    let x=(good*1+bad*-1+neutral*0)/all
    let y=good/all*100
    return (
      <table>
          <tr>
          <Statistic name='good' value={good} />
          <Statistic name='neutral' value={neutral} />
          <Statistic name='bad' value={bad} />
          <Statistic name='all' value={all} />
          <Statistic name='average' value={x} />
          <Statistic name='positive' value={y+' %'} />
          </tr>
      </table>
    )
  }
  return(
    <p>No feedback given</p>
  )
}

const Button = ({onClick,text})=>( 
  <button onClick={onClick}>
    {text}
  </button>
)
export default App