<template>

  <div class="container">
    <div class="questionContents">{{questionContents}}</div>
    <div class = "range">
      <text class="rangeText" id="firstRange">{{firstRange}}</text>
      <text class="rangeText" id = "secondRange">{{secondRange}}</text>
      <text class="rangeText" id = "thirdRange">{{thirdRange}}</text>
    </div>
    <div class="buttons">
      <button id="btn1" type="button">1</button>
      <button id="btn2" type="button">2</button>
      <button id="btn3" type="button">3</button>
      <button id="btn4" type="button">4</button>
      <button id="btn5" type="button">5</button>
      <button id="btn6" type="button">6</button>
      <button id="btn7" type="button">7</button>
      <button id="btn8" type="button">8</button>
      <button id="btn9" type="button">9</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "NumberScale",
  data() {
    return {
      questionContents: "Please rank the reliability",
      firstRange: "Not reliable",
      secondRange: "Neutral",
      thirdRange: "Very reliable",

    }
  },
  mounted(){
    this.initPage();
  },
}
</script>

<style scoped>
.container {
  border: 1px solid grey;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  align-content: center;
  /*border: 1px solid black;*/

}

#firstRange{
  margin-right: 100px;
}

#secondRange{
  margin-right: 100px;
}

/*#thirdRange{*/
/*    margin-right: 100px;*/
/*}*/

.questionContents{
  margin: 20px;
  margin-left: 50px;
  /*border: 1px solid black;*/
  text-align: left;

  width: 700px;
}
.range{
  margin: 50px;
  width: 700px;
}
.buttons{
  /*margin-left: 250px;*/
  margin-right: auto;
  margin-left: auto;
  font-size:100px;
  color: #EFF2F5;
  border-radius: 12px;
  /*-webkit-transition-duration: 0.4s;*/
  /*transition-duration: 0.4s;*/
}

#btn1:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn2:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn3:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn4:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn5:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn6:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn7:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn8:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#btn9:hover {
  background-color: #1947E5;
  color: white;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
</style>
