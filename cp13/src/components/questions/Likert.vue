var a = 1
<template>
<div class="TableList">
  <div> {{msg}}</div>
        <div class="list">
            <table class="listTab" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th v-for="(item) in tableHead" :key="item.key"> {{item.title}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" v-bind:key="index">
                         
                        <td v-for="(val) in tableHead" :key="val">

                            <div v-if="item[val.key]=='radio'">
                                <input id="Field1"  type="radio" value = val.key :name="index"  v-on:click="methodToRunOnSelect([index,val.key])"/>
                            </div>
                            <div v-else>
                              <div v-if= "val.key == 'category'">
                                <div v-if="item[val.key]=='Others'">
                                   {{item[val.key]}}<br>
                                  <input id = "Field2" name = "textfield" type = "url" class = "field text medium" value = "" maxlength="20" tabindex = "36"/>
                                </div>
                                <div v-else> {{item[val.key]}}</div>
                              </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  <switch-button :response = JSON.stringify(responseJSON)>

  </switch-button>
</div>

</template>




<script>
import {tempStorage} from "../../utils/storage";
import SwitchButton from "../SwitchButton";

export default {
  name: 'Likert',
  components: {SwitchButton},
  data () {
    return {
      host:location.hostname,
      responseJSON:{
        questionId: 0,
        items:[
        ]
      },
      tableHead:[
                {key:"category",title:"Category"},
                {key:"extreme",title:"Extreme Important"},
                {key:"very",title:"Very Important"},
                {key:"slight",title:"Slight Important"},
                {key:"not",title:"Not Important"}
            ],
      tableData:[
          {category:"Your prior knowledge",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
          {category:"News source",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
          {category:"Headline claim",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
          {category:"Image associated with post",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
          {category:"Others",extreme:"radio",slight:"radio",very:"radio",not:"radio"}
      ]
    }
  },
  mounted(){
    this.initPage();
    for(let i = 0; i < this.tableData.length; i++){
          console.log(i);
          let answerObject = {};
          answerObject.index = i;
          answerObject.content = 0;
          this.responseJSON.items.push(answerObject);
    } 
    console.log("currentTable:"+JSON.stringify(this.responseJSON.items))
  },
  methods: {
    initPage() {
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      console.log("tempStorage: "+JSON.stringify(jsonQuestion));
      let jsonObj = JSON.parse(JSON.stringify(jsonQuestion));
      console.log("msg:"+JSON.stringify(jsonObj.description));
      this.msg = jsonObj.description;
      console.log("tablehead:"+JSON.stringify(jsonObj.tableHead));
      this.tableHead = jsonObj.tableHead;
      
      this.tableData = jsonObj.tableData;
      console.log("tableData len:"+JSON.stringify(this.tableData.length));

      this.responseJSON.questionId = jsonObj.order;
      
    },
    methodToRunOnSelect(payload) {
        this.object = payload;
        for(let i = 0; i< this.responseJSON.items.length; i++ ){
          if(this.responseJSON.items[i].index == payload[0]){
            this.responseJSON.items[i].content = payload[1];
            console.log("updatedResponse:"+JSON.stringify(this.responseJSON))
            
          }
        }
    },
    generateJSON(){
      let json = {};
      this.responseJSON = JSON.stringify(json);
    }
  },

}


</script>

<style scoped>
body {
  background-color: #EFF2F5;
}

.surveyTitle {
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.wrapper{
  width: 1280px;
  max-width: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding: 40px;
}

.ele {
  width: 40%;
  height: 400px;
}

.ele:nth-child(3n+1) {
  width: 100%;
}



.question{
  width: 60%;
  background-color: white;
  text-align: center;
}


.picWall{
  width: 80%;
  height: 230px;
  border: 4px solid;
  /*border-image: linear-gradient(45deg, turquoise, greenyellow) 1;*/
  margin: 20px auto;
  overflow: hidden;
  text-align: left;
}

.LikertMatrix{
    transform:scale(0.8, 0.8);
}

body {
  font-family: "Lucida Grande","Lucida Sans Unicode", Tahoma, sans-serif;
  line-height: 1.4;
  padding: 30px;
}

.form-header {
  margin: 0 0 1em 0;
  padding: 0 0 1em 0;
  border-bottom: 1px dotted #ccc
}

.text {
  font-size: 120%;
}

form ul {
  padding: 0;
}
form li {
  list-style: none;
  padding: 0.5em;
  clear: both;
  overflow: hidden;
  position: relative;
}
form li span {
  margin: 0 .3em 0 0;
  float: left;
}
form li div span {
  margin: 0;
  display: block;
  width: 50%;
  float: left;
}
label span,
.section span,
p span,
.likert span {
  display: inline;
  float: none;
}
form li div label,
form li span label {
  font-size: 50%;
  padding-top: 0.25em;
  clear: both;
  display: block;
}
fieldset {
  display: block;
  border: none;
  margin: 0;
  padding: 0;
}
label.desc,
legend {
  font-weight: bold;
  color: #222;
  padding: 0 0 0.15em 0;
  margin: 0 0 0.15em 0;
  display: block;
}
label.choice {
  display: block;
  cursor: pointer;
  font-size: 50%;
  line-height: 50%;
  margin: -1.25em 0 0 1.5em;
  padding: 0 0 0.25em 0;
}
.likert table {
  margin: 0 0 1em 0;
  width: 60%;
  border: 1px solid #dedede;
}
.likert caption {
  font-weight: bold;
  text-align: left;
  margin: 0 0 0.5em 0;
}
.likert input {
  margin: 0.25em 0;
}
.likert tbody td label {
  display: block;
}
.likert thead td,
.likert thead th {
  background-color: #e6e6e6
}
.likert td {
  border-left: 1px solid rgb(228, 222, 222);
  border-right: 1px solid rgb(238, 231, 231);
  text-align: center;
  padding: 0.25em;
  width: 100px;
}
.likert thead td {
  font-size: 85%;
  padding: 5px 6px;
}
.likert th,
.likert td {
  border-bottom: 1px solid #dedede;
}
.likert tbody th {
  padding: 8px 8px;
  text-align: left;
}
.likert tbody th label {
  color: #222;
  font-weight: bold
}
.likert tbody tr.alt td,
.likert tbody tr.alt th {
  background-color: #f5f5f5;
}
.likert tbody tr:hover td,
.likert tbody tr:hover th {
  background-color:#FFFFCF;
}
form li.section {
  padding: 1em 0 0 0;
}
form li.section h3 {
  font-size: 11%;
  line-height: 13%;
  margin: 0 0 3px 0;
  padding: 12px 1% 0 1%;
  border-top: 1px dotted #ccc
}



.tableList{
    width: 100%;
}

.list{
  width: 98%;
  margin-left: 1%;
  overflow-x:auto;
}
table.listTab{
    width: 100%;
    font-size: 14px;
    color: #6a6a6a;
    border: 1px solid #ececed;
    padding: 1px;
    background-color: #fff;
}
table.listTab th{
    background-color: #ecf0f4;
    padding: 14px 8px;
    text-align: left;
    font-size: 14px;
    border: 1px solid #ecf0f4;
    min-width: 40px;
    color:#292d31;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
table.listTab th.check{
    min-width: 20px;
}
table.listTab tbody > tr td{
    padding: 16px 8px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #ececed;
    vertical-align: middle;
    word-break: break-all;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
table.listTab tbody > tr td.check{
min-width: 20px;
}
table.listTab tbody > tr td:first-child{
    width: 20px;
}
table.listTab tbody > tr:hover{
    background-color: #dfeefc;
}
table.listTab tbody > tr.check{
    background-color: #dfeefc;
}
table.listTab tbody > tr:last-child td{
    border-bottom: 0px;
}
table.listTab tbody > tr td a{
    color: #248bfc;
}
table.listTab tbody > tr td input{
border:1px solid #248bfc;
}
table.listTab tbody > tr td .green{
color: #72d34b;
font-weight:bold;
}
table.listTab tbody > tr td .red{
color: #f00;
font-weight:bold;
}

</style>
