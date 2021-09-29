<template>
  <div class="next">
    <br/>
    <button class="btn-next btn-sm" v-on:click="forwardQuestion">
      <i class="glyphicon glyphicon-arrow-left"></i> Prev Question
    </button>
    <button class="btn-next btn-sm" v-on:click="nextQuestion()">
      Next Question <i class="glyphicon glyphicon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import {tempStorage,storage} from "../utils/storage";
import {postResp} from "../api/postSurvey";

export default {
  name: "SwitchButton",
  props: {
    response: String,
    required: true
  },
  methods:{nextQuestion() {
      let current = tempStorage.get(this.$route.params.id+"CURRENT");
      let total  = tempStorage.get(this.$route.params.id+"TOTAL");
      console.log("收到："+this.response);
      if (current < total){
        this.submit("",this.response).then(response=>{
          if (response.status === 200){
            tempStorage.set(this.$route.params.id+current+"ANSWER",JSON.parse(this.response))
            current += 1;
            tempStorage.set(this.$route.params.id+"CURRENT",current);
            location.reload();
          } else {
            alert("Network Error")
          }
        })
      } else {
        this.submit("",this.response).then(response=>{
          if (response.status === 200){
            alert("Thank you for your participation!");
          } else {
            alert("Network Error")
          }
        })
        sessionStorage.clear();
      }

    },
    forwardQuestion() {
      let current = tempStorage.get(this.$route.params.id+"CURRENT");
      let total  = tempStorage.get(this.$route.params.id+"TOTAL");
      if (current > 1) {
        current -= 1;
        // window.scrollTo({
        //   left: 0,
        //   top: 0,
        //   behavior: 'smooth'
        // })
        tempStorage.set(this.$route.params.id+"CURRENT",current);
        location.reload();
      } else {
        alert("This is the first question")
      }
    },
    submit(contactINFO, content) {
      if (this.response === "" || this.response === null) {
        alert("Please fill in the form!");
        return;
      }
      let questionID = tempStorage.get(this.$route.params.id+"CURRENT");
      let surveyID = tempStorage.get(this.$route.params.id+"sid");
      let identifier = storage.get(this.$route.params.id);
      let contentJSON = JSON.parse(content);
      return postResp(surveyID, questionID, contactINFO, contentJSON, identifier);
    }
  }
}
</script>

<style scoped>
  .next{
    width: 300px;
    margin: 0 auto;
  }
  .next button {
    margin-left: 25px;
  }
</style>
