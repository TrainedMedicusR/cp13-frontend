<template>
  <div class = wrapper>
    <div class="container">
      <div v-if="rtl">
        <div class="questionContentsRTL" dir="rtl">{{ msg }}</div>
        <div class="formRTL" dir="rtl">
          <form action="#" method="get">
            <table class="choiceTab">
              <tr v-for="item in options">
                <td v-if="item.textField==='false'">
                  <label>
                    {{ item.option }}
                    <input :id="item.option" name="choice" type="checkbox" :value="item.option" @click="setAnswer"/>
                  </label>
                </td>
                <td v-else-if="item.textField==='true'">
                  <label>
                    {{ item.option }}
                    <input id="text_choiceRTL" name="text_choiceRTL" type="text" v-on:blur="setAnswer" :placeholder="'type your '+item.option+' here'"/>
                  </label>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>




      <div v-else>
        <div class="questionContents">{{ msg }}</div>
        <div class="form">
          <form action="#" method="get">
            <table class="choiceTab">
              <tr v-for="item in options">
                <td v-if="item.textField==='false'">
                  <label>
                    {{ item.option }}
                    <input :id="item.option" name="choice" type="checkbox" :value="item.option" @click="setAnswer"/>
                  </label>
                </td>
                <td v-else-if="item.textField==='true'">
                  <label>
                    {{ item.option }}
                    <input id="text_choice" name="text_choice" type="text" v-on:blur="setAnswer" :placeholder="'type your '+item.option+' here'"/>
                  </label>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>

    <switch-button :requireANS="requireANS" :response=responseJSON>

    </switch-button>
  </div>
</template>

<script>
import SwitchButton from "./SwitchButton";
import {tempStorage} from "../utils/storage";

export default {
  name: "Contact",
  components: {SwitchButton},
  data() {
    return {
      description: "Please choose an option",
      requireANS:false,
      options: [
        {id: 0, option: "option1", textField: "false"},
        {id: 1, option: "option2", textField: "false"},
        {id: 2, option: "Other reasons", textField: "true"}
      ],
      responseJSON: "",
      rtl: false
    }
  },
  created() {
    this.initPage();
  },
  mounted() {
    this.loadAnswer();
  },
  methods:{
    initPage() {
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      let jsonObject = JSON.parse(JSON.stringify(jsonQuestion));
      this.msg = jsonObject.description;
      this.options = jsonObject.options;
      this.requireANS = jsonObject.Required;
    },
    setAnswer(event){
      let qValue = event.target.value;
      this.responseJSON = JSON.stringify({answer: qValue});
    },
    loadAnswer(){
      let jsonQuestion = tempStorage.getQuestionAnswerJSON(this.$route.params.id);
      let answerID = jsonQuestion.answer;
      this.responseJSON = JSON.stringify(jsonQuestion);
      if (this.responseJSON !== "{}") {
        let radioTag = document.getElementById(answerID);
        document.getElementById(answerID).checked = true;
        if (!this.rtl){
          document.getElementById("text_choice").value = answerID;
        }else{
          document.getElementById("text_choiceRTL").value = answerID;
        }
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  text-align: center;
}

.container {
  /*border: 1px solid grey;*/
  width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  align-content: center;
  /*border: 1px solid black;*/
}

.questionContents {
  margin: 10px 10px 10px 30px;
  /*border: 1px solid black;*/
  text-align: left;
  font-size: 16px;
  /*width: 500px;*/
  font-weight: 700;
}

.questionContentsRTL {
  margin: 10px 10px 10px 30px;
  /*border: 1px solid black;*/
  text-align: right;
  font-size: 16px;
  /*width: 600px;*/
  font-weight: 700;
}

.previousButton img {
  width: 30px;
}

.form{
  padding: 25px;
  text-align: left;
  font-size: 16px;
}

.formRTL{
  padding: 25px;
  text-align: right;
  font-size: 16px;
}

.form input[type=text]{
  padding: 5px 5px;
  width: 300px;
  -webkit-transition: width 0.5s ease-in-out;
  transition: width 0.5s ease-in-out;
  border: 2px solid #ccc;
  border-radius: 4px;
}
.form input[type=text]:focus {
  /*width: 100%;*/
  width: 500px;
}

.form label{
  cursor: pointer;
  margin: 10px;
}
</style>
