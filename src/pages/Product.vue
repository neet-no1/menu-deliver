<template>
  <div class="template-wrapper">
    <PageHeader />
    <main class="product">
      <section class="product-container">
        <div class="container">
          <h1>ここに商品タイトルが入ります</h1>
          <div class="info-container">
            <div class="image-wrapper">
              <img
                src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt=""
              />
            </div>
            <div class="product-info">
              <p class="price">￥1,800</p>
              <button>商品を購入する！</button>
              <div class="info-list">
                <ul>
                  <li>
                    <span class="label">カテゴリ</span>
                    <span>[季節モノ]</span>
                  </li>
                  <li>
                    <span class="label">発送地域</span>
                    <span>[地域名]</span>
                  </li>
                  <li>
                    <span class="label">配送料の負担</span>
                    <span>[出品者負担]/[購入者負担]</span>
                  </li>
                  <li>
                    <span class="label">発送予定</span>
                    <span>[1日~3日]</span>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a
                          href="https://twitter.com/intent/tweet?url=[PAGE_URL]&text=[PAGE_TITLE]"
                          target="_blank"
                          class="twitter"
                        >
                          <img src="public/img/twitter.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://line.me/R/msg/text/?[PAGE_Title][PAGE_URL]"
                          target="_blank"
                          class="line"
                        >
                          <img src="public/img/line.png" alt=""
                        /></a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=[PAGE_URL]"
                          target="_blank"
                          class="facebook"
                        >
                          <img src="public/img/facebook.png" alt=""
                        /></a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="product-description">
            <p>
              ここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入りますここに商品の説明が入ります
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
              ここに商品の説明が入ります<br />
            </p>
          </div>
        </div>
      </section>
      <section class="comment">
        <div class="container">
          <h1>この商品へのコメント</h1>
            <ul class="comment-log">
              <li class="seller">
                <div class="comment-container">
                  <div class="image-wrapper">
                    <img src="" alt="">
                  </div>
                  <p>
                    ここでコメントのやり取りが出ます
                  </p>
                  <div class="comment-info">
                    <span>
                      [2020/12/12 12:34]
                    </span>
                    <span>
                      [投稿者名]/出品者
                    </span>
                  </div>
                </div>
              </li>
              <li class="questioner">
                <div class="comment-container questioner">
                  <div class="image-wrapper">
                    <img src="" alt="">
                  </div>
                  <p>
                    ここでコメントのやり取りが出ます
                  </p>
                  <div class="comment-info">
                    <span>
                      [2020/12/12 12:34]
                    </span>
                    <span>
                      [投稿者名]
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <details>
              <summary>コメントを投稿</summary>
              <div class="comment-regist-area">
                <textarea name="" id="" cols="30" rows="10">
                </textarea>
                <button>投稿</button>
                <p class="attention">
                  ※ 相手を不快にする言動・不適切な表現等が確認された場合は利用制限や退会処分となる事があります。
                </p>
              </div>
            </details>
        </div>
      </section>
      <section class="other-list">
        <div class="container other-list">
          <h1><a href="#">[出品者]さんのその他出品</a></h1>
          <div class="products-list">
            <ProductContainer
              v-for="(product, key) in other_list"
              :key="key"
              :product="product"
              :isNew="false"
            />
          </div>
        </div>
      </section>
      <section class="category-list">
        <div class="container other-list">
          <h1><a href="#">[カテゴリー]のその他の商品</a></h1>
          <div class="products-list">
            <ProductContainer
              v-for="(product, key) in category_product_list"
              :key="key"
              :product="product"
              :isNew="false"
            />
          </div>
        </div>
      </section>
    </main>
    <PageFooter />
  </div>
</template>

<script src="../scripts/Product.js"></script>
