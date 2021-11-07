<template>
  <div class="wrapper">
    <news-frame :rtl="rtl" :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">

    </news-frame>
    <div class="container">
      <div class="requiredSpan" v-if="requireANS">
        <span>*required</span>
      </div>

      <div class="questionContents">{{ questionContents }}</div>
      <div v-if="rtl">
        <div class="range" dir="rtl">
          <!--        <text class="rangeText" id="firstRange">{{ firstRange }}</text>-->
          <!--        <text class="rangeText" id="secondRange">{{ secondRange }}</text>-->
          <!--        <text class="rangeText" id="thirdRange">{{ thirdRange }}</text>-->
        </div>
        <div class="rankButtons rtlButtons" dir="rtl" v-for="n in rankNumber">
          <button :id="n" class="rankButton" :value="n" @click="click($event,n)">{{ n }}</button>
        </div>
      </div>
      <div v-else>
        <div class="range">
          <!--        <text class="rangeText" id="firstRange">{{ firstRange }}</text>-->
          <!--        <text class="rangeText" id="secondRange">{{ secondRange }}</text>-->
          <!--        <text class="rangeText" id="thirdRange">{{ thirdRange }}</text>-->
        </div>
        <div class="rankButtons" v-for="n in rankNumber">
          <button :id="n" class="rankButton" :value="n" @click="click($event,n)">{{ n }}</button>
        </div>
      </div>

      <switch-button :requireANS="requireANS" :response="responseJSON">

      </switch-button>
    </div>
  </div>
</template>

<script>
import {tempStorage} from "../../utils/storage";
import SwitchButton from "../SwitchButton";
import NewsFrame from "../NewsFrame";

export default {
  name: "NumberScale",
  components: {SwitchButton, NewsFrame},
  data() {
    return {
      surveyTitle: "survey title",
      newsTitle: '',
      imgPath: '',
      newsDetails: '',
      requireANS: false,
      questionContents: "Please rank the reliability",
      // firstRange: "Not reliable",
      // secondRange: "Neutral",
      // thirdRange: "Very reliable",
      rankNumber: 40,
      responseJSON: '',
      rtl: true,
    }
  },
  created() {
    this.initPage();
  },
  mounted() {
    this.loadData();
  },
  methods: {
    initPage() {
      this.rtl = "true" === tempStorage.getRTL(this.$route.params.id);
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      let jsonObject = JSON.parse(JSON.stringify(jsonQuestion));
      this.newsTitle = jsonObject.newsTitle;
      this.imgPath = jsonObject.img;
      this.newsDetails = jsonObject.newsDescription;
      this.questionContents = jsonObject.questionContents;
      this.rankNumber = jsonObject.rankNumber;
      this.requireANS = jsonObject.Required;
    },
    click(tmp, n) {
      this.responseJSON = JSON.stringify({answer: n});
    },
    loadData() {
      let jsonQuestion = tempStorage.getQuestionAnswerJSON(this.$route.params.id);
      let answerID = jsonQuestion.answer;
      this.responseJSON = JSON.stringify(jsonQuestion);
      if (this.responseJSON === "{}") {
        return;
      }
      document.getElementById(answerID).focus();
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
  /*width: 800px;*/
  width: 100%;
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
  /*width: 500px;*/
  width: 100%;
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
  text-align: center;
  font-size: 16px;
}

.range {
  margin: 50px;
  /*width: 700px;*/
  width: 100%;
  font-size: 12px;
}

.rankButtons {
  margin-right: auto;
  margin-left: auto;
  font-size: 20px;
  display: inline-block;
}

.rankButton {
  padding: 8px;
  width: 50px;
  height: 50px;
  border: white;
  border-radius: 12px;
  margin: 9px;

}

.rankButton:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.rankButton:focus {
  background-color: #1947E5;
  color: white;
}


/*.rtlButtons{*/
/*  direction: rtl;*/
/*  writing-mode: vertical-rl;*/
/*}*/

.requiredSpan {
  font-size: smaller;
  color: #E44E33;
}

/*@media screen and(max-width: 960px){*/
/*  .wrapper{*/
/*    background-color: orange;*/
/*  }*/
/*}*/


</style>
