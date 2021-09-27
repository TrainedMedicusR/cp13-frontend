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


      <div class="form">
        <form action="#" method="get">
          <table class="choiceTab">
            <tr v-for="item in options">
              <td v-if="item.textField==='false'">
                <label>
                  <input name="choice" type="radio" :value="item.option"/>
                  {{ item.option }}
                </label>
              </td>

              <td v-else-if="item.textField==='true'">
                <label>
<!--                  <input name="choice" type="radio" :value="item.option"/>-->
                  {{ item.option }}
                  <input name="choice" type="text" placeholder="type your answer here"/>
                </label>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
<!--    <div class="processButtons">-->
<!--      <button id="preBtn" class="previousButton"><img src="../../assets/leftArrow.png" alt="previous quesiton"></button>-->
<!--      <button id="nextBtn" class="previousButton"><img src="../../assets/rightArrow.png" alt="next quesiton"></button>-->
<!--    </div>-->
    <switch-button :response=responseJSON>

    </switch-button>
  </div>
</template>

<script>
import SwitchButton from "../SwitchButton";

export default {
  name: "MultipleChoice",
  components: {SwitchButton},
  data() {
    return {
      surveyTitle: "survey title",
      newsPicture: "",
      newsText: "news contentsbalabalabalabalabalabalabalabalabala",
      questionContents: "Please choose an option",

      options: [
        {id: 0, option: "option1", textField: "false"},
        {id: 1, option: "option2", textField: "false"},
        {id: 2, option: "Other reasons", textField: "true"}
      ],
      responseJSON: ""
    }
  },
  mounted() {
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
  width: 500px;
  margin: 0 auto;
}

.questionContents {
  margin: 10px;
  margin-left: 30px;
  /*border: 1px solid black;*/
  text-align: left;
  font-size: 16px;
  width: 500px;
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
  padding: 16px;
  text-align: left;
}

.form input[type=text]{
  /*padding: 8px 8px;*/
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  border: 2px solid #ccc;
  border-radius: 4px;
}
.form input[type=text]:focus {
  width: 100%;
}
</style>
