<template>
  <div>
    <Description msg="画像を省略するやつ" />
    <DrawingCanvas />
  </div>
</template>

<script>
import Description from "./components/Description.vue";
import DrawingCanvas from "./components/DrawingCanvas.vue";

export default {
  name: "App",
  components: {
    Description,
    DrawingCanvas,
  },
  data: function () {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
