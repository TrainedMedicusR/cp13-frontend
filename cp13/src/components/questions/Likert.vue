<template>
<div class="TableList">
        <div class="list">
            <table class="listTab" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th v-for="(item) in tableHead" :key="item.key"> {{item.title}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in tableData" :key="item.openId">
                        <td v-for="(val,index) in tableHead" :key="index">
                            <div v-if="item[val.key]=='radio1'">
                                <input id="Field1_1" name="Field1" type="radio" value= val.key />
                            </div>
                            <div v-else-if="item[val.key]=='radio2'">
                                <input id="Field1_1" name="Field1" type="radio" value= val.key />
                            </div>
                            <div v-else>{{item[val.key]}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  <switch-button :response=responseJSON>

  </switch-button>
</div>

</template>




<script>
import {getSurvey} from "../../api/getSurvey";
import storage from "../../utils/storage";
import SwitchButton from "../SwitchButton";

export default {
  name: 'Likert',
  components: {SwitchButton},
  data () {
    return {
      host:location.hostname,
      responseJSON:"",
      tableHead:[
                {key:"category",title:"category"},
                {key:"extreme",title:"extreme"},
                {key:"very",title:"very"},
                {key:"slight",title:"slight"},
                {key:"not",title:"not"}
            ],
      tableData:[
          {category:"Your prior knowledge",extreme:"radio1",very:"radio1",slight:"radio1",not:"radio1"},
          {category:"News source",extreme:"radio2",very:"radio2",slight:"radio2",not:"radio2"},
          {category:"Headline claim",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
          {category:"Image associated with post",extreme:"radio",very:"radio",slight:"radio",not:"radio"},
          {category:"Others",extreme:"radio",slight:"radio",very:"radio",not:"radio"}
      ]
    }
  },
  methods: {
    initPage() {
      const surveyJSON = getSurvey(this.$route.params.id).then(response=>{
        if (response.status === 200){
          let identifier = this.$route.params.id + new Date().getTime()
          console.log(identifier)
          const hashString = this.$md5(identifier);
          storage.set(this.$route.params.id,hashString);
          console.log(response.data);
        } else {
          alert("Data Error!");
        }}
      ).catch(e => {
        console.log(e);
      })
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
