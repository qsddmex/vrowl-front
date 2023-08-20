// Utilities
import { defineStore } from 'pinia'

export const useClassStore = defineStore('classStore', {
  state: () => ({
    classes: [],
    selectedClass: null,
  }),
  actions: {
    setClasses(classes) {
      this.classes = classes;
    },
    setSelectedClass(selectedClass) {
      this.selectedClass = selectedClass;
    }
  }
});
