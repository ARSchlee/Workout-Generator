import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import exercises from './exercises.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class WorkoutGenerator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isReps: true,

      intervalIntensity: "Low"
    };
  }

  handleTypeClick(bool){
    this.setState({isReps : bool});
  }

  handleIntervalIntensityClick(intensity){
    this.setState({intervalIntensity: intensity});
  }

  render(){
    return(
      <div>
        <WorkoutType isReps={this.state.isReps} onClick={i => this.handleTypeClick(i)}/>
        <MuscleGroup />
        <WorkoutIntensity isReps={this.state.isReps} onIntensityClick={i => this.handleIntervalIntensityClick(i)}/>
      </div>
    )
  }
}

class WorkoutType extends React.Component {
  render(){
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Workout Type</Card.Title>
            <div>
              <input type="radio" value="Reps" name="typeInput" onClick={() => this.props.onClick(true)} defaultChecked/> Reps
            </div>
            <div>
              <input type="radio" value="Interval" name="typeInput" onClick={() => this.props.onClick(false)}/> Interval
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function CreateCheckBoxs(props){
  return(
    <div>
      <label  >
        <input name={props.value} type="checkbox" onClick={props.onClick}/>
      {props.value}
      </label>
      <br />  
    </div>
  );
}



class MuscleGroup extends React.Component {
constructor(props){
  super(props);
  this.state = {
    checked : []
  }
}

renderCheckBoxs(prop){
  const muscles = prop
  const checkBoxItems = muscles.map((muscles) =>
    <CreateCheckBoxs 
      key={muscles} 
      value={muscles}
      onClick={() => this.handleCheckClick(muscles)}
      />    
  );
  return (
    <ul>
      {checkBoxItems}
    </ul>
  );
}


handleCheckClick(muscles){
  const index = this.state.checked.indexOf(muscles);

  if(index === -1)
  {
    this.setState({
      checked : this.state.checked.concat(muscles)
    });
  } else {
    const newChecked = this.state.checked.slice(0,index).concat(this.state.checked.slice(index+1, this.state.checked.length)) //remove the selected item
    this.setState({
      checked : newChecked
    });
  }
  
  
}

  render(){
    const muscles = ['Chest','Back','Legs','Arms','Shoulders']

    return(
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Muscle Focus</Card.Title>
            <form>
              {this.renderCheckBoxs(muscles)}
            </form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

class WorkoutIntensity extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        duration: "",
        rest: "",
        intensity: ""
    };
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleRestChange = this.handleRestChange.bind(this);
  }

  handleDurationChange(event) {
    this.setState({duration: event.target.duration})
  }

  handleRestChange(event) {
    this.setState({rest: event.target.rest})
  }

  render() {
    if(this.props.isReps) {
      return(
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Rep Intensity</Card.Title>
                <div>
                  <input type="radio" value="Low" name="intensityInput" onClick={() => this.props.onIntensityClick("Low")} defaultChecked/> Low
                </div>
                <div>
                  <input type="radio" value="Medium" name="intensityInput" onClick={() => this.props.onIntensityClick("Medium")}/> Medium
                </div>
                <div>
                  <input type="radio" value="High" name="intensityInput" onClick={() => this.props.onIntensityClick("High")}/> High
                </div>
            </Card.Body>
          </Card>
        </div>
      ) 
    } else {
      return (
        <div>
        <Card>
          <Card.Body>
            <Card.Title>Interval Intensity</Card.Title>
              <form>
                <div>
                  <label>
                    Duration in Seconds:
                    <input type="number" value={this.state.duration} onChange={this.handleDurationChange}/>
                  </label>
                </div>
                <div>
                  <label>
                    Rest in Seconds:
                    <input type="number" value={this.state.rest} onChange={this.handleRestChange}/>
                  </label>
                </div>
              </form>
          </Card.Body>
        </Card>
      </div>
      )
    }
  }
}

ReactDOM.render(
  <WorkoutGenerator />,
  document.getElementById('root')
);
