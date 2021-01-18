<template>
  <div class="template-wrapper">
    <PageHeader />
    <main class="index">
      <div class="eye-catch"></div>
      <section class="new-products">
        <h1>新着出品</h1>
        <div class="container">
          <div class="products-list">
            <ProductContainer
              v-for="(product, key) in new_products"
              :key="key"
              :product="product"
              :isNew="true"
            />
          </div>
          <div class="view-more">
            <span>
              <a href="/archive">もっと見る！</a>
            </span>
          </div>
        </div>
      </section>
      <section class="hot-products">
        <h1 class="hot">人気カテゴリ</h1>
        <div class="container">
          <div class="products-list">
            <ProductContainer
              v-for="(product, key) in hot_products"
              :key="key"
              :product="product"
              :isNew="false"
            />
          </div>
          <div class="view-more">
            <span>
              <a href="/archive">もっと見る！</a>
            </span>
          </div>
        </div>
      </section>
      <section class="produce">
        <div class="container">
          <h1>あなたも出品してみませんか？</h1>
          <div class="step-container">
            <div class="step one">
              <img src="/public/img/ツールボックスアイコン.png" alt="" />
              <p>作成キットを購入</p>
            </div>
            <div class="step two">
              <img src="/public/img/プレゼントの無料イラスト.png" alt="" />
              <p>ハンドメイドを作成</p>
            </div>
            <div class="step three">
              <img
                src="
            /public/img/プレゼントの無料アイコン.png"
                alt=""
              />
              <p>VA-Rieで出品！</p>
            </div>
          </div>
          <div class="regist-area">
            <button>無料会員登録</button>
          </div>
        </div>
      </section>
    </main>
    <PageFooter />
  </div>
</template>

<script src="../scripts/Top.js"></script>
