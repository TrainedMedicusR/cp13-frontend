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
import {tempStorage} from "../utils/storage";

export default {
  name: "SwitchButton",
  props: {
    response: String,
    required: true
  },
  methods:{nextQuestion() {
      let current = tempStorage.get(this.$route.params.id+"CURRENT");
      let total  = tempStorage.get(this.$route.params.id+"TOTAL");
      if (current < total){
        current += 1;
        // window.scrollTo({
        //   left: 0,
        //   top: 0,
        //   behavior: 'smooth'
        // })
        tempStorage.set(this.$route.params.id+"CURRENT",current);
        location.reload();
      } else {
        alert("Thank you for your participation!");
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
    submit(surveyID, questionID, content, identifier) {
      //TODO
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
