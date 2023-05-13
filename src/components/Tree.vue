<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import flatten from '../flatten.js';
const props = defineProps({
  parentId: {
    type: String,
  },
  activeId: {
    type: String,
    default: ''
  },
  preActiveId: {
    type: String,
    default: ''
  },
  item: {
    type: Object,
    default: (() => {
      return {
        id: '',
        name: '',
        children: [],
      }
    })
  },
})

const emit = defineEmits(['onNodeClick']);

const isActiveInsideChildren = computed(() => {
  const { item, activeId, preActiveId } = props
  const flatList = flatten(item.children || [])
  const matched = flatList.map(({ id }) => id).includes(activeId) || flatList.map(({ id }) => id).includes(preActiveId)

  return matched
})

const handleTreeItemClick = (item) => {
  const { activeId, parentId, preActiveId } = props
  // toggle item who has parent
  if (!!parentId) {
    // 直接 active || 間接 active
    if (item.id === activeId || isActiveInsideChildren.value) {
      emit('onNodeClick', parentId);
      return;
    }
  }
  if (isActiveInsideChildren.value) {
    emit('onNodeClick', '');
    return;
  }
  emit('onNodeClick', item.id);
}

</script>

<template>
  <div :class="['tree-view', { 'extend': item.id === activeId || isActiveInsideChildren }]">
    <p
      class="tree-item flex"
      @click="handleTreeItemClick(item)"
    >
      <span
        v-if="item?.children?.length"
        class="prefix-icon"
      >{{ item.id === activeId || isActiveInsideChildren ? '▼' : '▶' }}</span>
      {{ item.id }} {{ item.name }}
    </p>
    <div v-if="item?.children?.length">
      <div
        v-if="item.id === activeId || isActiveInsideChildren"
        class="tree-child pl-4"
      >
        <Tree
          v-for="subNode in item?.children"
          :key="subNode.id"
          :item="subNode"
          :activeId="activeId"
          :parentId="item.id"
          :preActiveId="activeId"
          @onNodeClick="(id) => {
            $emit('onNodeClick', id)
            emit('onPreActiveIdUpdate', id);
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tree-view {
  max-height: 40px;
  padding: 5px 0;
  color: black;
  background: #f7f6f6a1;
  transition: all 0.3s ease-in;
  overflow: hidden;
  .tree-item {
    padding: 5px 10px;
    transition: all 0.3s ease-in;
    cursor: pointer;
    text-align: left;
    .prefix-icon {
      font-size: 0.3rem;
      color: gray;
      opacity: 0.7;
    }
  }
  &.extend {
    max-height: 350px;
    > p {
      background-color: gainsboro;
      font-weight: bold;
    }
  }
}
</style>