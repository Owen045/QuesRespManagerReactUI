import React, { Component } from 'react';

// function based components

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  function App() {
    return ( // pass name props into children components
      <div>
        <Welcome name="Sara" />      
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }


  // All React components must act like pure functions with respect to their props. e.g. they cannot change



  export default App;

  // class based components and State

  // state is similar to props but it is private and fully controlled by the component

  class Clock extends React.Component {

    constructor(props) { // constructor is similar to __init__ method
        super(props);
        this.state = {date: new Date()};
      }
    

      // lifecycle methods are important for freeing up resources taken up by components when they are destroyed

      // Mounting - rendering a component to the DOM for the first time
      componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
      }

      // Unmounting - clearing a component when the DOM produced by the clock is removed
      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      tick() {
          this.setState({
              date: new Date()
          })
      }


      render() {
          return (
              <div>
                  <h1>Hello, world!</h1>
                  <h2> It is {this.props.date.toLocaleTimeString()}</h2>
              </div>
          );
      }
  }

  // never modify state directly, always use setState() method

  // state updates may be asynchronous so do not use values to calculate next step in state
// instead use setState function form e.g.

this.setState((state, props) => ({
    counter: state.counter + props.increment
}))


// Data flows down
 // neither parent nor child components know if a certain component is stateful or statless

// state is local/encapsulated

// component can pass its state down as props to its child component