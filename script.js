// 言葉を読み込む
const maxModels = 100;
for (let i = 1; i <= maxModels; i++) {
  const url = `models/word${i}.glb`;

  loader.load(
    url,
    (gltf) => {
      const model = gltf.scene;

// 言葉を降らせる関数
function spawnWord() {
  const scene = document.querySelector("a-scene");
  const model = document.createElement("a-entity");

  // ランダムにファイルを選ぶ
  const choice = words[Math.floor(Math.random() * words.length)];

  // ランダムなX座標 (-2～2)、Z座標 (-3～-8)
  const x = (Math.random() * 4 - 2).toFixed(2);
  const z = (Math.random() * -5 - 3).toFixed(2);

  model.setAttribute("gltf-model", `url(${choice})`);
  model.setAttribute("scale", "0.5 0.5 0.5");
  model.setAttribute("position", `${x} 3 ${z}`);

  // 落下アニメーション
  model.setAttribute(
    "animation",
    "property: position; to: " + x + " -2 " + z + "; dur: 8000; easing: linear; loop: false"
  );

  scene.appendChild(model);

  // 10秒後に削除してメモリ節約
  setTimeout(() => model.remove(), 10000);
}

// ページ読み込み時に3秒ごとにランダム生成
window.onload = () => {
  setInterval(spawnWord, 3000);
};

