import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from './../../../environments/environment'
import { Location } from '@angular/common';
import * as moment from 'moment'
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
declare var $: any;

@Component({
  selector: 'app-db-documents',
  templateUrl: './db-documents.component.html',
  styleUrls: ['./db-documents.component.scss']
})
export class DbDocumentsComponent implements OnInit {
  investor
  Note
  authService
  client_data
  in_arr
  client_id_
  risk_profiler_documents = []
  disclosure_documents = []
  letterAuthority = []
  otherDocuments = []
  reviewDocuments = []
  recordOfAdviceDocuments = []
  planningDocuments = []
  id_documents = []
  env = environment
  document_type_pdf: any;
  customFiles = []
  folder_name
  folder_name_outer

  // custom
  id
  levelNo
  levelName
  levelName2
  levelName3
  levelName4
  levelName5
  index
  index2
  index3
  index4
  index5
  bank_document: [];
  address_document: [];

  // search docs
  search: any

  // Custom documents
  custom_document = {
    broker_appointment: [],
    disclosure: [],
    authority_letter: [],
    address: [],
    bank_details: [],
    record_of_advice: [],
    risk_profiler: [],
    document_id: [],
    planning: [],
    reviews: [],
  }

  planningTemp = []
  document_type: any;
  saveFolder = false
  saveCreateFolder = false
  saveCreateFolderDoc = false
  saveOuterFolderDoc = false
  broker_documents: any;
  constructor(private route: ActivatedRoute, private _location: Location, private service: AuthService, private router: Router, private toastr: ToastrService) {
    this.authService = service;
  }


  ngOnInit() {
    this.getInvestor()
    this.client_id_ = this.route.snapshot.params.id;

  }

  getInvestor() {

    var ob = {
      client_id: this.route.snapshot.params.id,
    };
    console.log(ob)
    this.authService.clientProfileData(ob).subscribe(data => {

      if (data) {
        console.log(data)
        this.client_data = data.data;
        this.investor = data.data;
        this.getDocuments({})
        this.getCustomFiles({});
        this.getCustomDocuments({});
      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  }


  getDocuments(params) {

    var ob = {
      investor_id: this.investor.id,
    };
    console.log(ob)
    this.authService.getDocuments(ob).subscribe(data => {

      if (data.success == 1) {
        console.log(data)
        this.risk_profiler_documents = data.risk_profiler;
        this.disclosure_documents = data.disclosure;
        this.id_documents = data.ids;
        this.letterAuthority = data.letter_of_autority;
        this.otherDocuments = data.others_documents
        this.reviewDocuments = data.reviews_documents
        this.recordOfAdviceDocuments = data.record_of_advice_documents
        this.planningDocuments = data.plainning_documents
        this.bank_document = data.proof_of_banking,
        this.address_document = data.proof_of_address
        this.broker_documents = data.broker_appointment

        // this.custom_document.broker_appoinment.push({
        //   id :10,
        //   name : "Folder 1",
        //   file_type : "folder",
        //   priority : 2,
        //   level2:[]
        // })
        // this.custom_document.disclosure.push({
        //   id :10,
        //   name : "Folder 1",
        //   file_type : "folder",
        //   priority : 2,
        //   level2:[]
        // })

      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  }
  getCustomDocuments(params) {

    var ob = {
      investor_id: this.investor.id,
    };
    console.log(ob)
    this.authService.getCustomDocuments(ob).subscribe(data => {

      if (data.success == 1) {
        console.log(data)
        this.custom_document.disclosure = data.disclosure;
        this.custom_document.broker_appointment = data.broker_appointment;
        this.custom_document.document_id = data.ids;
        this.custom_document.authority_letter = data.letter_of_autority;
        this.custom_document.address = data.proof_of_address
        this.custom_document.bank_details = data.proof_of_banking
        this.custom_document.record_of_advice = data.record_of_advice_documents
        this.custom_document.planning = data.plainning_documents
        this.custom_document.risk_profiler = data.risk_profiler;
        this.custom_document.reviews = data.reviews_documents;
        // this.id_documents = data.ids;
        // this.otherDocuments = data.others_documents
        // this.reviewDocuments = data.reviews_documents

        // this.custom_document.broker_appoinment.push({
        //   id :10,
        //   name : "Folder 1",
        //   file_type : "folder",
        //   priority : 2,
        //   level2:[]
        // })
        // this.custom_document.disclosure.push({
        //   id :10,
        //   name : "Folder 1",
        //   file_type : "folder",
        //   priority : 2,
        //   level2:[]
        // })

      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  }

  getCustomFiles({ }) {
    var ob = {
      investor_id: this.investor.id,
    };
    console.log(ob)
    this.authService.getCustomFiles(ob).subscribe(data => {

      if (data.success == 1) {
        data.data.forEach(element => {
          /*this.customFiles.push({

            id : element.id,
            name : element.name,
            file_type : element.file_type,
            priority : element.priority,
            level2:[]

          })*/

        });

        this.customFiles = data.data
      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  getFolders() {
    var ob = {
      investor_id: this.investor.id,
    };
    console.log(ob)
    this.authService.getFolders(ob).subscribe(data => {

      if (data.success == 1) {
        console.log(data)
      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  getSingleFiles(file) {


    if (file == "investor_documents") {
      if (this.client_data && this.client_data.investor_documents.length) {
        return environment.InvestorID + "" + this.client_data.investor_documents[0].upload_id
      } else {
        return "--";
      }
    } else if (file == "DisclosureSign") {
      if (this.client_data && this.client_data.DisclosurePDF) {
        return environment.InvestorSignBasePath + "" + this.client_data.DisclosurePDF;
      } else {
        return "--"
      }
    } else if (file == "RecordAdviceClientSignature") {
      if (this.client_data && this.client_data.RecordAdviceClientSignature) {
        return environment.InvestorSignBasePath + "" + this.client_data.RecordAdviceClientSignature;
      } else {
        return "--"
      }
    }
    else if (file == "RiskProfilerClientSignature") {
      if (this.client_data && this.client_data.RiskProfilerClientSignature) {
        return environment.InvestorSignBasePath + "" + this.client_data.RiskProfilerClientSignature;
      } else {
        return "--"
      }
    } else {
      return "";

    }


    console.log(file)
    if (file) {
      return environment.InvestorSignBasePath + '/' + file;
    } else {
      return "javascript:;";
    }
  }

  getMultiple(array) {
    console.log(array)
    if (array.length) {
      return environment.InvestorID + "/" + array[0].upload_id;
    } else {
      return "javascript:;";
    }
  }

  selectPDF(event) {

    this.document_type_pdf = event.target.files[0];
    console.log(event.target.files[0])


  }

  /* Start Custom folder */

  updateDisclosure() {

    if (this.document_type_pdf) {

      var formData = new FormData();
      formData.append("pdf_file", this.document_type_pdf);
      formData.append("investor_id", this.investor.id);
      formData.append("document_type", this.document_type);

      this.authService.addMultipleDouments(formData).subscribe(data => {

        if (data.success == 1) {
          console.log(data)
          this.toastr.success(data.message, "Success!");
          this.getDocuments({});
        } else {
          this.toastr.error(data.message)
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else {
      console.log("File not choosen");
    }


  }

  folderValueInitialize(id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    this.id = id;
    this.levelNo = levelNo;
    this.levelName = levelName;
    this.levelName2 = levelName2;
    this.levelName3 = levelName3;
    this.levelName4 = levelName4;
    this.levelName4 = levelName4;
    this.levelName5 = levelName5;
    this.index = index;
    this.index2 = index2;
    this.index3 = index3;
    this.index4 = index4;
    this.index5 = index5;
  }

  createFolder() {
    this.saveCreateFolder = true
    if (!this.folder_name) {
      return false;
    }

    this.addFolder(this.id, this.levelNo, this.levelName, this.levelName2, this.levelName3, this.levelName4, this.levelName5, this.index, this.index2, this.index3, this.index4, this.index5);
    // alert("Heyy"+this.id);
  }

  addFolder(id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    //console.log(`${id} ${levelName} ${levelNo} ${index} ${index2} ${index3} ${index4} ${index5}`);
    console.log("levelNo ", levelNo);
    console.log("levelName2 ", levelName2);
    console.log("levelName3 ", levelName3);
    console.log("levelName4 ", levelName4);
    console.log("levelName5 ", levelName5);
    console.log("index ", index);
    console.log("index2 ", index2);
    console.log("index3 ", index3);
    console.log("index4 ", index4);
    console.log("index5 ", index5);
    this.saveCreateFolder = false

    if (levelNo == 1) {

      console.log(this.customFiles)



      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name
      };
      console.log(ob)
      this.authService.addFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName]) {
            this.customFiles[index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }

            )
            this.customFiles[index][levelName] = _.sortBy(this.customFiles[index][levelName], 'priority')
          } else {
            this.customFiles[index][levelName] = [];

            this.customFiles[index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }

            )

            this.customFiles[index][levelName] = _.sortBy(this.customFiles[index][levelName], 'priority')

          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");

    } else if (levelNo == 2) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)

      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name
      };
      console.log(ob)
      this.authService.addFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2] && this.customFiles[index][levelName][index2][levelName2]) {
            this.customFiles[index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
            this.customFiles[index][levelName][index2][levelName2] = _.sortBy(this.customFiles[index][levelName][index2][levelName2], 'priority')
          } else {
            this.customFiles[index][levelName][index2][levelName2] = [];
            this.customFiles[index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
            this.customFiles[index][levelName][index2][levelName2] = _.sortBy(this.customFiles[index][levelName][index2][levelName2], 'priority')

          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");

    } else if (levelNo == 3) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)
      console.log(this.customFiles[index][levelName][index2][levelName2][index3])

      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name
      };
      console.log(ob)
      this.authService.addFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {


          if (this.customFiles[index][levelName][index2][levelName2][index3] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3]) {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = [];
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
          }

          this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = _.sortBy(this.customFiles[index][levelName][index2][levelName2][index3][levelName3], 'priority')

        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");

    } else if (levelNo == 4) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name
      };
      console.log(ob)
      this.authService.addFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {

          if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority
              }
            )
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority
              }
            )
          }

          this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = _.sortBy(this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4], 'priority')

        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");



    } else if (levelNo == 5) {
      console.log(this.customFiles)
      if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
        this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
          {
            name: "Sub Sub Sub Sub Subdirectory",
            id: 12,
          }
        )
      } else {
        this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
        this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
          {
            name: "Sub Sub Sub Sub Subdirectory",
            id: 10,
          }
        )
      }
    }



  }

  deleteFolder(id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    var flag = window.confirm('Are you sure to delete?');
    if (flag) {

      if (levelNo == 1) {
        // this.customFiles[index]
        this.customFiles.splice(index, 1);

      } else if (levelNo == 2) {
        this.customFiles[index][levelName].splice(index2, 1);
        // this.customFiles.

      } else if (levelNo == 3) {
        this.customFiles[index][levelName][index2][levelName2].splice(index3, 1);
        // this.customFiles.

      } else if (levelNo == 4) {
        this.customFiles[index][levelName][index2][levelName2][index3][levelName3].splice(index4, 1);
        // this.customFiles.

      } else if (levelNo == 5) {
        this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].splice(index5, 1);
        // this.customFiles.

      }
      // alert("Deleted");
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      // console.log(ob)
      this.authService.deleteFolder(ob).subscribe(data => {
        if (data.success == 1) {
          console.log("Folder Deleted");
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    }
  }

  expandFolder(id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    //console.log(`${id} ${levelName} ${levelNo} ${index} ${index2} ${index3} ${index4} ${index5}`);
    console.log("levelNo ", levelNo);
    console.log("levelName2 ", levelName2);
    console.log("levelName3 ", levelName3);
    console.log("levelName4 ", levelName4);
    console.log("levelName5 ", levelName5);
    console.log("index ", index);
    console.log("index2 ", index2);
    console.log("index3 ", index3);
    console.log("index4 ", index4);
    console.log("index5 ", index5);


    if (levelNo == 1) {



      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      // console.log(ob)
      this.authService.getFolderFiles(ob).subscribe(data => {
        if (data.success == 1) {
          console.log(this.customFiles)
          if (!this.customFiles[index][levelName]) {
            this.customFiles[index][levelName] = [];
          }
          if (this.customFiles[index][levelName] && this.customFiles[index][levelName].length == 0) {
            if (this.customFiles[index][levelName]) {
              this.customFiles[index][levelName] = this.customFiles[index][levelName].concat(data.data)
            } else {
              this.customFiles[index][levelName] = [];
              this.customFiles[index][levelName] = this.customFiles[index][levelName].concat(data.data)
            }
          } else {
            this.customFiles[index][levelName] = [];
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })




      this.folder_name = "";
      $("#modal_add_folder").modal("hide");

    } else if (levelNo == 2) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFiles(ob).subscribe(data => {
        if (!this.customFiles[index][levelName][index2][levelName2]) {
          this.customFiles[index][levelName][index2][levelName2] = []
        }
        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2] && this.customFiles[index][levelName][index2][levelName2].length == 0) {
            if (this.customFiles[index][levelName][index2][levelName2] && this.customFiles[index][levelName][index2][levelName2]) {
              this.customFiles[index][levelName][index2][levelName2] = this.customFiles[index][levelName][index2][levelName2].concat(data.data)
            } else {
              this.customFiles[index][levelName][index2][levelName2] = [];
              this.customFiles[index][levelName][index2][levelName2] = this.customFiles[index][levelName][index2][levelName2].concat(data.data)
            }
          } else {
            this.customFiles[index][levelName][index2][levelName2] = []
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else if (levelNo == 3) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFiles(ob).subscribe(data => {

        if (data.success == 1) {
          if (!this.customFiles[index][levelName][index2][levelName2][index3][levelName3]) {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = []
          }

          if (this.customFiles[index][levelName][index2][levelName2][index3] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3].length == 0) {
            if (this.customFiles[index][levelName][index2][levelName2][index3] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3]) {
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = this.customFiles[index][levelName][index2][levelName2][index3][levelName3].concat(data.data)
            } else {
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = [];
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = this.customFiles[index][levelName][index2][levelName2][index3][levelName3].concat(data.data)
            }
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = []
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })
    } else if (levelNo == 4) {
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFiles(ob).subscribe(data => {

        if (!this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
          this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
        }

        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].length == 0) {
            if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].concat(data.data)
            } else {
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].concat(data.data)
            }
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })
    } else if (levelNo == 5) {
      console.log(this.customFiles)
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFiles(ob).subscribe(data => {
        if (!this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
          this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
        }
        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].length == 0) {
            if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].concat(data.data)
            } else {
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
              this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].concat(data.data)
            }
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })
    }



  }

  expandFile(event, id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    //console.log(`${id} ${levelName} ${levelNo} ${index} ${index2} ${index3} ${index4} ${index5}`);
    console.log("levelNo ", levelNo);
    console.log("levelName2 ", levelName2);
    console.log("levelName3 ", levelName3);
    console.log("levelName4 ", levelName4);
    console.log("levelName5 ", levelName5);
    console.log("index ", index);
    console.log("index2 ", index2);
    console.log("index3 ", index3);
    console.log("index4 ", index4);
    console.log("index5 ", index5);

    var fileName = event.target.files[0].name.split('.').slice(0, -1).join('.')
    var name = window.prompt("Save As", fileName)

    if (!name) {
      name = "";
    }

    if (levelNo == 1) {

      console.log(this.customFiles)
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name
      };

      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabase(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName]) {
            this.customFiles[index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }

            )
          } else {
            this.customFiles[index][levelName] = [];
            this.customFiles[index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }

            )
          }

          this.customFiles[index][levelName] = _.sortBy(this.customFiles[index][levelName], 'priority')
        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");

    } else if (levelNo == 2) {
      console.log(this.customFiles)
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name
      };

      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabase(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2] && this.customFiles[index][levelName][index2][levelName2]) {
            this.customFiles[index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.customFiles[index][levelName][index2][levelName2] = [];
            this.customFiles[index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }

          this.customFiles[index][levelName][index2][levelName2] = _.sortBy(this.customFiles[index][levelName][index2][levelName2], 'priority')

        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");
    } else if (levelNo == 3) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)
      console.log(this.customFiles[index][levelName][index2][levelName2][index3])

      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabase(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2][index3] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3]) {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = [];
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }

          this.customFiles[index][levelName][index2][levelName2][index3][levelName3] = _.sortBy(this.customFiles[index][levelName][index2][levelName2][index3][levelName3], 'priority')

        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else if (levelNo == 4) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.customFiles)
      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabase(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }
          this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = _.sortBy(this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4], 'priority')
        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else if (levelNo == 5) {
      console.log(this.customFiles)
      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabase(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
            this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }

          this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = _.sortBy(this.customFiles[index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5], 'priority')

        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })

    }

    event.srcElement.value = null;

  }

  createOuterFolder() {
    this.saveFolder = true
    if (!this.folder_name_outer) {
      return false
    }

    var ob = {
      investor_id: this.investor.id,
      custom_folder_parent_id: 0,
      folder_name: this.folder_name_outer
    };
    console.log(ob)
    this.authService.addFolderDatabase(ob).subscribe(data => {
      this.saveFolder = false
      if (data.success == 1) {
        this.customFiles.push({

          id: data.data.id,
          name: data.data.name,
          level2: [],
          priority: data.data.pripority,
          file_type: "folder",

        })

        console.log(this.customFiles)
        this.customFiles = _.sortBy(this.customFiles, 'priority').reverse();
        // this.customFiles = this.customFiles.sort((a, b) => (a.priority > b.priority) ? -1 : 1)
      }
      this.folder_name_outer = "";
      $("#modal_add_folder_outer").modal("hide");
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }
  createOuterDocumentFolder() {
    this.saveOuterFolderDoc = true
    if (!this.folder_name_outer) {
      return false
    }

    var ob = {
      investor_id: this.investor.id,
      custom_folder_parent_id: 0,
      folder_name: this.folder_name_outer,
      document_type: this.document_type,
    };
    console.log(ob)
    this.authService.addDocumentFolderDatabase(ob).subscribe(data => {
      this.saveOuterFolderDoc = false
      if (data.success == 1) {
        this.custom_document[this.document_type].push({

          id: data.data.id,
          name: data.data.name,
          level2: [],
          priority: data.data.pripority,
          file_type: "folder",

        })

        this.custom_document[this.document_type] = _.sortBy(this.custom_document[this.document_type], 'priority').reverse();
        // this.customFiles = this.customFiles.sort((a, b) => (a.priority > b.priority) ? -1 : 1)
      }
      this.folder_name_outer = "";
      $("#modal_document_add_folder_outer").modal("hide");
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }



  createOuterFile(event) {


    if (!event.target.files[0]) {
      console.log("File not recieved");
      return false
    }

    var fileName = event.target.files[0].name.split('.').slice(0, -1).join('.')
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    var name = window.prompt("Save As", fileName)

    if (!name) {
      name = "";
    }
    const files: FileList = event.target.files;

    var formData = new FormData();
    formData.append("investor_id", this.investor.id)
    formData.append("custom_folder_parent_id", "0")
    formData.append("file", event.target.files[0])
    formData.append("filename", name)

    this.authService.addFileInFolderDatabase(formData).subscribe(data => {

      if (data.success == 1) {
        this.customFiles.push({

          id: data.data.id,
          name: data.data.name,
          priority: data.data.pripority,
          file_type: "document",
          level2: []

        })
      } else {
        this.toastr.error(data.message, "Error");
      }
      this.folder_name_outer = "";
      console.log(this.customFiles)
      this.customFiles = _.sortBy(this.customFiles, 'priority').reverse();
      $("#modal_add_folder_outer").modal("hide");
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
    // Clear the input
    event.srcElement.value = null;
  }
  createDocumentOuterFile(event, document_type) {


    if (!event.target.files[0]) {
      return false
    }

    var fileName = event.target.files[0].name.split('.').slice(0, -1).join('.')
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    var name = window.prompt("Save As", fileName)

    if (!name) {
      name = "";
    }

    var formData = new FormData();
    formData.append("investor_id", this.investor.id)
    formData.append("custom_folder_parent_id", "0")
    formData.append("document_type", document_type)
    formData.append("file", event.target.files[0])
    formData.append("filename", name)

    this.authService.addFileInFolderDatabaseDocument(formData).subscribe(data => {

      if (data.success == 1) {
        this.custom_document[document_type].push({

          id: data.data.id,
          name: data.data.name,
          priority: data.data.pripority,
          file_type: "document",
          level2: []

        })
      } else {
        this.toastr.error(data.message, "Error")
      }
      this.folder_name_outer = "";
      console.log(this.customFiles)
      this.custom_document[document_type] = _.sortBy(this.custom_document[document_type], 'priority').reverse();
      //  $("#modal_").modal("hide");
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
    event.srcElement.value = null;
  }

  /* End Custom folder */

  /* Add custom doument folder */

  folderValueInitializeDocument(document_type, id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    this.id = id;
    this.levelNo = levelNo;
    this.levelName = levelName;
    this.levelName2 = levelName2;
    this.levelName3 = levelName3;
    this.levelName4 = levelName4;
    this.levelName4 = levelName4;
    this.levelName5 = levelName5;
    this.index = index;
    this.index2 = index2;
    this.index3 = index3;
    this.index4 = index4;
    this.index5 = index5;
    this.document_type = document_type;
  }


  createFolderDocument() {
    this.saveCreateFolderDoc = true
    if (!this.folder_name) {
      return false;
    }

    this.addFolderDocument(this.document_type, this.id, this.levelNo, this.levelName, this.levelName2, this.levelName3, this.levelName4, this.levelName5, this.index, this.index2, this.index3, this.index4, this.index5);
    // alert("Heyy"+this.id);
  }

  addFolderDocument(document_type, id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    //console.log(`${id} ${levelName} ${levelNo} ${index} ${index2} ${index3} ${index4} ${index5}`);
    console.log("levelNo ", levelNo);
    console.log("levelName2 ", levelName2);
    console.log("levelName3 ", levelName3);
    console.log("levelName4 ", levelName4);
    console.log("levelName5 ", levelName5);
    console.log("index ", index);
    console.log("index2 ", index2);
    console.log("index3 ", index3);
    console.log("index4 ", index4);
    console.log("index5 ", index5);
    console.log("document_type ", document_type);
    this.saveCreateFolderDoc = false

    if (levelNo == 1) {

      console.log(this.custom_document[document_type])



      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name,
        document_type: document_type,
      };
      console.log(ob)
      this.authService.addDocumentFolderDatabase(ob).subscribe(data => {
        // alert("Added");
        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName]) {
            this.custom_document[document_type][index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }

            )
            this.custom_document[document_type][index][levelName] = _.sortBy(this.custom_document[document_type][index][levelName], 'priority')
          } else {
            this.custom_document[document_type][index][levelName] = [];

            this.custom_document[document_type][index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }

            )

            this.custom_document[document_type][index][levelName] = _.sortBy(this.custom_document[document_type][index][levelName], 'priority')

          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder_document").modal("hide");

    } else if (levelNo == 2) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])

      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name,
        document_type: document_type,
      };
      console.log(ob)
      this.authService.addDocumentFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2] && this.custom_document[document_type][index][levelName][index2][levelName2]) {
            this.custom_document[document_type][index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
            this.custom_document[document_type][index][levelName][index2][levelName2] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2], 'priority')
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
            this.custom_document[document_type][index][levelName][index2][levelName2] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2], 'priority')

          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder_document").modal("hide");

    } else if (levelNo == 3) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])
      console.log(this.custom_document[document_type][index][levelName][index2][levelName2][index3])

      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name,
        document_type: document_type,
      };
      console.log(ob)
      this.authService.addDocumentFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {


          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3]) {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority,
              }
            )
          }

          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3], 'priority')

        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder_document").modal("hide");

    } else if (levelNo == 4) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
        folder_name: this.folder_name,
        document_type: document_type,
      };
      console.log(ob)
      this.authService.addDocumentFolderDatabase(ob).subscribe(data => {

        if (data.success == 1) {

          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority
              }
            )
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "folder",
                priority: data.data.priority
              }
            )
          }

          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4], 'priority')

        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder_document").modal("hide");



    } else if (levelNo == 5) {
      console.log(this.custom_document[document_type])
      if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
        this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
          {
            name: "Sub Sub Sub Sub Subdirectory",
            id: 12,
          }
        )
      } else {
        this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
        this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
          {
            name: "Sub Sub Sub Sub Subdirectory",
            id: 10,
          }
        )
      }
    }



  }

  deleteFolderDocument(document_type, id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    var flag = window.confirm('Are you sure to delete?');
    if (flag) {

      if (levelNo == 1) {
        // this.custom_document[document_type][index]
        this.custom_document[document_type].splice(index, 1);

      } else if (levelNo == 2) {
        this.custom_document[document_type][index][levelName].splice(index2, 1);
        // this.custom_document[document_type].

      } else if (levelNo == 3) {
        this.custom_document[document_type][index][levelName][index2][levelName2].splice(index3, 1);
        // this.custom_document[document_type].

      } else if (levelNo == 4) {
        this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].splice(index4, 1);
        // this.custom_document[document_type].

      } else if (levelNo == 5) {
        this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].splice(index5, 1);
        // this.custom_document[document_type].

      }
      // alert("Deleted");
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      // console.log(ob)
      this.authService.deleteFolder(ob).subscribe(data => {
        if (data.success == 1) {
          console.log("Folder Deleted");
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    }
  }

  expandFolderDocument(document_type, id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    //console.log(`${id} ${levelName} ${levelNo} ${index} ${index2} ${index3} ${index4} ${index5}`);
    console.log("Document type", document_type);
    console.log("levelNo ", levelNo);
    console.log("levelName2 ", levelName2);
    console.log("levelName3 ", levelName3);
    console.log("levelName4 ", levelName4);
    console.log("levelName5 ", levelName5);
    console.log("index ", index);
    console.log("index2 ", index2);
    console.log("index3 ", index3);
    console.log("index4 ", index4);
    console.log("index5 ", index5);


    if (levelNo == 1) {



      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      // console.log(ob)
      this.authService.getFolderFilesDocument(ob).subscribe(data => {
        if (data.success == 1) {
          console.log(this.custom_document[document_type])
          if (!this.custom_document[document_type][index][levelName]) {
            this.custom_document[document_type][index][levelName] = [];
          }
          if (this.custom_document[document_type][index][levelName] && this.custom_document[document_type][index][levelName].length == 0) {
            if (this.custom_document[document_type][index][levelName]) {
              this.custom_document[document_type][index][levelName] = this.custom_document[document_type][index][levelName].concat(data.data)
            } else {
              this.custom_document[document_type][index][levelName] = [];
              this.custom_document[document_type][index][levelName] = this.custom_document[document_type][index][levelName].concat(data.data)
            }
          } else {
            this.custom_document[document_type][index][levelName] = [];
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })




      this.folder_name = "";
      $("#modal_add_folder_document").modal("hide");

    } else if (levelNo == 2) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFilesDocument(ob).subscribe(data => {
        if (!this.custom_document[document_type][index][levelName][index2][levelName2]) {
          this.custom_document[document_type][index][levelName][index2][levelName2] = []
        }
        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2] && this.custom_document[document_type][index][levelName][index2][levelName2].length == 0) {
            if (this.custom_document[document_type][index][levelName][index2][levelName2] && this.custom_document[document_type][index][levelName][index2][levelName2]) {
              this.custom_document[document_type][index][levelName][index2][levelName2] = this.custom_document[document_type][index][levelName][index2][levelName2].concat(data.data)
            } else {
              this.custom_document[document_type][index][levelName][index2][levelName2] = [];
              this.custom_document[document_type][index][levelName][index2][levelName2] = this.custom_document[document_type][index][levelName][index2][levelName2].concat(data.data)
            }
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2] = []
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else if (levelNo == 3) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFilesDocument(ob).subscribe(data => {

        if (data.success == 1) {
          if (!this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3]) {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = []
          }

          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].length == 0) {
            if (this.custom_document[document_type][index][levelName][index2][levelName2][index3] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3]) {
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].concat(data.data)
            } else {
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = [];
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].concat(data.data)
            }
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = []
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })
    } else if (levelNo == 4) {
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFilesDocument(ob).subscribe(data => {

        if (!this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
        }

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].length == 0) {
            if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].concat(data.data)
            } else {
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].concat(data.data)
            }
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })
    } else if (levelNo == 5) {
      console.log(this.custom_document[document_type])
      var ob = {
        investor_id: this.investor.id,
        custom_folder_parent_id: id,
      };
      console.log(ob)
      this.authService.getFolderFilesDocument(ob).subscribe(data => {
        if (!this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
        }
        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].length == 0) {
            if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].concat(data.data)
            } else {
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
              this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].concat(data.data)
            }
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
          }
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })
    }



  }

  expandFileDocument(document_type, event, id, levelNo, levelName, levelName2, levelName3, levelName4, levelName5, index, index2, index3, index4, index5) {
    //console.log(`${id} ${levelName} ${levelNo} ${index} ${index2} ${index3} ${index4} ${index5}`);
    console.log("levelNo ", levelNo);
    console.log("levelName2 ", levelName2);
    console.log("levelName3 ", levelName3);
    console.log("levelName4 ", levelName4);
    console.log("levelName5 ", levelName5);
    console.log("index ", index);
    console.log("index2 ", index2);
    console.log("index3 ", index3);
    console.log("index4 ", index4);
    console.log("index5 ", index5);

    var fileName = event.target.files[0].name.split('.').slice(0, -1).join('.')
    console.log(event.target.files[0])
    console.log(event.target.files[0].name)
    var name = window.prompt("Save As", fileName)

    if (!name) {
      name = "";
    }

    if (levelNo == 1) {

      console.log(this.custom_document[document_type])



      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("document_type", document_type)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabaseDocument(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName]) {
            this.custom_document[document_type][index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }

            )
          } else {
            this.custom_document[document_type][index][levelName] = [];
            this.custom_document[document_type][index][levelName].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }

            )
          }

          this.custom_document[document_type][index][levelName] = _.sortBy(this.custom_document[document_type][index][levelName], 'priority')
        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");

    } else if (levelNo == 2) {
      console.log(this.custom_document[document_type])
      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("document_type", document_type)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabaseDocument(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2] && this.custom_document[document_type][index][levelName][index2][levelName2]) {
            this.custom_document[document_type][index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }

          this.custom_document[document_type][index][levelName][index2][levelName2] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2], 'priority')

        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

      this.folder_name = "";
      $("#modal_add_folder").modal("hide");
    } else if (levelNo == 3) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])
      console.log(this.custom_document[document_type][index][levelName][index2][levelName2][index3])

      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("document_type", document_type)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabaseDocument(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3]) {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }

          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3], 'priority')

        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else if (levelNo == 4) {
      console.log(`${id} ${levelName} ${levelNo}`);
      console.log(this.custom_document[document_type])
      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("document_type", document_type)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabaseDocument(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4]) {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }
          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4], 'priority')
        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
      })

    } else if (levelNo == 5) {
      console.log(this.custom_document[document_type])
      var formData = new FormData();
      formData.append("investor_id", this.investor.id)
      formData.append("custom_folder_parent_id", id)
      formData.append("document_type", document_type)
      formData.append("file", event.target.files[0])
      formData.append("filename", name)

      this.authService.addFileInFolderDatabaseDocument(formData).subscribe(data => {

        if (data.success == 1) {
          if (this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5] && this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5]) {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          } else {
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = [];
            this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5].push(
              {
                name: data.data.name,
                id: data.data.id,
                file_type: "document",
                priority: data.data.priority
              }
            )
          }

          this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5] = _.sortBy(this.custom_document[document_type][index][levelName][index2][levelName2][index3][levelName3][index4][levelName4][index5][levelName5], 'priority')

        } else {
          this.toastr.error(data.message, "Error")
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })

    }

    event.srcElement.value = null;
  }

  addOuterFolderDocument(document_type) {
    this.document_type = document_type;
  }
  /*end custom folder */

  goBack() {
    this._location.back();
  }

  searchDocs() {
    if (this.search) {

    }
  }

}
