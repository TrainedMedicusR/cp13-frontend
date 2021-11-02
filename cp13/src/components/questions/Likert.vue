var a = 1
<template>
  <div>
    <news-frame :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">

    </news-frame>

    <div class="TableList">

      <div v-if="requireANS===true" class="msg" > {{msg + "(*required)"}}</div>
      <div v-if="requireANS===false" class="msg" > {{msg}}</div>
      <div class="list">
        <table class="listTab">
          <thead>
          <tr>
            <th v-if="rtl===true" v-for="item in tableHead" :key="item.key" :style="{textAlign:'right'}"> {{item.title}}</th>
            <th v-if="rtl===false" v-for="item in tableHead" :key="item.key" :style="{textAlign:'left' }"> {{item.title}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tableData" v-bind:key="index">
            <td v-if="rtl===true"  v-for="(val) in tableHead" :key="val.key" :style="{textAlign:'right'}">
              <div v-if="item[val.key]==='radio'">
                <input id="Field1"  type="radio"  v-on:click="methodToRunOnSelect" :value = "val.key" :name="index" />
              </div>
              <div v-else-if ="item[val.key]==='radio selected'">
                <input id="Field1_h"  type="radio"  v-on:click="methodToRunOnSelect" :value = "val.key" :name="index" checked/>
              </div>
              <div v-else> {{item[val.key]}}</div>

              <div v-if="index === tableData.length-1">
                <div v-if= "val.key === 'category'">
                  <div v-if="item['other_content']!==''">
                    <input id = "Field2" name = "textfield" type = "url" class = "field text medium" :value = "item['other_content']" maxlength="20" tabindex = "36" v-on:input="addThingEnter" :name="index" @input="lefttoright($event)" />
                  </div>
                  <div v-else>
                    <input id = "Field2_2" name = "textfield" type = "url" class = "field text medium" value = "" maxlength="20"  tabindex = "36" v-on:input="addThingEnter" :name="index" @input="lefttoright($event)" />
                  </div>
                </div>
              </div>


            </td>

            <td v-if="rtl===false"  v-for="(val) in tableHead" :key="val.key" :style="{textAlign:'left'}">
              <div v-if="item[val.key]==='radio'">
                <input id="Field1_1"  type="radio"  v-on:click="methodToRunOnSelect" :value = "val.key" :name="index" />
              </div>
              <div v-else-if ="item[val.key]==='radio selected'">
                <input id="Field1_h_1"  type="radio"  v-on:click="methodToRunOnSelect" :value = "val.key" :name="index" checked/>
              </div>
              <div v-else> {{item[val.key]}}</div>

              <div v-if="index === tableData.length-1">
                <div v-if= "val.key === 'category'">
                  <div v-if="item['other_content']!==''">
                    <input id = "Field2_1" name = "textfield" type = "url" class = "field text medium" :value = "item['other_content']" :style="{textAlign:'left', dir:'ltr'}" maxlength="20" tabindex = "36" v-on:input="addThingEnter" :name="index "/>
                  </div>
                  <div v-else>
                    <input id = "Field2_2_1" name = "textfield" type = "url" class = "field text medium" value = "" :style="{textAlign:'left',  dir:'ltr'}" maxlength="20" tabindex = "36" v-on:input="addThingEnter" :name="index"/>
                  </div>
                </div>
              </div>


            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <switch-button :requireANS="requireANS" :response = response>

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
      rtl:false,
      response:"",
      responseJSON:{answer:[]},
      newsTitle: '',
      imgPath:'',
      newsDetails:'',
      msg : "",
      requireANS:false,
      tableHead:[

        {key:"extreme",title:"Extreme Important"},
        {key:"very",title:"Very Important"},
        {key:"slight",title:"Slight Important"},
        {key:"not",title:"Not Important"},
        {key:"category",title:"Category"}

      ],
      tableData:[
        {category:"Your prior knowledge",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
        {category:"News source",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
        {category:"Headline claim",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
        {category:"Image associated with post",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
        {category:"Others",extreme:"radio",slight:"radio",very:"radio",not:"radio", other_content:""}
      ],
      history:[]
    }
  },
  mounted(){
    this.initPage();
    this.responseJSON.answer  = this.tableData;
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

      this.requireANS = jsonObj.Required;

      if(JSON.stringify(tempStorage.getQuestionAnswerJSON(this.$route.params.id))!=="{}"){

        if(!(((JSON.parse(JSON.stringify(tempStorage.getQuestionAnswerJSON(this.$route.params.id)))).answer).length===0)){

          this.history= ( JSON.parse(JSON.stringify(tempStorage.getQuestionAnswerJSON(this.$route.params.id)))).answer;
          this.responseJSON.answer = JSON.parse(JSON.stringify(tempStorage.getQuestionAnswerJSON(this.$route.params.id)));
          this.response = JSON.stringify(this.responseJSON)
        }
      }

      if  (!(this.history.length === 0)){
        this.tableData = this.history;
      }


    },
    methodToRunOnSelect(event) {
      let object = this.tableData[event.target.name];
      let objectname = event.target.value;

      object[objectname] = "radio selected";

      this.responseJSON.answer = this.tableData;
      this.response = JSON.stringify(this.responseJSON);
    },

    addThingEnter(event){
      let object = this.tableData[event.target.name];
      object["other_content"] = event.target.value;
      this.responseJSON.answer = this.tableData;
      this.response = JSON.stringify(this.responseJSON);
    },
    lefttoright: function(e){
      var inputchar = e.data;
      var pointerPos = e.target.selectionStart;

      if(inputchar != null){
        pointerPos -= 1;
      }

      e.target.selectionStart = pointerPos;
      e.target.selectionEnd = pointerPos;
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
  width: 89%;
  font-size: 14px;
  color: #100f0f;
  border: 1px solid #ececed;
  padding: 1px;
  background-color: #fff;
}
table.listTab th{
  background-color: #1080de;
  padding: 14px 8px;
  font-size: 16px;
  border: 1px solid #ecf0f4;
  min-width: 40%;
  /*min-width: 40px;*/
  color: #101111;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 10%;
}

table.listTab tbody > tr td{
  padding: 16px 8px;

  font-size: 16px;
  border-bottom: 1px solid #ececed;
  vertical-align: middle;
  word-break: break-all;

  /*min-width: 50px;*/
  min-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: rgba(159, 205, 255, 0.99);
}
table.listTab tbody > tr td div input[type=radio]{
  transform: scale(1.5,1.5);
}
table.listTab tbody > tr td:first-child{
/*width: 20px;*/
  width: 20%
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

table.listTab tbody > tr td input{
border:1px solid #248bfc;
color: #4e555b;
text-align: right;
}

div.TableList{
  width :100%;
/*width : 700px;*/
}

div.list{
  width :100%;
/*width : 800px;*/
}

.msg{
text-align: center;
}



</style>
