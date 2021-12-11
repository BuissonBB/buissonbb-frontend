import CategoryModel from '@/models/CategoryModel';
import StructureModel from '@/models/StructureModel';
import { BACKEND_URL } from '@/settings';
import { reactive, computed } from 'vue'

interface ForumConfigState {
  forumConfigReady: boolean;
  title: string;
  colors: string[];
  structure: StructureModel;
  categories: {[id: number]: CategoryModel}
}

const forumConfigState: ForumConfigState = reactive({
  forumConfigReady: false,
  title: "BuissonBB",
  colors: ["#27ae60", "#27ae60"],
  structure: new StructureModel(),
  categories: {}
})

let fetching = false;

function retrieveForumConfig() {
  if(fetching || forumConfigState.forumConfigReady) return;
  fetching = true;
  fetch(BACKEND_URL + "/assets/config.json").then(data => data.json()).then(data => {
    forumConfigState.title = data.title;
    forumConfigState.structure = data.structure;
    forumConfigState.colors = data.colors;
    forumConfigState.forumConfigReady = true;
    let categories = {};
    for(const section of forumConfigState.structure.sections) {
      for(const category of section.categories) {
        category.section = section;
        categories[category.id] = category;
      }
    }
    forumConfigState.categories = categories;
  });
}

const category = id => computed(() => {
  retrieveForumConfig();
  return forumConfigState.categories[id];
});

const structure = computed(() => {
  retrieveForumConfig();
  return forumConfigState.structure;
});

const title = computed(() => {
  retrieveForumConfig();
  return forumConfigState.title;
});

const colors = computed(() => {
  retrieveForumConfig();
  return forumConfigState.colors;
});

export function useForumConfig() {
  return {
    title,
    colors,
    structure,
    category
  };
};
