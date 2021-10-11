<template>
  <div class = container>
    <div class="picture">
      <img src="../assets/usyd.jpeg" alt="Survey has been finished"/>
    </div>
    <div>
      <h1>Thank you for your participation!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Complete"
}
</script>

<style scoped>
.container {
  /*border: 1px solid grey;*/
  width: 700px;
  /*margin: 0 auto;*/
  padding: 20px;
  text-align: center;
  align-content: center;
  /*border: 1px solid black;*/
}
.picture{
  border: 2px solid grey;
  width: 600px;
  /*margin: 0 auto;*/
  display: inline-block;
  vertical-align: middle;
}

.picture img{
  /*height: 250px;*/
  width: 100%;
  height:100%;
  max-width: 100%;
  max-height: 100%;
  margin: auto;

}
h1{
  width: 560px;
  margin: 0 auto;
}
</style>
