<template>
  <div class="wrapper">
    <news-frame :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">

    </news-frame>
    <div class="container">
      <div v-if="rtl">
        <div class="questionContentsRTL" dir="rtl">{{ questionContents }}</div>
        <div class="formRTL" dir="rtl">
          <form action="#" method="get">
            <table class="choiceTab">
              <tr v-for="item in options">
                <td v-if="item.textField==='false'">
                  <label>
                    <input :id="item.option" name="choice" type="radio" :value="item.option" @click="setAnswer"/>
                    {{ item.option }}
                  </label>
                </td>
                <td v-else-if="item.textField==='true'">
                  <label>
                    {{ item.option }}
                    <input id="text_choiceRTL" name="text_choiceRTL" type="text" v-on:blur="setAnswer" placeholder="type your answer here"/>
                  </label>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>




      <div v-else>
      <div class="questionContents">{{ questionContents }}</div>
      <div class="form">
        <form action="#" method="get">
          <table class="choiceTab">
            <tr v-for="item in options">
              <td v-if="item.textField==='false'">
                <label>
                  <input :id="item.option" name="choice" type="radio" :value="item.option" @click="setAnswer"/>
                  {{ item.option }}
                </label>
              </td>
              <td v-else-if="item.textField==='true'">
                <label>
                  {{ item.option }}
                  <input id="text_choice" name="text_choice" type="text" v-on:blur="setAnswer" placeholder="type your answer here"/>
                </label>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
    </div>
    <!--    <div class="processButtons">-->
<!--      <button id="preBtn" class="previousButton"><img src="../../assets/leftArrow.png" alt="previous quesiton"></button>-->
<!--      <button id="nextBtn" class="previousButton"><img src="../../assets/rightArrow.png" alt="next quesiton"></button>-->
<!--    </div>-->
    <switch-button :requireANS="requireANS" :response=responseJSON>

    </switch-button>
  </div>
</template>

<script>
import {tempStorage} from "../../utils/storage";
import SwitchButton from "../SwitchButton";
import NewsFrame from "../NewsFrame";

export default {

  name: "MultipleChoice",
  components: {SwitchButton,NewsFrame},
  data() {
    return {
      imgPath: "",
      newsDetails: "news contentsbalabalabalabalabalabalabalabalabala",
      questionContents: "Please choose an option",
      newsTitle: '',
      requireANS:false,
      options: [
        {id: 0, option: "option1", textField: "false"},
        {id: 1, option: "option2", textField: "false"},
        {id: 2, option: "Other reasons", textField: "true"}
      ],
      responseJSON: "",
      rtl: true
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
      this.newsTitle = jsonObject.newsTitle;
      this.imgPath = jsonObject.img;
      this.newsDetails = jsonObject.newsDescription;
      this.questionContents = jsonObject.questionContents;
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

.news {
  text-align: center;
  /*border: 1px solid grey;*/
  font-size: 20px;
  /*align-content: center;*/
  margin-bottom: 20px;
}

.newsText {
  margin-top: 12px;

}

.picture {
  border: 5px solid grey;
  height: 100px;
  width: 700px;
  margin: 0 auto;
}

.questionContents {
  margin: 10px 10px 10px 30px;
  /*border: 1px solid black;*/
  text-align: left;
  font-size: 16px;
  /*width: 500px;*/
}

.questionContentsRTL {
  margin: 10px 10px 10px 30px;
  /*border: 1px solid black;*/
  text-align: right;
  font-size: 16px;
  /*width: 600px;*/
}


.previousButton {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #E44E33;
  border: white;
  text-align: center;

}

.previousButton:active {
  /*background: black;*/
  /*opacity: 0.5;*/
  box-shadow: 0 3px #666;
  transform: translateY(2px);
}

.previousButton img {
  width: 30px;
}

#preBtn {
  margin-right: 200px;
}

#nextBtn {
  margin-left: 200px;
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
