import React from "react";
import ReactDOM from "react-dom";
import { FormBuilder } from "react-formio";

class FormBuilder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          show: false
        };
        //  this.sendDeviceInfo = this.sendDeviceInfo.bind(this);
      }

      constructor(props){
          super(props);
          this.state={

          }
      }

      render(){
          return(
            <FormBuilder
            form={{ display: "wizard" }}
            onChange={schema => console.log(JSON.stringify(schema))}
          /> 
          )
      }
}

export default FormBuilder