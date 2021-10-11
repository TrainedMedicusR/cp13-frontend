<template>
  <div class="error-block">
    <div class="grids-2">
      <div class="right-grid">
        <h2>404</h2>
        <h3>Not Found</h3>
        <hr>
        <h3>Cannot find specified survey</h3>
        <h3>Please check if you entered the correct route!</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotAuthorised"
}
</script>

<style scoped>
h1,
h2,
h3{
  margin: 0;
  padding: 0
}

.error-block {
  text-align: center;
  align-items: center;
}

.error-block h2 {
  color: #fff;
  font-size: 16em;
  margin: 20px;
  line-height: .8em;
  font-weight: bold;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  background: -webkit-linear-gradient(transparent, transparent);
  background: url(../assets/usyd.jpeg) repeat 0px 0px;
  background-size: contain;
  background: -o-linear-gradient(transparent, transparent);
  -webkit-background-clip: text;
}

.error-block .right-grid {
  text-align: center;
  padding: 70px 0px;
}

.error-block h3 {
  font-size: 35px;
  margin-top: 20px;
  font-weight: 600;
}
</style>
