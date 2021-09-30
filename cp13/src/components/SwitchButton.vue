<template>
  <div class="next">
    <br/>
    <button class="btn-primary btn-lg" v-on:click="forwardQuestion">
      <i class="glyphicon glyphicon-arrow-left"></i> Prev Question
    </button>
    <button class="btn-primary btn-lg" v-on:click="nextQuestion()">
      Next Question <i class="glyphicon glyphicon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import {tempStorage,storage} from "../utils/storage";
import {postResp} from "../api/postSurvey";
import router from "../router"

export default {
  name: "SwitchButton",
  props: {
    response: String,
    requireANS:Boolean,
    required: true
  },
  methods:{nextQuestion() {
      let current = tempStorage.get(this.$route.params.id+"CURRENT");
      let total  = tempStorage.get(this.$route.params.id+"TOTAL");
      // console.log("收到："+this.response);

      if (this.requireANS) {
        if (this.response === "" || this.response === null) {
          alert("Please fill in the form!");
          return;
        }
      } else {
        if (this.response === "" || this.response === null) {
          tempStorage.set(this.$route.params.id+current+"ANSWER",{})
          current += 1;
          tempStorage.set(this.$route.params.id+"CURRENT",current);
          location.reload();
          return;
        }
      }

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
            router.push({name:'Complete'});
          } else {
            alert("Network Error")
          }
        })
        sessionStorage.clear();
      }

    },
    forwardQuestion() {
      let current = tempStorage.get(this.$route.params.id+"CURRENT");
      if (current >1){
            if(this.response === "" || this.response === null){
              tempStorage.set(this.$route.params.id+current+"ANSWER", {});
            }else{
              tempStorage.set(this.$route.params.id+current+"ANSWER",JSON.parse(this.response))
            }
            current -= 1;
            tempStorage.set(this.$route.params.id+"CURRENT",current);
            location.reload();
        } else {
            alert("This is the first question!");
        }
    },
    submit(contactINFO, content) {
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
    width: 450px;
    margin: 0 auto;
  }
  .next button {
    margin-left: 25px;
  }
  .btn-primary{
    text-align:justify;
    text-align-last:justify;
    line-height:0;
  }
</style>
