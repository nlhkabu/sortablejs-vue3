// @ts-nocheck
import { defineStore, storeToRefs } from "pinia";

export const useDemo = defineStore({
  id: "demo",
  state: () => ({
    elements: {
      items: [
        {
          id: "1",
          text: "One",
        },
        {
          id: "2",
          text: "Two",
        },
        {
          id: "3",
          text: "Three",
        },
      ],
      fruits: [
        {
          id: "a",
          text: "Apple",
        },
        {
          id: "b",
          text: "Banana",
        },
        {
          id: "c",
          text: "Cherry",
        },
      ],
    },
  }),
  getters: {},
  actions: {},
});
