<template>
        <div class = "LikertMatrix">
            <form class="topLabel">
            <header class="form-header">  
            </header> 
            <ul>  
                <li id="form-field" class="likert">
                    <table cellspacing="0">
                        <caption id="title">
                        How important is the factor? Rank your score 1 out of 10.
                        </caption>
                        <thead>
                             <th>&nbsp;</th>
                            <td>{{column1}}</td>
                            <td>{{column2}}</td>
                            <td>{{column3}}</td>
                            <td>{{column4}}</td>
                            <td>{{column5}}</td>           
                        </thead>
                        
                        <tbody>
                          <tr v-for="item in rows" :key="item.id">
                            <th>
                            <label>{{item.id}}</label>
                            </th>
                            <td title="Extreme">
                            <input id="Field1_1" name="Field1" type= "radio" v-bind:value= "Extreme" v-model= "picked">
                            </td>
                            <td title="Very">
                            <input id="Field1_2" name="Field2" type= "radio" v-bind:value= "Very" v-model= "picked">
                            </td>
                            <td title="Slightly">
                            <input id="Field1_3" name="Field3" type= "radio" v-model= "picked" v-bind:value= "slightly">
                            </td>
                            <td title="Not At All">
                            <input id="Field1_4" name="Field4" type= "radio"  v-model= "picked" v-bind:value= "Not">
                            </td>
                            <th>
                              <td title="Increase or Decrease">
                                <div>
                                <select id="Field3_5" name="Field104" class="field select medium" tabindex="31" > 
                                  <option value="Neither increase nor decrease" selected="selected">
                                      {{option1}}
                                  </option>
                                  <option value="Increase" >
                                      {{option2}}
                                  </option>
                                  <option value="Decrease" >
                                      {{option3}}
                                  </option>
                                </select>
                                </div>
                              </td>
                            </th>
                          </tr>
                          <tr>
                          <li id="form-field-9">
                            <td>
                                <label class="desc" id="title117" for="Field117">
                                    {{textfield}}
                                </label>
                                <div>
                                    <input id="Field" name="Field" type="url" class="field text medium" value="" maxlength="255" tabindex="36" /> 
                                </div>
                              </td>
                             </li>
                                <td title="Extrme">
                                <input id="Field7_1" name="Field7" type="radio" value="Extreme" />
                                </td>
                                <td title="Very">
                                <input id="Field7_2" name="Field7" type="radio" value="Very" />                  
                                </td>
                                <td title="Slightly">
                                <input id="Field7_3" name="Field7" type="radio" value="Slightly" />
                                </td>
                                <td title="Not At All">
                                <input id="Field7_4" name="Field7" type="radio" value="Not At All" />
                                </td>
                                <td>
                                <div>
                                <select v-model="selected">
                                  <option value="Neither increase nor decrease">
                                      {{option1}}
                                  </option>
                                  <option value="Increase" >
                                      {{option2}}
                                  </option>
                                  <option value="Decrease" >
                                      {{option3}}
                                  </option>
                                </select>
                                <span>Selected: {{ selected }}</span>
                                </div> 
                                </td>
                          </tr>
                        </tbody>
                    </table>
                </li>
                            
            </ul>
                            
            </form>
        </div>
</template>

<script>
import {getSurvey} from "../api/getSurvey";
import storage from "../utils/storage";
export default {
  name: 'SurveyMain',
  data () {
    return {
      quantityListing: null,
      bestListing: null,
      host:location.hostname,

      selected: "Neither",
      
      column1:"Extreme Important",
      column2:"Very Important",
      column3:"Slightly Important",
      column4:"Not Important",
      column5:"Increase/decrease credibility",
      //rows:[{name:"Your prior knowledge"},{name: "News source"}, {name:"Headline claim"}, {name:"Image associated with post"}],
      textfield:"others",
      options:[{value:"Neither increase nor decrease"}, {value:"Increase"}, {value:"Decrease"}],
      option1:"Neither",
      option2:"Increase",
      option3:"Decrease",
      rows: [
      { id: "Your prior knowledge", type1: "radio", type2: 'radio', type3:'radio', type4:'radio', type5:'radio' },
      { id: "News source",  type1: "radio", type2: 'radio', type3:'radio', type4:'radio', type5:'radio' },
      { id: "Headline claim", type1: "radio", type2: 'radio', type3:'radio', type4:'radio', type5:'radio' },
      { id: "Image associated with post",  type1: "radio", type2: 'radio', type3:'radio', type4:'radio', type5:'radio' },
    ]
    }
  },
  mounted(){
    this.initPage();
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
  }
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
  height: 1%;
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


</style>
