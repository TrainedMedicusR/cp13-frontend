<template>
<div class="TableList">
        <div class="list">
            <table class="listTab" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th v-for="(item) in tableHead" :key="item.key"> {{item.title}}</th>
                        <th> {{selector_title}} </th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="(item) in tableData" :key="item.openId">
                        <td v-for="(val,index) in tableHead" :key="index">  
                                             
                            <div v-if="item[val.key]=='radio1'">
                                <input id="Field1_1" name="Field1" type="radio" value= val.key />
                            </div>
                            <div v-else-if="item[val.key]=='radio2'">
                                <input id="Field2_1" name="Field2" type="radio" value= val.key />
                            </div>
                            <div v-else-if="item[val.key]=='radio3'">
                                <input id="Field3_1" name="Field3" type="radio" value= val.key />
                            </div>
                            <div v-else-if="item[val.key]=='radio4'">
                                <input id="Field4_1" name="Field4" type="radio" value= val.key />
                            </div>
                            <div v-else-if="item[val.key]=='radio5'">
                                <input id="Field5_1" name="Field5" type="radio" value= val.key />
                            </div>

                            <div v-else>
                              <div v-if= "val.key== 'category'">
                                <div v-if="item[val.key]=='Others'">
                                  {{item[val.key]}}<input id="Field6_1" name="Field6" type="url" class="field text medium" value="" maxlength="25" tabindex="36" /> 
                                </div>
                                <div v-else> {{item[val.key]}} </div>
                              </div>
                            </div>
                        </td>
                        
                        <td class = "selector">
                        <div>
                            <select>
                            <option v-for="option in options" v-bind:key="option.value">
                              {{ option.value }}
                            </option>
                            </select>
                          </div>
                        </td>
                    </tr>
                </tbody>
            </table> 
        </div>
</div>
</template>
 



<script>
import {getSurvey} from "../../api/getSurvey";
import storage from "../../utils/storage";

export default {
  name: 'SurveyMain',
  data () {
    return {
      quantityListing: null,
      bestListing: null,
      host:location.hostname,
      
      tableHead:[
                {key:"category",title:"Category"},
                {key:"extreme",title:"Extreme Important"},
                {key:"very",title:"Very Important"},
                {key:"slight",title:"Slightly Important"},
                {key:"not",title:"Not Important At All"},
            ],  
      tableData:[
          {category:"Your prior knowledge",extreme:"radio1",very:"radio1",slight:"radio1",not:"radio1"}, 
          {category:"News source",extreme:"radio2",very:"radio2",slight:"radio2",not:"radio2"}, 
          {category:"Headline claim",extreme:"radio3",very:"radio3",slight:"radio3",not:"radio3"}, 
          {category:"Image associated with post",extreme:"radio4",very:"radio4",slight:"radio4",not:"radio4"}, 
          {category:"Others",extreme:"radio5",slight:"radio5",very:"radio5",not:"radio5"}
          
      ],
      options:[{value:" "},{value:"Neither increase nor decrease"}, {value:"Increase"}, {value:"Decrease"}],
      selector_title: "Increase/Decrease Credibility"
      
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
  },

}


</script>

<style scoped>
 
.list{
  width: 98%;
  margin-left: 1%;
  overflow-x:auto;
}
table.listTab{
    width: 50%;
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
    font-size:14px;
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
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #cacacf;
    vertical-align: middle;
    word-break: break-all;
    min-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

table.listTab tbody > tr td:first-child{
    width: 50px;
}
table.listTab tbody > tr:hover{
    background-color: #d1e1f1;
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

table.listTab tbody > tr td div select{
  width: 100%;
}

</style>
