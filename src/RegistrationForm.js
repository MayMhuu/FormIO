import React, { useState } from "react";
import { Form } from "react-formio";
import { ExternalLink } from 'react-external-link';
import { Route } from 'react-router-dom'

function RegistrationForm() {
    const [submission, setSubmission] = useState({});
    const [show, setHide] = useState(false);

    return (
        <div className="App">

            {
                !show ?
                    <Form
                        form={{
                            display: "wizard",
                            customClass: "justify-content-center",
                            components: [
                                {
                                    "title": "",
                                    "theme": "success",
                                    "breadcrumbClickable": true,
                                    "buttonSettings": {
                                        "previous": true,
                                        "cancel": true,
                                        "next": true
                                    },
                                    "collapsible": false,
                                    "tableView": false,
                                    "key": "page1",
                                    "type": "panel",
                                    "label": "Page 1",
                                    "components": [
                                        {
                                            "label": "HTML",
                                            "className": "custom-header",
                                            "attrs": [
                                                {
                                                    "attr": "",
                                                    "value": ""
                                                }
                                            ],
                                            "content": "Fill your personal informations",
                                            "refreshOnChange": false,
                                            "tableView": false,
                                            "key": "html2",
                                            "type": "htmlelement",
                                            "input": false
                                        },
                                        {
                                            "label": "Upload",
                                            "customClass": "custom-upload",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "storage": "base64",
                                            "image": true,
                                            "webcam": false,
                                            "fileTypes": [
                                                {
                                                    "label": "",
                                                    "value": ""
                                                }
                                            ],
                                            "key": "upload",
                                            "type": "file",
                                            "input": true
                                        },
                                        {
                                            "label": "Year Level (*)",
                                            "widget": "choicesjs",
                                            "placeholder": "Year Level (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "data": {
                                                "values": [
                                                    {
                                                        "label": "First Year",
                                                        "value": "firstYear"
                                                    },
                                                    {
                                                        "label": "Second Year",
                                                        "value": "secondYear"
                                                    },
                                                    {
                                                        "label": "Third Year",
                                                        "value": "thirdYear"
                                                    }
                                                ]
                                            },
                                            "selectThreshold": 0.3,
                                            "key": "yearLevel",
                                            "type": "select",
                                            "indexeddb": {
                                                "filter": {

                                                }
                                            },
                                            "input": true
                                        },
                                        {
                                            "label": "Major (*)",
                                            "widget": "choicesjs",
                                            "placeholder": "Major (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "data": {
                                                "values": [
                                                    {
                                                        "label": "Computer Science",
                                                        "value": "cs"
                                                    },
                                                    {
                                                        "label": "Computer Technology",
                                                        "value": "ct"
                                                    }
                                                ]
                                            },
                                            "selectThreshold": 0.3,
                                            "key": "major",
                                            "type": "select",
                                            "indexeddb": {
                                                "filter": {

                                                }
                                            },
                                            "input": true
                                        },
                                        {
                                            "label": "Full Name (*)",
                                            "placeholder": "Full Name (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "fullName",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Father Name (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Mother Name (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField1",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Date / Time",
                                            "format": "yyyy-MM-dd",
                                            "hideLabel": true,
                                            "tableView": false,
                                            "enableDate": false,
                                            "customClass": "custom-date",
                                            "enableMinDateInput": false,
                                            "datePicker": {
                                                "disableWeekends": false,
                                                "disableWeekdays": false
                                            },
                                            "enableMaxDateInput": false,
                                            "enableTime": false,
                                            "key": "dateTime",
                                            "type": "datetime",
                                            "input": true,
                                            "widget": {
                                                "type": "calendar",
                                                "displayInTimezone": "viewer",
                                                "language": "en",
                                                "useLocaleSettings": false,
                                                "allowInput": true,
                                                "mode": "single",
                                                "enableTime": false,
                                                "noCalendar": true,
                                                "format": "yyyy-MM-dd",
                                                "hourIncrement": 1,
                                                "minuteIncrement": 1,
                                                "time_24hr": false,
                                                "disableWeekends": false,
                                                "disableWeekdays": false
                                            }
                                        },
                                        {
                                            "label": "Day",
                                            "hideInputLabels": true,
                                            "inputsLabelPosition": "top",
                                            "useLocaleSettings": false,
                                            "hideLabel": true,
                                            "tableView": false,
                                            "fields": {
                                                "day": {
                                                    "placeholder": "Select Day (*)",
                                                    "hide": false
                                                },
                                                "month": {
                                                    "placeholder": "Select Month (*)",
                                                    "hide": false
                                                },
                                                "year": {
                                                    "placeholder": "Select Year (*)",
                                                    "hide": false
                                                }
                                            },
                                            "defaultValue": "00/00/0000",
                                            "key": "day",
                                            "type": "day",
                                            "input": true
                                        },
                                        {
                                            "label": "Gender",
                                            "optionsLabelPosition": "right",
                                            "inline": false,
                                            "tableView": true,
                                            "defaultValue": "male",
                                            "values": [
                                                {
                                                    "label": "Male",
                                                    "value": "male",
                                                    "shortcut": ""
                                                },
                                                {
                                                    "label": "Female",
                                                    "value": "female",
                                                    "shortcut": ""
                                                }
                                            ],
                                            "key": "gender",
                                            "type": "radio",
                                            "input": true
                                        },
                                        {
                                            "label": "Select your NRIC type(*)",
                                            "optionsLabelPosition": "right",
                                            "inline": false,
                                            "tableView": true,
                                            "defaultValue": "nric",
                                            "values": [
                                                {
                                                    "label": "NRIC",
                                                    "value": "nric",
                                                    "shortcut": ""
                                                },
                                                {
                                                    "label": "Passport",
                                                    "value": "passport",
                                                    "shortcut": ""
                                                },
                                                {
                                                    "label": "Other",
                                                    "value": "other",
                                                    "shortcut": ""
                                                }
                                            ],
                                            "dataType": "string",
                                            "key": "radio",
                                            "type": "radio",
                                            "input": true
                                        },
                                        {
                                            "label": "Container",
                                            "hidden": true,
                                            "tableView": true,
                                            "key": "container",
                                            "conditional": {
                                                "show": true,
                                                "when": "radio",
                                                "eq": "nric"
                                            },
                                            "type": "container",
                                            "input": true,
                                            "components": [
                                                {
                                                    "label": "Select",
                                                    "widget": "choicesjs",
                                                    "placeholder": "1/",
                                                    "hideLabel": true,
                                                    "tableView": true,
                                                    "defaultValue": 1,
                                                    "data": {
                                                        "values": [
                                                            {
                                                                "label": "1/",
                                                                "value": "1"
                                                            },
                                                            {
                                                                "label": "2/",
                                                                "value": "2"
                                                            },
                                                            {
                                                                "label": "3/",
                                                                "value": "3"
                                                            },
                                                            {
                                                                "label": "4/",
                                                                "value": "4"
                                                            }
                                                        ]
                                                    },
                                                    "selectThreshold": 0.3,
                                                    "key": "select",
                                                    "type": "select",
                                                    "indexeddb": {
                                                        "filter": {

                                                        }
                                                    },
                                                    "input": true
                                                },
                                                {
                                                    "label": "Select",
                                                    "placeholder": "PaMaNa",
                                                    "hideLabel": true,
                                                    "tableView": true,
                                                    "data": {
                                                        "values": [
                                                            {
                                                                "label": "PaMaNa",
                                                                "value": "paMaNa"
                                                            },
                                                            {
                                                                "label": "AhSaNa",
                                                                "value": "ahSaNa"
                                                            },
                                                            {
                                                                "label": "KaMaNa",
                                                                "value": "kaMaNa"
                                                            }
                                                        ]
                                                    },
                                                    "selectThreshold": 0.3,
                                                    "key": "select1",
                                                    "type": "select",
                                                    "indexeddb": {
                                                        "filter": {

                                                        }
                                                    },
                                                    "input": true,
                                                    "defaultValue": "paMaNa"
                                                },
                                                {
                                                    "label": "Select",
                                                    "placeholder": "N",
                                                    "hideLabel": true,
                                                    "tableView": true,
                                                    "data": {
                                                        "values": [
                                                            {
                                                                "label": "N",
                                                                "value": "n"
                                                            },
                                                            {
                                                                "label": "P",
                                                                "value": "p"
                                                            }
                                                        ]
                                                    },
                                                    "selectThreshold": 0.3,
                                                    "key": "select2",
                                                    "type": "select",
                                                    "indexeddb": {
                                                        "filter": {

                                                        }
                                                    },
                                                    "input": true,
                                                    "defaultValue": "n"
                                                },
                                                {
                                                    "label": "Text Field",
                                                    "placeholder": "NRC Number (*)",
                                                    "hideLabel": true,
                                                    "tableView": true,
                                                    "key": "textField2",
                                                    "type": "textfield",
                                                    "input": true
                                                }
                                            ]
                                        },
                                        {
                                            "label": "Container",
                                            "hidden": true,
                                            "tableView": true,
                                            "key": "container1",
                                            "conditional": {
                                                "show": true,
                                                "when": "radio",
                                                "eq": "passport"
                                            },
                                            "type": "container",
                                            "input": true,
                                            "components": [
                                                {
                                                    "label": "Text Field",
                                                    "placeholder": "Passport Number (*)",
                                                    "hideLabel": true,
                                                    "tableView": true,
                                                    "key": "textField",
                                                    "type": "textfield",
                                                    "input": true
                                                }
                                            ]
                                        },
                                        {
                                            "label": "Container",
                                            "hidden": true,
                                            "tableView": false,
                                            "key": "container2",
                                            "conditional": {
                                                "show": true,
                                                "when": "radio",
                                                "eq": "other"
                                            },
                                            "type": "container",
                                            "input": true,
                                            "components": [
                                                {
                                                    "label": "Text Field",
                                                    "placeholder": "Identity Card",
                                                    "hideLabel": true,
                                                    "tableView": true,
                                                    "key": "textField",
                                                    "type": "textfield",
                                                    "input": true
                                                }
                                            ]
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Race (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField3",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Citizen (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField4",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Religion (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField5",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Phone Number",
                                            "placeholder": "Phone Number (*)",
                                            "inputMask": "(95) 9999-9999-999",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "phoneNumber",
                                            "type": "phoneNumber",
                                            "input": true
                                        },
                                        {
                                            "label": "Email",
                                            "placeholder": "Email (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "email",
                                            "type": "email",
                                            "input": true,
                                            
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Current Address (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField6",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Permanent Address (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField7",
                                            "type": "textfield",
                                            "input": true
                                        }
                                    ],
                                    "input": false
                                },
                                {
                                    "title": "",
                                    "theme": "success",
                                    "breadcrumbClickable": true,
                                    "buttonSettings": {
                                        "previous": true,
                                        "cancel": true,
                                        "next": true
                                    },
                                    "collapsible": false,
                                    "tableView": false,
                                    "key": "page2",
                                    "type": "panel",
                                    "label": "Page 2",
                                    "components": [
                                        {
                                            "label": "HTML",
                                            "className": "custom-header",
                                            "attrs": [
                                                {
                                                    "attr": "",
                                                    "value": ""
                                                }
                                            ],
                                            "content": "Fill your Matriculation exam informations",
                                            "refreshOnChange": false,
                                            "tableView": false,
                                            "key": "html3",
                                            "type": "htmlelement",
                                            "input": false
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Matriculation Roll Number (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField8",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Select",
                                            "widget": "choicesjs",
                                            "placeholder": "Passed Year (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "data": {
                                                "values": [
                                                    {
                                                        "label": "2010",
                                                        "value": "2010"
                                                    },
                                                    {
                                                        "label": "2011",
                                                        "value": "2011"
                                                    },
                                                    {
                                                        "label": "2012",
                                                        "value": "2012"
                                                    }
                                                ]
                                            },
                                            "selectThreshold": 0.3,
                                            "key": "select3",
                                            "type": "select",
                                            "indexeddb": {
                                                "filter": {

                                                }
                                            },
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Exam Center (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField9",
                                            "type": "textfield",
                                            "input": true
                                        }
                                    ],
                                    "input": false
                                },
                                {
                                    "title": "",
                                    "theme": "success",
                                    "breadcrumbClickable": true,
                                    "buttonSettings": {
                                        "previous": true,
                                        "cancel": true,
                                        "next": true
                                    },
                                    "collapsible": false,
                                    "tableView": false,
                                    "key": "page3",
                                    "type": "panel",
                                    "label": "Page 3",
                                    "input": false,
                                    "components": [
                                        {
                                            "label": "HTML",
                                            "className": "custom-header",
                                            "attrs": [
                                                {
                                                    "attr": "",
                                                    "value": ""
                                                }
                                            ],
                                            "content": "Fill information for person who will support",
                                            "refreshOnChange": false,
                                            "tableView": false,
                                            "key": "html1",
                                            "type": "htmlelement",
                                            "input": false
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Name (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField10",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Relation (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField11",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Job (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField12",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Phone Number (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField13",
                                            "type": "textfield",
                                            "input": true
                                        },
                                        {
                                            "label": "Text Field",
                                            "placeholder": "Address (*)",
                                            "hideLabel": true,
                                            "tableView": true,
                                            "key": "textField14",
                                            "type": "textfield",
                                            "input": true
                                        }
                                    ]
                                },
                                {
                                    "title": "",
                                    "theme": "success",
                                    "breadcrumbClickable": true,
                                    "buttonSettings": {
                                        "previous": true,
                                        "cancel": true,
                                        "next": true
                                    },
                                    "collapsible": false,
                                    "tableView": false,
                                    "key": "page4",
                                    "type": "panel",
                                    "label": "Page 4",
                                    "input": false,
                                    "components": [
                                        {
                                            "label": "HTML",
                                            "className": "custom-header",
                                            "attrs": [
                                                {
                                                    "attr": "",
                                                    "value": ""
                                                }
                                            ],
                                            "content": "Please check the following points",
                                            "refreshOnChange": false,
                                            "tableView": false,
                                            "key": "html",
                                            "type": "htmlelement",
                                            "input": false
                                        },
                                        {
                                            "label": "HTML",
                                            "attrs": [
                                                {
                                                    "attr": "",
                                                    "value": ""
                                                }
                                            ],
                                            "content": "1. All of informations are true<br>\n2. Your parent or guardians already allowed to study in this university<br>\n3. Your parent or guardians already allowed  to give student’s fees <br>\n4. You agreed terms and conditions",
                                            "refreshOnChange": false,
                                            "tableView": false,
                                            "key": "html5",
                                            "type": "htmlelement",
                                            "input": false
                                        }
                                    ]
                                },
                                {
                                    "title": "",
                                    "theme": "success",
                                    "breadcrumbClickable": true,
                                    "buttonSettings": {
                                        "previous": true,
                                        "cancel": true,
                                        "next": true
                                    },
                                    "collapsible": false,
                                    "tableView": false,
                                    "key": "page5",
                                    "type": "panel",
                                    "label": "Page 5",
                                    "input": false,
                                    "components": [
                                        {
                                            "label": "HTML",
                                            "className": "custom-header",
                                            "attrs": [
                                                {
                                                    "attr": "",
                                                    "value": ""
                                                }
                                            ],
                                            "content": "Please draw your signature",
                                            "refreshOnChange": false,
                                            "tableView": false,
                                            "key": "html4",
                                            "type": "htmlelement",
                                            "input": false
                                        },
                                        {
                                            "label": "Please draw your signature",
                                            "hideLabel": true,
                                            "tableView": false,
                                            "key": "pleaseDrawYourSignature1",
                                            "type": "signature",
                                            "input": true
                                        }
                                    ]
                                }
                            ]
                        }}
                        submission={{ data: submission }}
                        onSubmit={a => {
                            console.log(a);
                            // setHide(true)
                        }}

                        onSubmitDone={a => {
                            setHide(true)
                        }}
                        onCustomEvent={customEvent => {
                            console.log(customEvent);
                            // callnew()
                            setSubmission({ ...customEvent.data, lastName: "Laaast Name" });
                        }}
                    />
                    :
                    <Route exact path="/" render={() => (window.location = "https://example.com")} />
            }
        </div>
    );
}

export default RegistrationForm;