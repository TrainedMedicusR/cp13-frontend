<template>
  <div class="wrapper">
<!--    <div class="surveyTitle">-->
<!--      <h1>{{ surveyTitle }}</h1>-->
<!--    </div>-->
    <div class="container">
<!--      <div class="news">-->
<!--        <div class="picture">{{ newsPicture }}</div>-->
<!--        <div class="newsText">{{ newsText }}</div>-->
<!--      </div>-->
      <div class="questionContents">{{ questionContents }}</div>
      <div class="range">
<!--        <text class="rangeText" id="firstRange">{{ firstRange }}</text>-->
<!--        <text class="rangeText" id="secondRange">{{ secondRange }}</text>-->
<!--        <text class="rangeText" id="thirdRange">{{ thirdRange }}</text>-->
      </div>
      <div class="rankButtons" v-for="n in rankNumber">
        <button class="rankButton" :value="n" @click="click($event,n)">{{n}}</button>
      </div>
<!--      <div class="rankButtons">-->
<!--        <button id="btn1" class="rankButton">1</button>-->
<!--        <button id="btn2" class="rankButton">2</button>-->
<!--        <button id="btn3" class="rankButton">3</button>-->
<!--        <button id="btn4" class="rankButton">4</button>-->
<!--        <button id="btn5" class="rankButton">5</button>-->
<!--        <button id="btn6" class="rankButton">6</button>-->
<!--        <button id="btn7" class="rankButton">7</button>-->
<!--        <button id="btn8" class="rankButton">8</button>-->
<!--        <button id="btn9" class="rankButton">9</button>-->
<!--      </div>-->
    </div>

    <switch-button :response="responseJSON">

    </switch-button>
  </div>
</template>

<script>
import {tempStorage} from "../../utils/storage";
import SwitchButton from "../SwitchButton";
export default {
  name: "NumberScale",
  components: {SwitchButton},
  data() {
    return {
      surveyTitle: "survey title",
      newsPicture:"",
      newsText:"news contentsbalabalabalabalabalabalabalabalabala",
      questionContents: "Please rank the reliability",
      // firstRange: "Not reliable",
      // secondRange: "Neutral",
      // thirdRange: "Very reliable",
      rankNumber: 40,
      responseJSON: '',
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage(){
      //TODO
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      console.log("JSON: "+JSON.stringify(jsonQuestion));
      let jsonObject = JSON.parse(JSON.stringify(jsonQuestion));

      this.surveyTitle = jsonObject.newsTitle;
      this.newsPicture=jsonObject.img;
      this.newsText = jsonObject.newsDescription;
      this.questionContents=jsonObject.questionContents;
      this.rankNumber=jsonObject.rankNumber;
    },
    click(tmp,n){
      console.log(n);
      this.responseJSON = JSON.stringify({"answer": n});
      console.log(this.responseJSON);
    }
  }
}
</script>

<style scoped>
.wrapper{
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

.news{
  text-align: center;
  /*border: 1px solid grey;*/
  font-size: 20px;
  /*align-content: center;*/
  margin-bottom: 20px;
}

.newsText{
  margin-top: 12px;

}
.picture{
  border: 5px solid grey;
  height: 100px;
  width: 500px;
  margin: 0 auto;
}
#firstRange {
  margin-right: 100px;
}

#secondRange {
  margin-right: 100px;
}

/*#thirdRange{*/
/*    margin-right: 100px;*/
/*}*/

.questionContents {
  margin: 10px;
  margin-left: 30px;
  /*border: 1px solid black;*/
  text-align: left;
  font-size: 16px;
  width: 500px;
}

.range {
  margin: 50px;
  width: 700px;
  font-size: 12px;
}

.rankButtons {
  margin-right: auto;
  margin-left: auto;
  font-size: 20px;
  display: inline-block;
}

.rankButton{
  padding: 8px;
  width: 50px;
  height: 50px;
  border: white;
  border-radius: 12px;
  margin: 9px;

}

.rankButton:hover{
    background-color: #1947E5;
    color: white;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
}

.previousButton{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #E44E33;
  border: white;
  text-align: center;

}
.previousButton:active{
  /*background: black;*/
  /*opacity: 0.5;*/
  box-shadow: 0 3px #666;
  transform: translateY(2px);
}
.previousButton img{
  width: 30px;
}

#preBtn{
  margin-right: 200px;
}
#nextBtn{
  margin-left: 200px;
}
</style>
