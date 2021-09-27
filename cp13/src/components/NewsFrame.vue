<template>

</template>
<div class="container">
<div>
  <h4>{{newsTitle}}</h4>
</div>
<div>
  <img src="{{imgPath}}}" alt="">
</div>
<div>
  <p>{{description}}}</p>
</div>
</div>>
<script>
export default {
  name: "NewsFrame",
  props: {
    imgPath: String,
    newsTitle:String,
    description:String,
    required: true
  },
}
</script>

<style scoped>

</style>
