<template>
  <v-container
    @paste="pasteImage"
    id="container"
    @dragover="dragover"
    @drop.stop="dropImage"
    @mousemove="mousemove"
    @mouseleave="mouseleave"
  >
    <v-btn v-show="src" @click="drawInitialCanvas()">original</v-btn>
    <v-btn v-show="src" @click="downloadImage()">download</v-btn>
    <v-row>
      <v-overlay :value="!src" absolute>
        画像をドロップもしくはペーストしてください。</v-overlay
      >
      <v-col cols="12" md="6" lg="6" xl="6">
        original image
        <div id="originalArea">
          <canvas
            width="500"
            height="1000"
            ref="originalCanvas"
            id="originalCanvas"
            @mousedown="mousedown"
            @mouseup="mouseup"
          ></canvas>
          <canvas
            width="500"
            height="1000"
            ref="originalOverlayCanvas"
            id="originalOverlayCanvas"
            @mousedown="mousedown"
            @mouseup="mouseup"
          >
          </canvas>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        processed image
        <div>
          <canvas width="500" height="1000" ref="processedCanvas"></canvas>
          <a
            v-show="false"
            id="downloadLink"
            ref="downloadLink"
            download="canvas.png"
            >download link</a
          >
        </div>
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
    const originalContext = ref();
    const originalOverlayCanvas = ref();
    const originalOverlayContext = ref();
    const processedCanvas = ref();
    const processedContext = ref();
    const downloadLink = ref();
    const imageRatio = ref();
    const onSelecting = ref(false);
    const defaultCanvasWidth = ref(500);

    /**
     * 最初の表示
     */
    const drawInitialCanvas = () => {
      // canvas 初期化
      clearCanvas(originalCanvas.value);
      clearCanvas(originalOverlayCanvas.value);
      clearCanvas(processedCanvas.value);
      console.log("draw original image");
      // Image インスタンス
      var originalImage = new Image();
      originalImage.src = src.value;

      // 画像サイズ取得
      var imageWidth = originalImage.width;
      var imageHeight = originalImage.height;
      originalCanvas.value.height =
        (imageHeight * defaultCanvasWidth.value) / imageWidth;
      // 比率取得
      imageRatio.value = defaultCanvasWidth.value / imageWidth;

      // 元イメージ描画
      originalContext.value.drawImage(
        originalImage,
        0,
        0,
        imageWidth,
        imageHeight,
        0,
        0,
        defaultCanvasWidth.value,
        (imageHeight * defaultCanvasWidth.value) / imageWidth
      );
    };
    /**
     * キャンバスを初期化
     */
    const clearCanvas = (canvas) => {
      var context = canvas.getContext("2d");
      canvas.width = defaultCanvasWidth.value;
      canvas.height = 1000;
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
      processedCanvas.value.height =
        (processedImageHeight * defaultCanvasWidth.value) / processedImageWidth;

      setTimeout(() => {
        // 上部分を描画
        drawUpperImage(
          processedContext.value,
          processedImage,
          range.value.start,
          defaultCanvasWidth.value
        );

        // 下部分を描画
        drawLowerImage(
          processedContext.value,
          processedImage,
          range.value.start,
          range.value.end,
          defaultCanvasWidth.value
        );

        // 間部分を描画;
        drawMiddleImage(
          processedContext.value,
          processedImage,
          range.value.start,
          defaultCanvasWidth.value
        );
      }, 100);
    };

    /**
     * 省略部分画像を選択
     */
    const selectImage = (mouseEvent) => {
      // 初期化
      clearCanvas(originalOverlayCanvas.value);
      // 画像sizeを取得
      var originalOverlayImage = new Image();
      originalOverlayImage.src = src.value;

      // 画像サイズ取得
      var imageWidth = originalOverlayImage.width;
      var imageHeight = originalOverlayImage.height;
      originalOverlayCanvas.value.height =
        (imageHeight * defaultCanvasWidth.value) / imageWidth;

      // clip 領域の値を取得
      var mouseIndex = getYIndex(mouseEvent);
      var startYIndex = range.value.start * imageRatio.value;
      var start = startYIndex < mouseIndex ? startYIndex : mouseIndex;
      var end = startYIndex < mouseIndex ? mouseIndex : startYIndex;
      // clip 領域を作成

      console.log("originalOverlayContext", originalOverlayContext.value);
      originalOverlayContext.value.beginPath();
      originalOverlayContext.value.moveTo(0, start);
      originalOverlayContext.value.lineTo(defaultCanvasWidth.value, start);
      originalOverlayContext.value.lineTo(defaultCanvasWidth.value, end);
      originalOverlayContext.value.lineTo(0, end);
      originalOverlayContext.value.closePath();
      originalOverlayContext.value.clip();
      // フィルター
      originalOverlayContext.value.filter = "grayscale(100%) brightness(50%)";

      // 元イメージ描画
      originalOverlayContext.value.drawImage(
        originalOverlayImage,
        0,
        0,
        imageWidth,
        imageHeight,
        0,
        0,
        defaultCanvasWidth.value,
        (imageHeight * defaultCanvasWidth.value) / imageWidth
      );
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
    const dropImage = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length !== 1 || files[0].type.indexOf("image") !== 0) {
        console.log("画像ファイルではありません。");
        return;
      }
      const file = files[0];
      let fileUrl = window.URL.createObjectURL(file);
      src.value = fileUrl;
      drawInitialCanvas();
    };
    const dragover = (event) => {
      event.preventDefault();
    };
    /**
     * 画像をダウンロード
     */
    const downloadImage = () => {
      let link = downloadLink.value;
      link.href = processedCanvas.value.toDataURL();
      link.click();
    };

    /**
     * マウスイベント
     */
    const mousedown = (mouseEvent) => {
      mouseEvent.preventDefault();
      onSelecting.value = true;
      range.value.start = getYIndex(mouseEvent) / imageRatio.value;
      range.value.end = getYIndex(mouseEvent) / imageRatio.value;
      // overlay reset
      clearCanvas(originalOverlayCanvas.value);
    };
    const mouseup = (mouseEvent) => {
      mouseEvent.preventDefault();
      onSelecting.value = false;
      range.value.end = getYIndex(mouseEvent) / imageRatio.value;
      process();
    };
    const mouseleave = (mouseEvent) => {
      mouseEvent.preventDefault();
      onSelecting.value = false;
    };
    const mousemove = (mouseEvent) => {
      mouseEvent.preventDefault();
      if (onSelecting.value) {
        console.log("mousemove");
        selectImage(mouseEvent);
      }
    };
    // y 座標を取得
    const getYIndex = (mouseEvent) => {
      var clientRect = originalCanvas.value.getBoundingClientRect();
      return mouseEvent.clientY - clientRect.top;
    };
    onMounted(() => {
      originalContext.value = originalCanvas.value.getContext("2d");
      originalOverlayContext.value = originalOverlayCanvas.value.getContext(
        "2d"
      );
      processedContext.value = processedCanvas.value.getContext("2d");
    });
    onUnmounted(() => {});

    watch(src, () => {
      setTimeout(() => {
        drawInitialCanvas();
      }, 100);
    });

    // return
    return {
      range,
      value,
      src,
      imageRatio,
      onSelecting,
      originalCanvas,
      originalContext,
      originalOverlayCanvas,
      originalOverlayContext,
      processedCanvas,
      processedContext,
      downloadLink,
      drawInitialCanvas,
      mousedown,
      mouseup,
      mouseleave,
      mousemove,
      getYIndex,
      process,
      selectImage,
      pasteImage,
      drawUpperImage,
      drawLowerImage,
      drawMiddleImage,
      dropImage,
      dragover,
      downloadImage,
      defaultCanvasWidth,
    };
  },
});
</script>

<style scoped>
#container {
  background: #cfd8dc;
}
#originalArea {
  position: relative;
}
#originalCanvas {
  position: absolute;
}
#originalOverlayCanvas {
  position: absolute;
}
</style>