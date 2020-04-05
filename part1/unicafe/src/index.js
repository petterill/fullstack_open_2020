import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
	<tr>
		<td>{props.text}</td>
		<td>{props.stats}</td>
		<td>{props.sign}</td>
	</tr>
)

const Statistics = ({ good, neutral, bad }) => {
	if ((good + neutral + bad) === 0) {
		return (
			<div>
				<h1>Statistics</h1>
				<p>No feedback given</p>
			</div>
		)
	}

	return (
    	<div>
    		<h1>Statistics</h1>
    		<table>
    			<Statistic text="good" stats={good} />
    			<Statistic text="neutral" stats={neutral} />
    			<Statistic text="bad" stats={bad} />
    			<Statistic text="all" stats={good + neutral + bad} />
    			<Statistic text="average" stats={(good - bad) / (good + neutral + bad)} />
    			<Statistic text="positive" stats={good / (good + neutral + bad) * 100} sign="%"/>
    		</table>
    	</div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValueGood = (newValue) => {
  	setGood(newValue)
  }

  const setToValueNeutral = (newValue) => {
  	setNeutral(newValue)
  }

  const setToValueBad = (newValue) => {
  	setBad(newValue)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setToValueGood(good + 1)} text="good" />
      <Button handleClick={() => setToValueNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToValueBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)