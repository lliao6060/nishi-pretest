<script setup>
import { ref, computed, watch } from 'vue';
import tree from './static/tree.js';
import flatten from './flatten.js';
import Tree from './components/Tree.vue';
import Grid9Block from './components/grid-9-block.vue'

const activeNodeId = ref('');
const preActiveId = ref('')

const flatItemList = computed(() => flatten(tree));

const onNodeClick = (id) => {
  // get current click target
  const targetItem = flatItemList.value.find((item) => item.id === id)
  const targetItemIncludesPreId = flatten(flatItemList.value.filter((item) => {
    return item.id === id
  })).map((item) => item.id).includes(preActiveId.value)
  const isActiveIdEmpty = activeNodeId.value === ''

  if (id === activeNodeId.value) {
    activeNodeId.value = ''
  } else if(isActiveIdEmpty && targetItemIncludesPreId) {
    activeNodeId.value = preActiveId.value
  } else {
    activeNodeId.value = id
  }
};

const onPreActiveIdUpdate = (id) => {
  preActiveId.value = id
}

</script>

<template>
  <div class="container">
    <div class="w-100">
      <h3 class="title">Tree</h3>
      <div class="tree mx-auto">
        <select
          v-model="activeNodeId"
          class="tree-select"
        >
        <option
          value=""
          disabled
          selected
        >-</option>
          <option
            v-for="opt in flatItemList"
            :value="opt.id"
          >{{ opt.name }}</option>
        </select>
        <Tree
          v-for="node in tree"
          :key="node.id"
          :item="node"
          :activeId="activeNodeId"
          :preActiveId="activeNodeId"
          :selectedId="selectModel"
          @onNodeClick="onNodeClick"
          @onPreActiveIdUpdate="onPreActiveIdUpdate"
        />
      </div>
    </div>

    <div class="w-100">
      <h3 class="title">grid 9 block</h3>
      <p class="my-3">type 1</p>
      <Grid9Block />
      <br />
      <br />
      <p class="my-3">type 2</p>
      <Grid9Block :animation-type="2"/>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .title {
    padding: 5px;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .tree {
    max-width: 350px;
    margin: 10px;
    .tree-select {
      width: 100%;
    }
  }
}
</style>