import React, { useState } from "react";
import { Form as FormIO } from 'react-formio';
import { ExternalLink } from 'react-external-link';
import { Route } from 'react-router-dom';
//import componentDataList from '../../componentData.json'
import configs from '../../configs'
import fs from 'fs';
import axios from 'axios'
import { Input } from 'reactstrap';
import './style.scss'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import { format } from 'date-fns';
import dateFormat from 'dateformat';
import imageCompression from 'browser-image-compression';
import blobToBase64 from 'blob-to-base64';
const FormData = require('form-data')

const convertBlobToBase64 = compressedFile => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(compressedFile);
});

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            yearList: [],
            list_year: [
                { label: 'PA MA NA', value: 'PA MA NA' },
                { label: 'MA KA NA', value: 'MA KA NA' }
            ],
            list: null,
            componentData: null,
            form: null,
            fullName: '',
            submitData: {},
            image: null,
            photos: [],
            file: [null],
            selectedFile: null,
            fileUpload: null,
            listOrganization: [],
            listOrganization1: [
                {
                    "id": "5f71596cca9a289ec46ef92c",
                    "value": "0894527304953",
                    "label": "Organization 1"
                },
                {
                    "id": "5f71685e1c3b460f821e2f20",
                    "value": "2806254724",
                    "label": "Organization"
                },
                {
                    "id": "5f71686c1c3b460f821e2f21",
                    "value": "2820095676",
                    "label": "Organization2"
                }
            ],
            errorCode: '',
            drugs: [
                {
                    "label": "Drugs1",
                    "value": "drugs1"
                },
                {
                    "label": "Drugs ",
                    "value": "drugs"
                }
            ],
            listCenter: [
                {
                    "_id": "5f7a99a4beba03003b0138df",
                    "name": "Center X",
                },
                {
                    "_id": "5f7a9946c9bf2b0034d7a9b9",
                    "name": "Center X",
                }

            ],
            listTime: [
                {
                    "status": "available",
                    "time": "10:00",
                },
                {

                    "status": "available",
                    "time": "12:00",
                }
            ],
            listSuspect: [
                {
                    "_id": "5f7897b82d8b950041a08a49",
                    "suspectName": "KO CHRIS",
                },
                {

                    "_id": "5f742f099e6ed34b35839165",
                    "suspectName": "Ko Lao",
                }
            ],
            submissionData: {
            }
        }
        this.township = {
            1: [
                { value: "MA KA NA" },
                { value: "SAH BA TA" },
                { value: "WA MA NA" },
                { value: "SAH DA NA" },
                { value: "AH GA YA" },
                { value: "TA NA NA" },
                { value: "RA BHA YA" },
                { value: "KHA PHA NA" },
                { value: "SAH LA NA" },
                { value: "KA PA TA" },
                { value: "PA WA NA" },
                { value: "MA NYA NA" },
                { value: "HA PA NA" },
                { value: "MA KA TA" },
                { value: "KA MA NA" },
                { value: "KA MA TA" },
                { value: "BHA MA NA" },
                { value: "RA KA NA" },
                { value: "MA LA NA" },
                { value: "MA MA NA" },
                { value: "LA GA NA" },
                { value: "DA PHA YA" },
                { value: "MA SA NA" },
                { value: "PA TA AH" },
                { value: "MA KHA BA" },
                { value: "NA MA NA" },
                { value: "PA NA DA" },
                { value: "KHA BA DA" },
                { value: "SAH PA BA" },
            ],
            2: [
                { value: "LA KA NA" },
                { value: "DA MA SAH" },
                { value: "PHA RA SAH" },
                { value: "RA TA NA" },
                { value: "BA LA KHA" },
                { value: "PHA SAH NA" },
                { value: "MA SA NA" },
                { value: "RA THA NA" },
            ],
            3: [
                { value: "BA AH NA" },
                { value: "LA BA NA" },
                { value: "PA KA NA" },
                { value: "RA RA THA" },
                { value: "THA TA KA" },
                { value: "LA THA NA" },
                { value: "BA GA LA" },
                { value: "PHA PA NA" },
                { value: "KA MA MA" },
                { value: "KA KA RA" },
                { value: "KA SAH KA" },
                { value: "KA DA NA" },
                { value: "BA THA SAH" },
                { value: "MA WA TA" },
                { value: "SA KA LA" },
                { value: "WA LA MA" },
            ],
            4: [
                { value: "HA KHA NA" },
                { value: "HTA TA LA" },
                { value: "PHA LA NA" },
                { value: "RA KHA DA" },
                { value: "TA TA NA" },
                { value: "TA ZA NA" },
                { value: "KA KHA NA" },
                { value: "MA TA NA" },
                { value: "MA TA PA" },
                { value: "RA ZA NA" },
                { value: "KA PA LA" },
                { value: "PA LA WA" },
                { value: "SAH MA NA" },
            ],
            5: [
                { value: "SA KA NA" },
                { value: "MA MA TA" },
                { value: "MA MA NA" },
                { value: "RA BA NA" },
                { value: "WA LA NA" },
                { value: "KHA AU NA" },
                { value: "KA BA LA" },
                { value: "KA LA NA" },
                { value: "RA AU NA" },
                { value: "DA PA YA" },
                { value: "TA SAH NA" },
                { value: "KA MA NA" },
                { value: "MA RA NA" },
                { value: "KHA AU TA" },
                { value: "AH RA TA" },
                { value: "BA TA LA" },
                { value: "YA MA PA" },
                { value: "PA LA NA" },
                { value: "KA NA NA" },
                { value: "SAH LA KA" },
                { value: "KA THA NA" },
                { value: "HTA KHA NA" },
                { value: "AH TA NA" },
                { value: "BHA MA NA" },
                { value: "KA LA TA" },
                { value: "PA LA BA" },
                { value: "WA THA NA" },
                { value: "KA LA HTA" },
                { value: "KA LA WA" },
                { value: "MA KA NA" },
                { value: "TA MA NA" },
                { value: "KHA PA NA" },
                { value: "MA THA NA" },
                { value: "MA LA NA" },
                { value: "PHA PA NA" },
                { value: "KHA TA NA" },
                { value: "HA MA LA" },
                { value: "LA RA NA" },
                { value: "LA HA NA" },
                { value: "NA YA NA" },
                { value: "PA SAH NA" },
                { value: "DA HA NA" },
                { value: "MA PA LA" },
                { value: "HTA PA KHA" },
                { value: "SAH MA RA" },
            ],
            6: [
                { value: "HTA WA NA" },
                { value: "LA LA NA" },
                { value: "THA RA KHA" },
                { value: "RA PHA NA" },
                { value: "MA TA NA" },
                { value: "KA LA AH" },
                { value: "MA AH RA" },
                { value: "MA AH NA" },
                { value: "KA SA NA" },
                { value: "PA LA NA" },
                { value: "TA THA RA" },
                { value: "PA LA TA" },
                { value: "KA THA NA" },
                { value: "BA PA NA" },
                { value: "KHA MA KA" },
                { value: "PA KA MA" },
                { value: "KA RA RA" },
            ],
            7: [
                { value: "TA NGA NA" },
                { value: "RA TA RA" },
                { value: "HTA TA PA" },
                { value: "AH TA NA" },
                { value: "PHA MA NA" },
                { value: "KA KA NA" },
                { value: "PA KHA NA" },
                { value: "KA TA KHA" },
                { value: "RA KA NA" },
                { value: "NYA LA PA" },
                { value: "DA AU NA" },
                { value: "WA MA NA" },
                { value: "THA NA PA" },
                { value: "KA WA NA" },
                { value: "THA WA TA" },
                { value: "LA PA TA" },
                { value: "MA LA NA" },
                { value: "MA NYA NA" },
                { value: "AH HPA NA" },
                { value: "KA PA KA" },
                { value: "ZA KA NA" },
                { value: "NA TA LA" },
                { value: "PA MA NA" },
                { value: "THA KA NA" },
                { value: "RA TA NA" },
                { value: "PA TA TA" },
                { value: "PA TA NA" },
                { value: "PA KHA TA" },
            ],
            8: [
                { value: "MA KA NA" },
                { value: "RA NA KHA" },
                { value: "KHA MA NA" },
                { value: "NA MA NA" },
                { value: "MA THA NA" },
                { value: "TA TA KA" },
                { value: "MA BA NA" },
                { value: "PA PHA NA" },
                { value: "SA LA NA" },
                { value: "SA TA RA" },
                { value: "NGA PHA NA" },
                { value: "THA RA NA" },
                { value: "MA HTA NA" },
                { value: "AH LA NA" },
                { value: "KA MA NA" },
                { value: "MA TA NA" },
                { value: "SAH PA WA" },
                { value: "MA LA NA" },
                { value: "PA KHA KA" },
                { value: "RA SA KA" },
                { value: "MA MA NA" },
                { value: "PA MA NA" },
                { value: "SAH PHA NA" },
                { value: "GA GA NA" },
                { value: "SAH MA NA" },
                { value: "HTA LA NA" },
                { value: "KA HTA NA" },
            ],
            9: [
                { value: "MA NA MA" },
                { value: "AH MA ZA" },
                { value: "MA RA MA" },
                { value: "KHA AH ZA" },
                { value: "MA NA TA" },
                { value: "KHA MA SA" },
                { value: "MA RA TA" },
                { value: "MA HA MA" },
                { value: "PA KA KHA" },
                { value: "AH MA RA" },
                { value: "PA THA KA" },
                { value: "MA MA NA" },
                { value: "PA AU LA" },
                { value: "MA TA RA" },
                { value: "SA KA NA" },
                { value: "THA PA KA" },
                { value: "MA KA NA" },
                { value: "TA KA TA" },
                { value: "KA SAH NA" },
                { value: "SA KA TA" },
                { value: "MA THA NA" },
                { value: "TA TA AU" },
                { value: "MA KHA NA" },
                { value: "TA THA NA" },
                { value: "KA PA TA" },
                { value: "NA HTA KA" },
                { value: "NYA AU NA" },
                { value: "NGA ZA NA" },
                { value: "NGA THA RA" },
                { value: "MA HTA LA" },
                { value: "THA SA NA" },
                { value: "WA TA NA" },
                { value: "RA MA THA" },
                { value: "PA BA NA" },
                { value: "AU TA THA" },
                { value: "ZA YA THA" },
                { value: "PA BHA THA" },
                { value: "TA KA NA" },
                { value: "DA KHA THA" },
                { value: "ZA BHA THA" },
                { value: "PA MA NA" },
                { value: "LA WA NA" },
            ],
            10: [
                { value: "MA LA MA" },
                { value: "KA MA RA" },
                { value: "KHA SAH NA" },
                { value: "THA PHA RA" },
                { value: "MA DA NA" },
                { value: "RA MA NA" },
                { value: "LA MA NA" },
                { value: "KHA ZA NA" },
                { value: "THA HTA NA" },
                { value: "PA MA NA" },
                { value: "KA HTA NA" },
                { value: "BA LA NA" },
            ],
            11: [
                { value: "SA TA NA" },
                { value: "RA THA TA" },
                { value: "PA NAG KA" },
                { value: "PA TA NA" },
                { value: "MA AU NA" },
                { value: "MA PA NA" },
                { value: "KA TA NA" },
                { value: "MA PA TA" },
                { value: "MA TA NA" },
                { value: "BA THA TA" },
                { value: "TA PA WA" },
                { value: "KA PHA NA" },
                { value: "RA BHA NA" },
                { value: "MA AH NA" },
                { value: "AH MA NA" },
                { value: "THA TA NA" },
                { value: "TA KA NA" },
                { value: "MA AH TA" },
                { value: "GA MA NA" },
                { value: "KA TA LA" },
            ],
            12: [
                { value: "THA HGA KA" },
                { value: "RA KA NA" },
                { value: "AU KA TA" },
                { value: "AU KA MA" },
                { value: "THA KA TA" },
                { value: "DA PA NA" },
                { value: "TA MA NA" },
                { value: "PA ZA TA" },
                { value: "BHA TA HTA" },
                { value: "MA GA TA" },
                { value: "DA GA MA" },
                { value: "DA GA RA" },
                { value: "DA GA TA" },
                { value: "DA GA SAH" },
                { value: "KA TA TA" },
                { value: "PA BA TA" },
                { value: "LA MA TA" },
                { value: "LA THA NA" },
                { value: "AH LA NA" },
                { value: "KA MA TA" },
                { value: "SA KHA NA" },
                { value: "LA MA NA" },
                { value: "KA MA RA" },
                { value: "MA RA KA" },
                { value: "DA GA NA" },
                { value: "BHA HA NA" },
                { value: "SAH KA NA" },
                { value: "THA LA NA" },
                { value: "KA TA NA" },
                { value: "TA TA TA" },
                { value: "THA KHA NA" },
                { value: "KHA RA NA" },
                { value: "TA TA NA" },
                { value: "KA MA NA" },
                { value: "KA KHA KA" },
                { value: "DA LA NA" },
                { value: "SAH KA KHA" },
                { value: "KA KA KA" },
                { value: "AH SA NA" },
                { value: "MA GA DA" },
                { value: "MA BA NA" },
                { value: "LA KA NA" },
                { value: "TA KA NA" },
                { value: "HTA TA PA" },
                { value: "RA PA THA" },
                { value: "LA THA YA" },
            ],
            13: [
                { value: "TA KA NA" },
                { value: "HA PA NA" },
                { value: "NYA RA NA" },
                { value: "SAH SAH NA" },
                { value: "KA LA NA" },
                { value: "PA TA YA" },
                { value: "RA NGA NA" },
                { value: "RA SA NA" },
                { value: "PA LA NA" },
                { value: "PHA KHA NA" },
                { value: "KA TA LA" },
                { value: "NA TA RA" },
                { value: "AH TA NA" },
                { value: "LA LA NA" },
                { value: "LA KHA NA" },
                { value: "NA SA NA" },
                { value: "KA HA NA" },
                { value: "KA THA NA" },
                { value: "MA KA NA" },
                { value: "MA RA NA" },
                { value: "PA LA TA" },
                { value: "MA NA TA" },
                { value: "KHA LA NA" },
                { value: "KA LA DA" },
                { value: "MA SA NA" },
                { value: "LA KHA TA" },
                { value: "MA NA NA" },
                { value: "MA MA NA" },
                { value: "MA PA NA" },
                { value: "HA MA NA" },
                { value: "KA TA TA" },
                { value: "LA RA NA" },
                { value: "THA NA NA" },
                { value: "TA YA NA" },
                { value: "MA RA TA" },
                { value: "KA LA TA" },
                { value: "PA YA NA" },
                { value: "NA PHA NA" },
                { value: "MA PHA TA" },
                { value: "PA SAH NA" },
                { value: "MA KA HTA" },
                { value: "MA SAH TA" },
                { value: "NA KHA NA" },
                { value: "KA KHA NA" },
                { value: "TA MA NYA" },
                { value: "MA HA RA" },
                { value: "MA KA TA" },
                { value: "PA SAH TA" },
                { value: "KA MA NA" },
                { value: "THA PA NA" },
                { value: "NA KHA TA" },
                { value: "NA MA TA" },
                { value: "NA SAH NA" },
                { value: "MA TA TA" },
                { value: "MA NGA NA" },
                { value: "MA LA TA" },
                { value: "MA MA TA" },
                { value: "MA BA NA" },
                { value: "HA PA TA" },
                { value: "PA WA NA" },
                { value: "MA MA HTA" },
                { value: "NA TA NA" },
                { value: "PA LA HTA" },
                { value: "LA KA NA" },
                { value: "KA KA NA" },
                { value: "KHA RA HA" },
                { value: "MA HTA TA" },
                { value: "KA TA NA" },
                { value: "MA LA NA" },
                { value: "MA YA NA" },
                { value: "MA PA HTA" },
                { value: "MA KHA NA" },
                { value: "MA PA TA" },
                { value: "TA TA NA" },
                { value: "MA SAH NA" },
                { value: "MA KHA TA" },
                { value: "MA TA NA" },
                { value: "PA PA KA" },
                { value: "MA HTA NA" },
                { value: "MA PHA NA" },
                { value: "MA YA TA" },
                { value: "MA YA HTA" },
                { value: "TA KHA LA" },
                { value: "TA LA NA" },
                { value: "KA LA HTA" },
            ],
            14: [
                { value: "PA THA NA" },
                { value: "RA THA YA" },
                { value: "NGA SAH NA" },
                { value: "PA THA RA" },
                { value: "KA KA HTA" },
                { value: "NGA PA TA" },
                { value: "HA KA KA" },
                { value: "NGA RA KA" },
                { value: "THA PA NA" },
                { value: "KA KA NA" },
                { value: "RA KA NA" },
                { value: "NGA THA KHA" },
                { value: "KA PA NA" },
                { value: "HA THA TA" },
                { value: "ZA LA NA" },
                { value: "LA MA NA" },
                { value: "AH GA PA" },
                { value: "MA AH NA" },
                { value: "KA KHA NA" },
                { value: "MA AH PA" },
                { value: "PA TA NA" },
                { value: "NYA TA NA" },
                { value: "DHA NA PHA" },
                { value: "PHA PA NA" },
                { value: "AH MA TA" },
                { value: "BA KA LA" },
                { value: "KA LA NA" },
                { value: "DA DA RA" },
                { value: "LA PA TA" },
                { value: "PA SA LA" },
                { value: "MA MA KA" },
                { value: "MA MA NA" },
                { value: "AH MA NA" },
                { value: "WA KHA MA" },
            ],

        }
        this.getTestList = this.getTestList.bind(this)
        this.getFormComponents = this.getFormComponents.bind(this)
        this.getOrganizationList = this.getOrganizationList.bind(this)
    }

    componentDidMount() {

        const numbers = this.state.listCenter;
        const doubled = numbers.map((item) => item._id == '5f7a99a4beba03003b0138df');
        console.log("Item", doubled);

        // let teamsFromApi = numbers.map(team => if(item._id == '5f7a99a4beba03003b0138df'){

        // });

        numbers.map(function (d) {
            if (d._id == "5f7a99a4beba03003b0138df") {
                console.log("Array Data", d.name)
            }
        })

        var formID = this.props.match.params.formID;
        //  console.log("List Center", this.state.listCenter)
        // this.getTestList();
        //  this.getTodos();
        this.getFormComponents(formID);
    }

    changeElementColor(elementString) {
        // alert(elementString);
        //var obj = document.getElementsByClassName("fa-refresh");
        // alert(obj);
        // obj.style.backgroundColor = 'green';

        var fa = document.getElementsByClassName('fa-spin')[0].style.animation = "none";
        // fa.before="display:none";
        // document.getElementsByClassName('pixel').style.backgroundColor = "white";
    }

    submitFormData1 = (submission) => {

        const bodyData = submission.data;
        var nameTy = submission.data.type;

        Object.assign(bodyData, {
            type: "true",
        });

        submission.data[nameTy] = submission.data['type'];
        delete submission.data['type'];

        console.log("Submission", JSON.stringify(bodyData))


        //  {"type":"ICU","userName":"sdsaf","phone":"","email":"","password":"","submit":true,"roleICU":"admin"}

        // Object.assign(body, {
        //   patientId: this.props.selectPatient._id
        // });

        // window.history.go(-2);
        //  window.history.go(-4);
        // history.go(-1)
        //window.history.back();
        //  window.location.history(-1);

        // window.history.back();
        // window.location.replace("https://www.tutorialrepublic.com");

        var formID = this.props.match.params.formID;
        // console.log("submission Data", JSON.stringify(submission.data));

        let name = submission.data.name;
        console.log("Name", name)

        const image_data = submission.data.upload[0];

        var file = this.dataURLtoFile(image_data.url, image_data.name);
        console.log("file - type", file);

        var driverImage = submission.data.driverImage[0];

        //   if(driverImage)

        // let baseFile = null;
        // let fileName = "";
        // //convert file to base 64
        // let fileToLoad = file;
        // fileName = fileToLoad.name;
        // // FileReader function for read the file.
        // let fileReader = new FileReader();
        // fileReader.onload = function (fileLoadedEvent) {
        //     baseFile = fileLoadedEvent.target.result;
        //     console.log("Base File", baseFile);
        // };
        // fileReader.readAsDataURL(fileToLoad);

        // delete submission.data ['upload'];

        //  console.log("Delete Json",submission.data)

        var bodyFormData = new FormData();
        //  bodyFormData.append('brand', 'create');
        bodyFormData.append('plateNumber', submission.data.plateNumber);
        //   bodyFormData.append('color', '5f449759e9a1061265d2b2fe');
        bodyFormData.append('contactName', submission.data.contactName);
        bodyFormData.append("contactNumber", submission.data.contactNumber);
        bodyFormData.append('organization', submission.data.organization);
        bodyFormData.append('engineType', submission.data.engineType);
        bodyFormData.append('address', submission.data.address);
        bodyFormData.append('image', file);

        console.log("bodyFormData", JSON.stringify(bodyFormData))

        let url = `${configs.constant.HOST_NAME}`;
        let resquestBody = submission.data;

        axios({
            method: 'post',
            url: 'https://apiambulance.ayainnovation.com/' + 'api/car/register',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log("Response Data", JSON.stringify(response));

                if (response.data.errorCode === 0) {
                    console.log("Success", response.data.errorMsg)
                    this.setState({ errorCode: response })
                    alert("Successfully Sumitted")
                    //  window.location.history(-1);
                    //  window.postMessage("Success " + response.data.data.inserted.upload_avatar);
                }
                else {
                    console.log("Error", response)
                    alert("Failed to submit" + response)
                    //  window.postMessage("Error " + response);
                }
            })
            .catch(function (response) {
                //handle error
                console.log("Catch Data", response);
                // this.setState({errorCode:response})
            });

    }

    submitFormData(submission) {

        //console.log("Submission Data", JSON.stringify(submission.data))

        var bodyData = submission.data;
        console.log("Last Data", JSON.stringify(bodyData));

        var array = [];
        var test = '';

        // if (bodyData.testNameData.length > 0) {
        //     bodyData.testNameData.forEach((item, index) => {
        //         console.log("To upload", item);

        //         item.uploadImage.forEach(async (image, index) => {

        //             try {
        //                 let baseToFile = this.dataURLtoFile(image.url, image.name);
        //                 console.log(baseToFile);

        //                 var compressedBase64 = this.withAsyncBase(baseToFile);

        //                 //  let compressedFile = await imageCompression(baseToFile, options);
        //                 // console.log("compressedFile", compressedFile);
        //                 //  let compressedBase64 = await convertBlobToBase64(compressedFile);
        //                 // console.log("compressedBase64",compressedBase64);

        //                 Object.assign(image, {
        //                     url: compressedBase64,
        //                     size: 12132
        //                 });

        //                 console.log("modify image", image);

        //                 array.push(index);
        //                 console.log("array", array);

        //                 //   Object.assign(test,image.size);
        //                 test = "heelo";

        //             }
        //             catch (error) {
        //                 console.log(error)
        //             };
        //         })

        //         item["uploadID"] = test;
        //         //   item['uploadImage'].push('The Chamber of Secrets');

        //         //delete item["uploadImage"];
        //     })

        //     console.log("Modify Data", JSON.stringify(bodyData));
        // }


        console.log("Last Data", JSON.stringify(bodyData));

        // if (body.submit) delete body.submit;
        // api.authFetch
        //   .post('/investigation/create', body)
        //   .then(res => {
        //     console.log('RES', res);
        //     if (res.status === 200) {
        //       this.props.enqueueSnackbar('successfully submitted');
        //       this.props.history.push('/admin/icu/admissions?bedType=icu');
        //     }
        //   })
        //   .catch(error => console.log(error));
    };

    submitFormwab(submission) {

        console.log("Submission Data", JSON.stringify(submission.data))


        var body = submission.data;
        if (body.patientSymptom.length > 0) {
            body.patientSymptom.forEach((item, index) => {
                body.patientSymptom[index] = { [item]: true };
            })
        }

        if (body.patientHistory.length > 0) {
            body.patientHistory.forEach((item, index) => {
                body.patientHistory[index] = { [item]: true };
            })
        }

        console.log("Last Data", JSON.stringify(body));

    };

    submitAmbulanceData = (submission) => {

        console.log("Submission Data", JSON.stringify(submission.data));

        this.state.listCenter.map(function (d) {
            if (d._id == submission.data.testcenterId) {
                console.log("Array Data", d.name)
                submission.data['testcenterName'] = d.name;
            }
        })

        var date = dateFormat(submission.data.date, "yyyy-mm-dd")

        console.log(" datee", date);

        //var date = new Date(parseFloat(submission.data.date.substr(6)));

        // console.log("Date Date",new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'})
        // .format(submission.data.date));
        // console.log(" date", date);

        submission.data['date'] = date;

        // submission.data['testcenterName'] = 'new_value';

        // console.log("update submission Data", JSON.stringify(submission.data));

        const image_data = submission.data.upload[0];
        console.log("image_data", image_data)
        var driverImage = submission.data.driverImage;
        console.log("driverImage", driverImage)
        var wheelImage = null;

        if (driverImage.length > 0) {
            //console.log("Image", driverImage)
            wheelImage = this.dataURLtoFile(driverImage[0].url, driverImage[0].name);
            console.log("file - wheelImage", wheelImage);
        }

        var file = this.dataURLtoFile(image_data.url, image_data.name);
        console.log("file - type", file);

        var bodyFormData = new FormData();
        bodyFormData.append('plateNumber', submission.data.plateNumber);
        bodyFormData.append('contactName', submission.data.contactName);
        bodyFormData.append("contactNumber", submission.data.contactNumber);
        bodyFormData.append('organization', submission.data.organization);
        bodyFormData.append('engineType', submission.data.engineType);
        bodyFormData.append('address', submission.data.address);
        bodyFormData.append('image', file);
        bodyFormData.append('driverImage', wheelImage);
        bodyFormData.append('otherOrganization', submission.data.otherOrganization);

        //  console.log("bodyFormData", JSON.stringify(bodyFormData))

        // axios({
        //     method: 'post',
        //     url: 'https://apiambulance.ayainnovation.com/test' + 'api/car/register',
        //     data: bodyFormData,
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log("Response Data", JSON.stringify(response));

        //         if (response.data.errorCode === 0) {
        //             console.log("Success", response.data.errorMsg)
        //            // alert("Successfully Sumitted")

        //            window.history.go(1);
        //         }
        //         else {
        //             console.log("Error", response)
        //             alert("Failed to submit" + response.data.errorMsg)
        //         }
        //     })
        //     .catch(function (response) {
        //         console.log("Catch Data", response);
        //     });

    }

    test() {
        fetch('url' + 'api/university/forms/getComponents', 'requestOptions')
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    if (data.data.displayType === 'form') {
                        let components = data.data.components.components
                        components.forEach(async (field, index) => {
                            if (field.type === 'select') {
                                if (field.key === 'organization') {
                                    console.log('await')
                                    let options = await fetch('https://jovial-euler-0d7607.netlify.app/api/listOrganization?skip=0&limit=20');
                                    options = await options.json();
                                    if (options.errorMsg === 'Success') {
                                        components[index].data.values = options.data
                                    }
                                }
                            }
                        })
                        console.log(components)
                        data.data.components.components = components
                        this.setState({ form: data.data.components });
                    }
                    else {
                        let components = data.data.components.components
                        console.log("Wizard", components);
                    }
                }
            });
    }

    withAsyncAwait = async (imageFile) => {

        const options = {
            maxWidthOrHeight: 200,
            useWebWorker: true
        }
        let base64data = '';
        let compressedFile = await imageCompression(imageFile, options);
        let baseData = await convertBlobToBase64(compressedFile);
        // let toBase64 = new Promise((resolve, reject) => {

        //     var reader = new FileReader();
        //     reader.readAsDataURL(compressedFile);
        //     // reader.onloadend = function () {
        //     //     base64data = reader.result;
        //     //       console.log("base",base64data);
        //     // }
        //     reader.onload = () => {
        //         resolve(reader.result);
        //       };
        //     reader.onerror = error => reject(error);

        // });


        return baseData;
    };

    withAsyncBase = async (baseToFile) => {

        const options = {
            maxWidthOrHeight: 200
        }

        let compressedFile = await imageCompression(baseToFile, options);
        console.log("compressedFile", compressedFile);
        let compressedBase64 = await convertBlobToBase64(compressedFile);
        console.log("compressedBase64", compressedBase64);
    };


    uploadFile(file) {
        try {
            let formData = new FormData();
            formData.append('files', file);

            console.log("File Data", formData)
            // let rs = await request.upload(`/api/file/upload-file`, formData);
            // if (this.props.onChange) {
            //     this.props.onChange(rs.created[0].id);
            // }

            this.setState({ fileUpload: file })
        } catch (err) {
            // helper.alert(err.message);
            console.log(err)

        }
    }

    uploadAction() {

        var body = {
            userName: 'Fred',
            userEmail: 'Flintstone@gmail.com'
        }

        axios({
            method: 'post',
            url: 'myurl',
            data: body,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    onchangeevent = (event) => {
        console.log("on cahnge", event);
        let data = event.data;
        if (event.changed && event.changed.component.key === 'select' && event.changed.value) {
            fetch('https://dev-moe-api.ayainnovation.com/api/university/getYears/5f449786e9a1061265d2b300', {
                headers: {
                    'content-type': 'application/json'
                },
            })
                .then(function (response) {
                    response.json().then(function (result) {
                        if (result.err == 200) {
                            var submission = { data: event.data };
                            submission.data.full_name = 'your are the best';
                        }
                        else {
                            // show data is empty 
                        }
                    });
                });
        }

    }

    getFormComponents = (formID) => {

        const requestOptions = {
            method: 'Post',
            body: JSON.stringify({
                formId: formID,
            })
        };

        fetch('https://dev-moe-api.ayainnovation.com/api/university/forms/getComponents', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    let components = data.data.components.components
                    console.log("Test Name Data", components)

                    components.forEach(item => {
                        if (item.key == 'personId') {
                            item.defaultValue = '1234';
                        }
                        if (item.key == 'appointmentCode') {
                            item.defaultValue = 'appointmentCode';
                        }
                        if (item.key == 'patientName') {
                            item.defaultValue = 'patientName';
                        }
                        if (item.key == 'nationalId') {
                            item.defaultValue = 'nationalId';
                        }
                    })

                    // var custom = components[4];
                    // console.log(custom.customDefaultValue);

                    // var thisValues =
                    //     [
                    //         { value: "CP", testNames: "CP" },
                    //         { value: "USG", testNames: "USG" },
                    //         { value: "LFT", testNames: "LFT" }
                    //     ]

                    // var value = thisValues;

                    // custom.customDefaultValue = value;
                    this.setState({ form: data.data.components });
                }
            });

    }

    getFormComponentsNRIC = (formID) => {

        const requestOptions = {
            method: 'Post',
            body: JSON.stringify({
                formId: formID,
            })
        };

        fetch('https://dev-moe-api.ayainnovation.com/api/university/forms/getComponents', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    let components = data.data.components.components
                    components.forEach((field, index) => {
                        console.log("Field Compoent", field)
                        /// check column name important
                        if (field.key === "testcenterId") {
                            console.log("list center", this.state.listCenter)
                            field.data.values = this.state.listCenter;
                        }
                        if (field.key === "suspectId") {
                            console.log("components suspect", field)
                            field.data.values = this.state.listSuspect
                        }
                    })
                    //  data.data.components.components = components
                    this.setState({ form: data.data.components });
                }

                if (data.data.displayType === 'form') {
                    let components = data.data.components.components
                    components.forEach(async (field, index) => {
                        if (field.type === 'select') {
                            if (field.key === 'organization') {
                                console.log('await')
                                let options = await fetch('https://jovial-euler-0d7607.netlify.app/api/listOrganization?skip=0&limit=20');
                                options = await options.json();
                                if (options.errorMsg === 'Success') {
                                    components[index].data.values = options.data
                                }
                            }
                        }
                    })
                    console.log(components)
                    data.data.components.components = components
                    this.setState({ form: data.data.components });
                }
                else {
                    let components = data.data.components.components
                    let componentsForm = components[0].components;

                    console.log("Wizard componentsForm", componentsForm);
                    componentsForm.forEach((nrcfield, index) => {
                        if (nrcfield.key === 'nric') {
                            console.log("field", nrcfield);
                            var stateData = nrcfield.components[0];
                            console.log("stateData", stateData);
                        }
                    })

                    this.setState({ form: data.data.components });
                }
            });

    }

    getFormComponentForAmbulance = (formID) => {
        const requestOptions = {
            method: 'Post',
            body: JSON.stringify({
                formId: formID,
            })
        };

        console.log("List Or", this.state.listOrganization)

        fetch('https://dev-moe-api.ayainnovation.com/api/university/forms/getComponents', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    if (data.data.displayType === 'form') {

                        let components = data.data.components.components
                        components.forEach((field, index) => {
                            //  console.log("Field", field)
                            /// check column name important
                            if (field.type === 'select') {
                                if (field.key === 'organization') {
                                    console.log('await');
                                    // let options = await fetch(
                                    //     // 'https://thuwana-q.herokuapp.com/tent/list/names'
                                    //     'http://localhost:3000/tent/list/names'
                                    // );
                                    // options = await options.json();
                                    // if (options.message === 'success') {
                                    //     components[index].data.values = options.data;
                                    // }

                                    // components[index].data.values = this.state.listOrganization1;
                                }
                            }
                            // if (field.key === "organization") {
                            //     field.columns.forEach((column, index) => {
                            //         console.log("components", field)
                            //         column.components.forEach((field, index) => {
                            //             if (field.type = 'textfield') {
                            //                 if (field.key === 'patientName') {
                            //                     console.log("Last Field", field)
                            //                     //please set your data
                            //                     field.defaultValue = 'Hello ';
                            //                 }
                            //             }
                            //         })
                            //     })
                            // }
                        })
                        console.log(components)
                        data.data.components.components = components
                        this.setState({ form: data.data.components });
                    }

                }
            });

    }

    getOrganizationList = () => {
        const requestOptions = {
            method: 'GET',
        };

        fetch('https://apiambulance.ayainnovation.com/api/listOrganization?skip=0&limit=100', requestOptions)
            .then(response => response.json())
            .then(responseDate => {
                console.log("Response Data", JSON.stringify(responseDate));

                // if (data.errorCode === 0) {
                //    this.setState({listOrganization:data.data})
                // }
                this.setState({ errorCode: responseDate.errorMsg })
                this.setState({ listOrganization: responseDate.data })
            });
        //.then(re=>console.log("Response",re))

        //  console.log("List Or", this.state.listOrganization)
    }

    getTestList = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjAxODcwNDQ4LCJleHAiOjE2MDE5NTY4NDh9.lhrFjmrgtrk7Ni3ELyEayazvXCh4RxIPtO2HharlVoE' }
        };
        //appointment/timelist?testcenterId=5f7af41397f896003201a18b
        fetch('https://thuwana-q.herokuapp.com/appointment/timelist?testcenterId=5f7af41397f896003201a18b', requestOptions)
            .then(response => response.json())
            .then(responseDate => {
                console.log("Response Data", JSON.stringify(responseDate));
                // this.setState({ listCenter: responseDate.data })
            });
    }

    async getTodos() {
        const requestOptionsList = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjAxODcwNDQ4LCJleHAiOjE2MDE5NTY4NDh9.lhrFjmrgtrk7Ni3ELyEayazvXCh4RxIPtO2HharlVoE' }
        };

        let data = await axios
            .get("https://thuwana-q.herokuapp.com/testCenter", requestOptionsList)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ listCenter: data.data.data })
    }

    async handleChange1(event) {

        //  console.log("Event Chnage", event.data)

        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjAxODcwNDQ4LCJleHAiOjE2MDE5NTY4NDh9.lhrFjmrgtrk7Ni3ELyEayazvXCh4RxIPtO2HharlVoE' }
        };

        let listTime = [
            {
                "status": "available",
                "time": "10:00",
            },
            {

                "status": "available",
                "time": "12:00",
            }
        ];

        let listTime1 = [
            {
                "status": "available",
                "time": "8:00",
            },
            {

                "status": "available",
                "time": "9:00",
            }
        ];

        if (this.props.match.params.formID === '5f79e7f88dbf115175bcb9b6') {
            let change = event.data

            console.log("Change", change.testcenterId)
            console.log("appointmentTime", change.appointmentTime)

            if (change.appointmentTime) {
                change.appointmentTime = 'hello';
            }

            if (change.testcenterId) {
                let form = this.state.form;
                // let values = await fetch('https://thuwana-q.herokuapp.com/appointment/timelist?testcenterId=' + change.testcenterId,requestOptions);
                //  values = await values.json();
                //  console.log("values",values)
                console.log("Form components", form.components[4])
                form.components.forEach((item, index) => {
                    if (item.key == 'appointmentTime') {

                        if (change.appointmentTime) {
                            change.appointmentTime = 'hello';
                        }

                        if (change.testcenterId == '5f7a99a4beba03003b0138df') {
                            item.data = { values: listTime }
                        }

                        else {
                            item.data = { values: listTime1 }
                        }
                        console.log("Item Data", item.data)
                    }

                })
            }
        }

        console.log("Change", event.data)
    }

    async handleChange(event) {
        var change = event.data;

        console.log(" Change", change)

        // if (change.e) {

        //     const page = this.state.form.components[0];
        //     console.log(" Page1", page)
        //     page.components.forEach(cmp => {
        //         if (cmp.key === 'columns') {
        //             console.log(" Page EVM", cmp)
        //             let totalCol = cmp.columns[4];
        //             let totalCmp = totalCol.components[0];
        //             console.log('col', totalCmp);
        //             totalCmp.total = "30";
        //             totalCmp.placeholder = "30";
        //             totalCmp.defaultValue = "defaultValue"
        //             // var submission = { data: event.data };
        //             change.total = '90';
        //         }
        //     });
        // }
        // console.log("Change", event.data)
    }

    render() {
        //  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

        console.log("Form Components", JSON.stringify(this.state.form))
        return (
            <div class="container">
                {/* <FormIO
                    form={this.state.form}
                    //   onSubmit={(submission) => this.submitFormwab(submission)}
                    onSubmitDone={(submission) => {
                        // this.submitFormData(submission)
                    }}

                    onChange={(event) => {
                        this.handleChange(event)
                    }}
                /> */}

                <FormIO
                    form={this.state.form}
                    //all form props
                    submission={{ data: this.state.submissionData }}
                    onSubmit={(submission) => {

                        this.submitFormwab(submission)
                        var promise1 = new Promise((resolve, reject) => {
                            setTimeout(function () {
                                resolve("foo");
                            }, 300);
                        });

                        promise1.then((value) => {
                            // Reset submission data
                            this.setState({ submissionData: {} })
                        });

                    }}
                />
            </div>
        );
    }
}


export default RegistrationForm;  