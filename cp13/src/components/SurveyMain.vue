<template>
  <div class="wrapper">
    <hr>
    <header class = "surveyTitle">
      <h1>{{surveyTitle}}</h1>
      <h2>Question {{counter}}:</h2>
    </header>
    <drag-and-drop class="container" v-if="counter===1">

    </drag-and-drop>

    <button-question class="container" v-if="counter===2">

    </button-question>

    <likert class="container" v-if="counter===3">

    </likert>

    <NumberScale class="container" v-if="counter===4">

    </NumberScale>


    <div class="next">
      <button class="btn-next btn-sm" v-on:click="forwardQuestion">
        <i class="glyphicon glyphicon-arrow-left"></i> Prev Question
      </button>
      <button class="btn-next btn-sm" v-on:click="nextQuestion()">
        Next Question <i class="glyphicon glyphicon-arrow-right"></i>
      </button>
    </div>

  </div>
</template>

<script>
import ButtonQuestion from "./questions/ButtonQuestion";
import {getSurvey} from "../api/getSurvey";
// import {postSurvey} from "../api/postSurvey";
import {storage,tempStorage} from "../utils/storage";
import DragAndDrop from "./DragAndDrop";
import Likert from "./questions/Likert"
import NumberScale from "./questions/NumberScale";




export default {
  name: 'SurveyMain',
  components: {ButtonQuestion, DragAndDrop, Likert, NumberScale},
  data () {
    return {
      surveyTitle:null,
      counter:1,
      MCQ:false,
      SCALE:false,
      BTN:false,
      DRAG:false,
      host:location.hostname,
    }
  },
  mounted(){
    this.initPage();
  },
  methods: {
    initPage() {
      const resJSON = getSurvey(this.$route.params.id).then(response=>{
        if (response.status === 200){
          let identifier = this.$route.params.id + new Date().getTime()
          const hashString = this.$md5(identifier);
          storage.set(this.$route.params.id,hashString);
          const jsonString = response.data
          console.log(jsonString);
          this.surveyTitle = jsonString.name;
          //Need Optimisation
          tempStorage.set(this.$route.params.id,jsonString.block)
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
    nextQuestion() {
      console.log(tempStorage.get(this.$route.params.id))
      // let qList = JSON.parse(tempStorage.get(this.$route.params.id)).get(0);
      // let qlength = qList.length;
      // console.log("长度："+qlength)
      if (this.counter < 4){
        this.counter += 1;
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth'
        })
      } else {
        alert("Thank you for your participation!");
      }

    },
    forwardQuestion() {
      if (this.counter > 1) {
        this.counter -= 1;
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth'
        })
      } else {
        alert("This is the first question")
      }
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
