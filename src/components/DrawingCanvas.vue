<template>
  <v-container @paste="pasteImage" id="container">
    <v-card v-show="src">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-text-field v-model="range.start" label="start">
              start
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-text-field v-model="range.end" label="end">end</v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-btn @click="draw()">draw</v-btn>
      <v-btn @click="process()">process</v-btn>
    </v-card>
    <v-row>
      <v-col cols="12" md="6" lg="6" xl="6">
        original image
        <canvas width="500" height="1000" ref="originalCanvas"></canvas
      ></v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        processed image
        <canvas width="500" height="1000" ref="processedCanvas"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
} from "@vue/composition-api";

export default defineComponent({
  name: "DrawingCanvas",
  setup: () => {
    // data
    const range = ref({
      start: 50,
      end: 100,
    });
    const value = ref(0);
    const src = ref("");

    const originalCanvas = ref();
    const processedCanvas = ref();
    const originalContext = ref();
    const processedContext = ref();
    // method
    const draw = () => {
      console.log("draw original image");
      var originalImage = new Image();
      originalImage.src = src.value;

      // 画像サイズ取得
      var imageWidth = originalImage.width;
      var imageHeight = originalImage.height;

      // 消去
      clearCanvas(originalCanvas.value);
      // 元イメージ描画
      originalContext.value.drawImage(
        originalImage,
        0,
        0,
        imageWidth,
        imageHeight,
        0,
        0,
        500,
        (imageHeight * 500) / imageWidth
      );
      console.log("draw processed image");
      var processedImage = new Image();
      processedImage.src = src.value;
      // 画像サイズ取得
      var processedImageWidth = processedImage.width;
      var processedImageHeight = processedImage.height;
      // var imageAspectRatio = imageHeight / imageWidth;
      // ↑のイメージ

      // 消去

      clearCanvas(processedCanvas.value);
      // 元イメージ描画
      processedContext.value.drawImage(
        processedImage,
        0,
        0,
        processedImageWidth,
        processedImageHeight,
        0,
        0,
        500,
        (processedImageHeight * 500) / processedImageWidth
      );
    };
    const clearCanvas = (canvas) => {
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log(
        "clear canvas width: ",
        canvas.width,
        " canvas.height: ",
        canvas.height
      );
    };

    const process = () => {
      console.log("process");
      // キャンバスを初期化
      clearCanvas(processedCanvas.value);
      var processedImage = new Image();
      processedImage.src = src.value;
      // 画像サイズ取得
      var processedImageWidth = processedImage.width;
      var processedImageHeight = processedImage.height;

      // 大小順番比較
      if (range.value.start > range.value.end) {
        var tmpStart = range.value.start;
        var tmpEnd = range.value.end;
        range.value.start = tmpEnd;
        range.value.end = tmpStart;
      }

      // 上部分を描画
      processedContext.value.drawImage(
        processedImage,
        0,
        0,
        processedImageWidth,
        range.value.start,
        0,
        0,
        500,
        (range.value.start * 500) / processedImageWidth
      );
      // 下部分を描画
      processedContext.value.drawImage(
        processedImage,
        0,
        range.value.end,
        processedImageWidth,
        processedImageHeight - range.value.end,
        0,
        (range.value.start * 500) / processedImageWidth,
        500,
        ((processedImageHeight - range.value.end) * 500) / processedImageWidth
      );
      // 間部分を描画;
      processedContext.value.beginPath();
      processedContext.value.moveTo(
        0,
        (range.value.start * 500) / processedImageWidth - 5
      );
      for (var i = 0; i < 10; i++) {
        var waveHeight1 = i % 2 == 0 ? 10 * 1 : 10 * -1;

        // sin カーブ描画
        processedContext.value.quadraticCurveTo(
          25 + i * 50,
          (range.value.start * 500) / processedImageWidth + waveHeight1 - 5,
          (i + 1) * 50,
          (range.value.start * 500) / processedImageWidth - 5
        );
      }
      processedContext.value.lineTo(
        500,
        (range.value.start * 500) / processedImageWidth + 5
      );
      for (var j = 10; j > 0; j--) {
        var waveHeight2 = j % 2 == 0 ? 10 * -1 : 10 * 1;

        // sin カーブ描画
        processedContext.value.quadraticCurveTo(
          25 + (j - 1) * 50,
          (range.value.start * 500) / processedImageWidth + waveHeight2 + 5,
          (j - 1) * 50,
          (range.value.start * 500) / processedImageWidth + 5
        );
      }
      processedContext.value.lineTo(
        0,
        (range.value.start * 500) / processedImageWidth
      );

      processedContext.value.fillStyle = "rgb(255,255,255)";
      processedContext.value.fill();
      processedContext.value.strokeStyle = "gray";
      processedContext.value.stroke();
    };
    const pasteImage = (event) => {
      console.log("called paste image()");
      event.preventDefault();
      event.stopPropagation();
      let blob = event.clipboardData.items[0].getAsFile();
      console.log(blob);
      let blobUrl = window.URL.createObjectURL(blob);
      // do something with url here
      src.value = blobUrl;
      console.log(blobUrl);
      draw();
    };
    onMounted(() => {
      // originalCanvas.value = this.$refs.originalCanvas;
      originalContext.value = originalCanvas.value.getContext("2d");
      // processedCanvas.value = this.$refs.processedCanvas;
      processedContext.value = processedCanvas.value.getContext("2d");
      // event listener
      window.addEventListener("paste", this.pasteImage());
    });
    onUnmounted(() => {
      window.removeEventListener("paste", this.pasteImage());
    });

    // return
    return {
      range,
      value,
      src,
      originalCanvas,
      processedCanvas,
      originalContext,
      processedContext,
      draw,
      process,
      pasteImage,
    };
  },
});
</script>

<style scoped>
#container {
  background: #cfd8dc;
}
</style>