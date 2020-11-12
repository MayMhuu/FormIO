import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch, Router, withRouter } from 'react-router-dom'
import configs from '../configs'
//import '../scss/styles.scss'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listUni: [],
      activeIndex: null,
      show: false
    }
    this.getUniversityList = this.getUniversityList.bind(this)
  }

  componentDidMount() {
    this.getUniversityList()
  }

  getUniversityList = () => {

    const requestOptions = {
      method: 'Post',
      //  mode: 'cors',
      //  credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search: ''
      })
    };

    let url = `${configs.constant.HOST_NAME}`;
    fetch(url + 'admin/university/forms/getFormList', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.err === 200) {
          console.log("Success", data)
          this.setState({ listUni: data.data.universities })
        }
        else {
          console.log("Error", data)
        }
      }
      )
      .catch(error => console.log("Error Message", error.message))
    console.log('Lsit data', this.state.listUni)
  }


  getFormList = (universityId) => {

    let formList1 = [
      {
        "formId": "5f51b8bf7054062fd41f15ee",
        "formName": "regForm",
        "universityId": "5f449748e9a1061265d2b2fd"
      },
      {
        "formId": "5f51f8afa4aa2f2dfc8a6926",
        "formName": "RegistrationForm",
        "universityId": "5f449786e9a1061265d2b400"
      }
    ]
    if (universityId == '5f449786e9a1061265d2b300') {
      this.setState({ formList: formList1 })
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        universityId: universityId
      })
    };

    let url = `${configs.constant.HOST_NAME}`;
    // fetch(url + 'api/university/forms/getFormList', requestOptions)
    //   .then(response => response.json())
    //   .then(data => console.log("Response", data));

  }

  onClick = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    }
    else {
      this.setState({ show: true });
    }
  }

  render() {
    let list = this.state.listUni
    if (list.length > 0) {
      return (
        <div>
          <div className="App">
            <div class="row overview">

              <div class="col-md-1">
              </div>

              <div class="col-md-10">

                <div class="row formList">
                  <div class="col-md-2 ">
                    <h3 class="universityHeader" style={{ marginLeft: "20px" }}>University </h3>
                  </div>
                </div>
                <div >
                  {
                    list.map((value, index) => {
                      return (
                        <div class="list-group-item " key={index}>
                          <div class="row">
                            <div class="col-md-2">
                              {/* <strong>{value.id}</strong> */}
                              <img src={"https://test-databases-ayaplus.s3.amazonaws.com/" + value.universityLogo} alt="Logo" width="40px" />
                            </div>
                            <div class="col-md-6">
                              <div>
                                <Link to={{
                                  pathname: `/list/${value.universityId}/${value.universityName}`,
                                  query: { universityName: value.universityName }
                                }}
                                  class="customLink" style={{ textDecorationColor: '#4CAF50' }} >
                                  <strong class="universityName">{value.universityName}</strong>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
              <div class="col-md-1">
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (

        <div class="row">

          <div class="col-md-3">
          </div>

          <div class="col-md-6">

            <div class="row formList">
              <div class="col-md-2 ">
                <h3 class="universityHeader" style={{ marginLeft: "20px" }}>University </h3>
              </div>
            </div>
            <div >

            </div>
          </div>

        </div>

      );
    }
  }
}

