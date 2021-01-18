<template>
  <div class="product">
    <a href="/product">
      <div class="product-image-wrapper">
        <span v-if="isNew == true" class="tag">New!</span>
        <img v-bind:src="product.thumbnail" alt="" />
        <span class="price">￥{{ product.price }}</span>
      </div>
      <div class="product-title">
        <p>{{ product.name }}</p>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ["product", "isNew"],
};
</script>