var a = 1
<template>
  <div>
    <news-frame :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">

    </news-frame>

    <div class="TableList">
      <div> {{msg}}</div>
      <div class="list">
        <table class="listTab">
          <thead>
          <tr>
            <th v-for="item in tableHead" :key="item.key"> {{item.title}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tableData" v-bind:key="index">

            <td v-for="(val) in tableHead" :key="val.key">

              <div v-if="item[val.key]==='radio'">
                <input id="Field1"  type="radio"  v-on:click="methodToRunOnSelect" :value = "val.key" :name="index" />
              </div>
              <div v-else>
                <div v-if= "val.key === 'category'">
                  <div v-if="item[val.key]==='Others'">
                    {{item[val.key]}}<br>
                    <input id = "Field2" name = "textfield" type = "url" class = "field text medium" value = "" maxlength="20" tabindex = "36" v-on:input="addThingEnter" :name="index"/>
                  </div>
                  <div v-else> {{item[val.key]}}</div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <switch-button :response = response>

      </switch-button>
    </div>
  </div>
</template>




<script>
import {tempStorage} from "../../utils/storage";
import SwitchButton from "../SwitchButton";
import NewsFrame from "../NewsFrame";

export default {
  name: 'Likert',
  components: {NewsFrame, SwitchButton},
  data () {
    return {
      host:location.hostname,
      response:"",
      responseJSON:{answer:[]},
      newsTitle: '',
      imgPath:'',
      newsDetails:'',
      msg : "",
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
      let answerObject = {};
      answerObject.index = i;
      answerObject.selection = "";
      answerObject.input = "";
      this.responseJSON.answer.push(answerObject);
    }

  },
  methods: {
    initPage() {
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);

      let jsonObj = JSON.parse(JSON.stringify(jsonQuestion));

      this.newsTitle = jsonObj.newsTitle;

      this.imgPath = jsonObj.img;

      this.newsDetails = jsonObj.newsDescription;

      this.msg = jsonObj.description;

      this.tableHead = jsonObj.tableHead;

      this.tableData = jsonObj.tableData;


    },
    methodToRunOnSelect(event) {


      for(let i = 0; i< this.responseJSON.answer.length; i++ ){
        if(this.responseJSON.answer[i].index == event.target.name){
          this.responseJSON.answer[i].selection = event.target.value;
          this.response = JSON.stringify(this.responseJSON);
        }
      }
    },
    generateJSON(){
      let json = {};
      this.responseJSON = JSON.stringify(json);
    },
    addThingEnter(event){
      for(let i = 0; i< this.responseJSON.answer.length; i++ ){
        if(this.responseJSON.answer[i].index == event.target.name){
          this.responseJSON.answer[i].input = event.target.value;
          this.response = JSON.stringify(this.responseJSON);
        }
      }
    }
  },

}


</script>

<style scoped>
body {
  background-color: #EFF2F5;
}

body {
  font-family: "Lucida Grande","Lucida Sans Unicode", Tahoma, sans-serif;
  line-height: 1.4;
  padding: 30px;
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
