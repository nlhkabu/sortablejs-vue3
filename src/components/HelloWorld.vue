<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { computed, ref } from "vue";
import type { SortableOptions } from "sortablejs";
import { useDemo } from "../stores/demoStore";
import { NONAME } from "dns";

const store = useDemo();

const elements = computed(() => {
  return store.elements.items;
});

const fruits = computed(() => {
  return store.elements.fruits;
});

const logEvent = (evt: Event, evt2?: Event) => {
  if (evt2) {
    console.log(evt, evt2);
  } else {
    console.log(evt);
  }
};

const animating = ref(true);

const options = computed<SortableOptions>(() => {
  return {
    draggable: ".draggable",
    animation: animating.value ? 150 : 0,
    ghostClass: "ghost",
    dragClass: "drag",
    group: "testgroup",
  };
});

const onPress = (evt: Event) => {
  animating.value = !animating.value;
};

const removeItemFromArray = (array: string, from: number) => {
  store.elements[array].splice(from, 1)[0];
};

function onRemove(event, array) {
  removeItemFromArray(array, event.oldIndex);
  // event.item.remove(); // Hack to remove phantom DOM element :(
}

const addItemToArray = (array: string, item: object, to: number) => {
  store.elements[array].splice(to, 0, item);
};

function onAdd(event, array) {
  // temporary hardcoded fake item - TODO: get correct item from store
  let item = {
    id: "t",
    text: "test",
  };
  addItemToArray(array, item, event.newIndex);
}

const moveItemInArray = (array: string, from: number, to: number) => {
  const item = store.elements[array].splice(from, 1)[0];
  store.elements[array].splice(to, 0, item);
};

function onUpdate(event, array) {
  moveItemInArray(array, event.oldIndex, event.newIndex);
}
</script>

<style lang="css" scoped>
main {
  max-width: 800px;
  margin: 0 auto;
}

.draggable {
  background: #fff;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  cursor: move;
}

.ghost {
  opacity: 0.5;
  background: #fff;
  border: 1px dashed #ccc;
}

.drag {
  background: #f5f5f5;
}
</style>

<template>
  <main>
    <button @click="onPress">Toggle animations</button>
    <Sortable
      :list="elements"
      item-key="id"
      :options="options"
      @change="logEvent"
      @choose="logEvent"
      @unchoose="logEvent"
      @start="logEvent"
      @end="logEvent"
      @add="onAdd($event, 'items')"
      @update="onUpdate($event, 'items')"
      @sort="logEvent"
      @remove="onRemove($event, 'items')"
      @filter="logEvent"
      @move="logEvent"
      @clone="logEvent"
    >
      <template #item="{ element, index }">
        <div class="draggable" :key="element.id">
          {{ element.text }}
        </div>
      </template>
    </Sortable>

    <hr />

    <Sortable
      :list="fruits"
      item-key="id"
      :options="options"
      @change="logEvent"
      @choose="logEvent"
      @unchoose="logEvent"
      @start="logEvent"
      @end="logEvent"
      @add="onAdd($event, 'fruits')"
      @update="onUpdate($event, 'fruits')"
      @sort="logEvent"
      @remove="onRemove($event, 'fruits')"
      @filter="logEvent"
      @move="logEvent"
      @clone="logEvent"
    >
      <template #item="{ element, index }">
        <div class="draggable" :key="element.id">
          {{ element.text }}
        </div>
      </template>
    </Sortable>
  </main>
</template>

<style scoped></style>
