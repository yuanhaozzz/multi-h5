import SVGA from "svgaplayerweb";

const MAP_SVGA = {};

export default class Svga {
  /**
   * 加载svga
   */
  static load(url) {
    if (MAP_SVGA[url]) return MAP_SVGA[url];
    MAP_SVGA[url] = new Promise((resolve, reject) => {
      const svgaDiv = document.createElement("div");
      svgaDiv.style.display = "none";
      svgaDiv.setAttribute("id", "svga-div");
      document.body.appendChild(svgaDiv);
      const parser = new SVGA.Parser("#svga-div");
      parser.load(
        url,
        (videoItem) => {
          MAP_SVGA[url] = videoItem;
          resolve(videoItem);
          svgaDiv.remove();
        },
        (e) => {
          delete MAP_SVGA[url];
          reject(e);
        }
      );
    });
    return MAP_SVGA[url];
  }

  /**
   * 预加载svga
   */
  static preload(...arrUrls) {
    if (!arrUrls || !arrUrls.length) return;
    for (let i = 0; i < arrUrls.length; i++) {
      const url = arrUrls[i];
      if (MAP_SVGA[url]) continue;
      Svga.load(url);
    }
  }

  /**
   * 播放svga
   * @param option.selector 承载svga的元素选择器，例如: #svga-anim
   * @param option.url svga动画url地址
   * @param option.loops 动画循环次数
   * @param option.onFinished 动画播放完成回掉函数
   */
  static async play(option) {
    const player = new SVGA.Player(option.selector);
    option.onFinished && player.onFinished(option.onFinished);
    option.onFrame && player.onFrame(option.onFrame);
    player.loops = option.loops || 0;
    let videoItem;
    if (
      Object.prototype.toString.call(MAP_SVGA[option.url]) ===
      "[object Promise]"
    ) {
      videoItem = await MAP_SVGA[option.url];
    } else {
      videoItem = await Svga.load(option.url);
    }
    // console.log('player: ', player);
    player.setVideoItem(videoItem);
    player.startAnimation();
    return player;
  }
}
