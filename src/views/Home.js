import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Hero from '../containers/Hero';
import CustomForm from '../containers/CustomForm';
import { selectRoot } from "react-formio";
import { Collapse } from 'react-collapse';
import Collapsible from 'react-collapsible';
import { Route, Link, BrowserRouter, Switch, Router, withRouter } from 'react-router-dom'
import { Redirect } from "react-router";
import NavLink from '../containers/NavLink';
import configs from '../configs'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listUni: [],
      listUni1: [
        {
          "id": "5f449731e9a1061265d2b2fc",
          "name": "Yangon University of Law ",
          "logo": "https://test-databases-ayaplus.s3.amazonaws.com/Uploads/ba0e3506-7de4-4e7a-9f49-a52fceb976b3",
        },
        {
          "id": "5f449748e9a1061265d2b2fd",
          "name": "Yangon University of Economics",
          "logo": "https://test-databases-ayaplus.s3.amazonaws.com/Uploads/ba0e3506-7de4-4e7a-9f49-a52fceb976b3",
        },
        {
          "id": "5f449759e9a1061265d2b2fe",
          "name": "Yangon University of Computer Studies",
          "logo": "https://test-databases-ayaplus.s3.amazonaws.com/Uploads/ba0e3506-7de4-4e7a-9f49-a52fceb976b3",
        }
      ],
      activeIndex: null,
      show: false,
      formList: [
        {
          "formId": "5f51b8bf7054062fd41f15ee",
          "formName": "regForm",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f51f8afa4aa2f2dfc8a6926",
          "formName": "RegistrationForm",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f51fdb3a4aa2f2dfc8a6943",
          "formName": "OnBoardingForm",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f520051a4aa2f2dfc8a6946",
          "formName": "TestForm",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f52014da4aa2f2dfc8a6947",
          "formName": "Updating",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f5205c35e00ca39dc7a20c4",
          "formName": "CreateForm",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f55c5f0679e14438409dba5",
          "formName": "FormBuilderCreate",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f55fbe3bd43a63b905a29aa",
          "formName": "FormBuilderCreate",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f55ffa4b399e3404875f943",
          "formName": "FormBuilderWizard",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f57026a110c1f3d30c6848d",
          "formName": "UITRegisterationForm",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f571b15a34a1d1a9004e02e",
          "formName": "FormBuilderWizard",
          "universityId": "5f449786e9a1061265d2b300"
        },
        {
          "formId": "5f571d11a34a1d1a9004e02f",
          "formName": "FormBuilderWizard",
          "universityId": "5f449786e9a1061265d2b300"
        }
      ],
      formList1: [
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
    }
    this.getUniversityList = this.getUniversityList.bind(this)
    this.bindFormList = this.bindFormList.bind(this)
  }

  componentDidMount() {
   //this.login()
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

  getAllCourses() {
    fetch('https://dev-moe-api.ayainnovation.com/api/university/getList', {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: ''
      })
    }).then(function (response) {
      console.log(response);
      if (!response.ok) {
        return Promise.reject('some reason');
      }
      return response.json();

    }).catch(function (err) {
      console.log(err)
    });
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

  bindFormList(id) {
    console.log("UniversityId", id)
    //call

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
    if (id == '5f449786e9a1061265d2b300') {
      // this.setState({ formList: formList1 })
    }
    // this.getFormList(id)
  }

  componentDidUpdate() {
  }

  componentWillUpdate() {
  }

  login = () => {

    const requestOptions = {
      method: 'POST',  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic 423b80b8-ffda-41e2-91ff-c083aa844fbe'
      },
      body: JSON.stringify({
        phone: '09789789789',
        password: '123457',
        deviceId: '5b4588ba164e12f6345',
        firebaseToken: 'q32423'
      })
    };

    let url = `${configs.constant.HOST_NAME}`;
    fetch('https://dev-moe-api.ayainnovation.com/' + 'api/user/login', requestOptions)
      .then(response => response.json())
      .then(data => console.log("Response Json", data));

  }

  deleteForm = (formId) => {
    console.log("Delete", formId);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        formId: formId
      })
    };

    let url = `${configs.constant.HOST_NAME}`;
    // fetch(url + 'admin/university/forms/deleteForm', requestOptions)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log("SUCCESSS")
    //       return response.json();
    //     } else {
    //       console.log("SOMETHING WENT WRONG")
    //       this.setState({ requestFailed: true })
    //     }
    //   })
    //   .then(data => console.log("Response", data));

  }

  render() {
    let list = this.state.listUni
    if (list.length > 0) {
      return (
        <div>
          <div className="App">
            <div class="row overview">

              <div class="col-md-3">
              </div>

              <div class="col-md-6">

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
                              <img src={"https://test-databases-ayaplus.s3.amazonaws.com/"+value.universityLogo} alt="Logo" width="40px" />
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

            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <div className="App">
            <div class="row overview">

              <div class="col-md-3">

                {/* <div class="row formList">
                <div class="col-md-2">
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
                {/* <img src={value.logo} alt="Logo" width="40px" />
                          </div>
                          <div class="col-md-10">
                            <button class="f_button f_button1" onClick={this.bindFormList(value.id)}>
                              <strong class="universityName">{value.name}</strong>
                            </button>
                          </div> */}
                {/* <div class="col-md-4">
                            <div class="f_button f_button1" >
                              <Link to="/update" class="customLink" style={{ textDecoration: 'none' }} ><i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;Edit Form</Link>
                            </div>

                            <button class="f_button f_button1" onClick={this.deleteForm(value.formId)}>
                              <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          </div> */}
                {/* </div>
                      </div>
                    )
                  })
                }

              </div> */}


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
          </div>
        </div>
      );
    }
  }
}

