<template>
  <div class="wrapper">
    <hr>

    <div class="progress">
      <div class="progress-bar" role="progressbar" :style="{width:progressWidth}" :aria-valuenow="currentPage" aria-valuemin="0" :aria-valuemax="totalPage">

        {{ progressWidth }}
      </div>
    </div>

    <header class = "surveyTitle">
      <h1 v-if="this.consent">{{surveyTitle}}</h1>
      <h2 v-if="this.consent">{{blockTitle}}</h2>
      <h3 v-if="this.consent">{{"Question "+QOrder}}</h3>
      <h1 v-if="this.consent === false">Consent Page</h1>
    </header>

    <consent-page v-on:consentValue="consentValue" v-if="this.consent === false" :text="consentText">

    </consent-page>

    <drag-and-drop class="container" v-if="QType === 'DRAG' && this.consent ">

    </drag-and-drop>

    <button-question class="container" v-if="QType === 'BTN' && this.consent">

    </button-question>

    <likert class="container" v-if="QType === 'LIKERT' && this.consent">

    </likert>

    <NumberScale class="container" v-if="QType === 'SCALE' && this.consent">

    </NumberScale>

    <MultipleChoice class="container" v-if="QType === 'MCQ' && this.consent">

    </MultipleChoice>

  </div>
</template>

<script>
import ButtonQuestion from "./questions/ButtonQuestion";
import {getSurvey} from "../api/getSurvey";

import {storage, tempStorage} from "../utils/storage";
import DragAndDrop from "./DragAndDrop";
import Likert from "./questions/Likert"
import NumberScale from "./questions/NumberScale";
import MultipleChoice from "./questions/MultipleChoice";
import ConsentPage from "./ConsentPage";
import router from "../router";


export default {
  name: 'SurveyMain',
  components: {ConsentPage, MultipleChoice, ButtonQuestion, DragAndDrop, Likert, NumberScale},
  data () {
    return {
      blockTitle:"",
      surveyID:"",
      consent: true,
      surveyTitle:"",
      QOrder:"",
      QType: "",
      hashString:"",
      consentText:"",
      currentPage:"",
      totalPage:"",
      progressWidth:"",
      host:location.hostname,
    }
  },
  created(){
    this.initPage();
  },
  methods: {
    initPage() {
      if(tempStorage.get(this.$route.params.id) !== null) {
        this.renderQuestion();
        return;
      }

      if (storage.get(this.$route.params.id) !== null){
        router.push({name:'NotAuthorised'});
        return;
      }
      const resJSON = getSurvey(this.$route.params.id).then(response=>{
        if (response.status === 200){
          let identifier = this.$route.params.id + new Date().getTime();
          const hashString = this.$md5(identifier);
          this.hashString = hashString;
          storage.set(this.$route.params.id,hashString);
          const jsonString = response.data;
          this.surveyID =jsonString.id;
          this.surveyTitle = jsonString.name;
          this.consentText = jsonString.consentText;
          this.consent = !eval(jsonString.consent_required);
          //Need Optimisation
          tempStorage.set(this.$route.params.id,jsonString.block)
          tempStorage.set(this.$route.params.id+"sid",this.surveyID)
          let block = jsonString.block[0]
          this.blockTitle = block.title;
          let questions = block.questions;
          for (let i = 0; i < questions.length; i++) {
            tempStorage.set(this.$route.params.id+questions[i].order,questions[i])
          }
          if (tempStorage.get(this.$route.params.id+"CURRENT")===null) {
            tempStorage.set(this.$route.params.id+"CURRENT",1);
          }
          tempStorage.set(this.$route.params.id+"TOTAL",jsonString.totalNum);
          this.renderQuestion();
        } else {
          alert("Data Error!");
        }}
      ).catch(e => {
        console.log(e);
      })
    },
    submit() {
      alert("Submit Success!")
    },
    consentValue(value){
      this.consent = eval(value);
    },
    renderQuestion(){
      let identifier = this.$route.params.id;
      let current = tempStorage.get(identifier+"CURRENT")
      let total = tempStorage.get(identifier+"TOTAL")
      let questionDetails = tempStorage.get(identifier+current)
      this.totalPage = total;
      this.currentPage = current;
      this.progressWidth = Math.floor(current / total * 100) + "%";
      console.log("total:"+this.totalPage + "currentPage:"+this.currentPage);
      this.QType = questionDetails.type;
      this.QOrder = questionDetails.order;
      console.log(this.QType);


    }
  }
}


</script>

<style scoped>
@import "../assets/css/bootstrap.css";

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

.next{
  margin:0;padding:0;
  text-align:justify;
  text-align-last:justify;
  line-height:0;
}
</style>
