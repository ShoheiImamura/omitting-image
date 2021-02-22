<template>
  <v-container @paste="pasteImage" id="container" @dragover="dragover" @drop.stop="dropImage">
    <v-card v-show="src">
      <v-card-text>
        画像src: {{src}}
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
      <v-btn @click="drawInitialCanvas()">draw</v-btn>
      <v-btn @click="process()">process</v-btn>
      <v-btn @click="downloadImage()">download</v-btn>
    </v-card>
    <v-row>
      <v-col cols="12" md="6" lg="6" xl="6">
        original image
        <canvas width="500" height="1000" ref="originalCanvas"></canvas
      ></v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        processed image
        <canvas width="500" height="1000" ref="processedCanvas"></canvas>
        <a v-show="false" id="downloadLink" ref="downloadLink" download="canvas.png">download link</a>
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
  watch,
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
    const downloadLink = ref();

    /**
     * 最初の表示
     */
    const drawInitialCanvas = () => {
      // canvas 初期化
      clearCanvas(originalCanvas.value);
      clearCanvas(processedCanvas.value);
      console.log("draw original image");
      // Image インスタンス
      var originalImage = new Image();
      originalImage.src = src.value;

      // 画像サイズ取得
      var imageWidth = originalImage.width;
      var imageHeight = originalImage.height;
      originalCanvas.value.height = (imageHeight * 500) / imageWidth;
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
      processedCanvas.value.height =  (processedImageHeight * 500) / processedImageWidth;

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
    };

    /**
     * 上部分を描画
     */
    const drawUpperImage = (context, image, start, canvasWidth) => {
      context.drawImage(
        image,
        0,
        0,
        image.width,
        start,
        0,
        0,
        canvasWidth,
        (start * canvasWidth) / image.width
      );
    };
    /**
     * 下部分を描画
     */
    const drawLowerImage = (context, image, start, end, canvasWidth) => {
      context.drawImage(
        image,
        0,
        end,
        image.width,
        image.height - end,
        0,
        (start * canvasWidth) / image.width,
        canvasWidth,
        //追加最後
        ((image.height - end) * canvasWidth) / image.width
      );
    };

    /**
     * 中間部分を描画
     */
    const drawMiddleImage = (context, image, start, canvasWidth) => {
      context.beginPath();
      // 開始地点
      context.moveTo(0, (start * canvasWidth) / image.width - 5);
      // 波線（to右上）
      for (var i = 0; i < 10; i++) {
        var waveHeight1 = i % 2 == 0 ? 10 * 1 : 10 * -1;
        // sin カーブ描画
        context.quadraticCurveTo(
          25 + i * (canvasWidth / 10),
          (start * canvasWidth) / image.width + waveHeight1 - 5,
          (i + 1) * (canvasWidth / 10),
          (start * canvasWidth) / image.width - 5
        );
      }
      // 直線（to右下）
      context.lineTo(canvasWidth, (start * canvasWidth) / image.width + 5);
      // 波線（to左下）
      for (var j = 10; j > 0; j--) {
        var waveHeight2 = j % 2 == 0 ? 10 * -1 : 10 * 1;

        // sin カーブ描画
        context.quadraticCurveTo(
          25 + (j - 1) * (canvasWidth / 10),
          (start * canvasWidth) / image.width + waveHeight2 + 5,
          (j - 1) * (canvasWidth / 10),
          (start * canvasWidth) / image.width + 5
        );
      }
      // 直線（to左上）
      context.lineTo(0, (start * canvasWidth) / image.width);
      context.fillStyle = "rgb(255,255,255)";
      context.fill();
      // 枠線
      context.strokeStyle = "gray";
      context.stroke();
    };

    /**
     * 画像を加工
     */
    const process = () => {
      // キャンバスを初期化
      clearCanvas(processedCanvas.value);
      var processedImage = new Image();
      processedImage.src = src.value;

      // 大小順番比較
      if (range.value.start > range.value.end) {
        var tmpStart = range.value.start;
        var tmpEnd = range.value.end;
        range.value.start = tmpEnd;
        range.value.end = tmpStart;
      }

      // 画像サイズ取得
      var processedImageWidth = processedImage.width;
      var processedImageHeight = processedImage.height;
      processedCanvas.value.height = ((processedImageHeight - (range.value.end - range.value.start)) * 500) / processedImageWidth;

      setTimeout(()=>{
        // 上部分を描画
        drawUpperImage(
          processedContext.value,
          processedImage,
          range.value.start,
          500
        );

        // 下部分を描画
        drawLowerImage(
          processedContext.value,
          processedImage,
          range.value.start,
          range.value.end,
          500
        );

        // 間部分を描画;
        drawMiddleImage(
          processedContext.value,
          processedImage,
          range.value.start,
          500
        );
      }, 100);
    };
    /**
     * 画像を添付
     */
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
      drawInitialCanvas();
    };
    /**
     * drop 画像を取得
     */
    const dropImage = (event)=> {
      event.preventDefault();
      const files = event.dataTransfer.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        console.log("画像ファイルではありません。")
        return
      }
      const file = files[0];
      let fileUrl = window.URL.createObjectURL(file);
      src.value = fileUrl;
      drawInitialCanvas();
    }
    const dragover = (event) =>{
      event.preventDefault();
    }
    /**
     * 画像をダウンロード
     */
    const downloadImage = () => {
      let link = downloadLink.value;
      link.href = processedCanvas.value.toDataURL();
      link.click();
    }
    onMounted(() => {
      originalContext.value = originalCanvas.value.getContext("2d");
      processedContext.value = processedCanvas.value.getContext("2d");
    });
    onUnmounted(() => {
    });

    watch(src, () => {
      setTimeout(()=>{
        drawInitialCanvas();
      }, 100)
    })

    // return
    return {
      range,
      value,
      src,
      originalCanvas,
      processedCanvas,
      originalContext,
      processedContext,
      downloadLink,
      drawInitialCanvas,
      process,
      pasteImage,
      drawUpperImage,
      drawLowerImage,
      drawMiddleImage,
      dropImage,
      dragover,
      downloadImage,
    };
  },
});
</script>

<style scoped>
#container {
  background: #cfd8dc;
}
</style>