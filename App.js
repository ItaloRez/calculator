import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

const initialState = {
  displayValue: '',
  clearDisplay: false,
  operation: null,
  values: 0,
  displayResult: '',
  point: false,
  first: true,
  operator: false
}

export default class App extends Component {

  state = {
    ...initialState,
  }

  addDigit = n => {

    const clearDisplay = this.state.clearDisplay

    if (n === '.' && this.state.point) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n

    if (n === '.') {
      this.setState({ point: true })
    }

    this.setState({ displayValue, clearDisplay: false, operator: false })

    if(!this.state.first){
      var values = this.state.values
      try {
        values =
        eval(`${displayValue}`)
      } catch (e) {
        values = 'expressão ruim'
      }
      this.setState({displayResult: values})
    }
  }

  addOperation = operation => {
    if (!this.state.operator) {
      const equals = operation === '='
      const displayValue = this.state.displayValue + (equals ? '' : operation)
      this.setState({ displayValue, point: false, operator: true, first: false, operation })

      if(equals) {
        this.setState({ displayValue: this.state.displayResult, displayResult: ''})
      }
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }


  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <Display value={this.state.displayResult} />
        <View style={styles.buttons}>

          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={this.addOperation} />
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.addOperation} />
          <Button label="4" onClick={this.addDigit} />
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.addOperation} />
          <Button label="1" onClick={this.addDigit} />
          <Button label="2" onClick={this.addDigit} />
          <Button label="3" onClick={this.addDigit} />
          <Button label="+" operation onClick={this.addOperation} />
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={this.addDigit} />
          <Button label="=" operation onClick={this.addOperation} />
        </View>
      </View>
    )
  }
}


