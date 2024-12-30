import { projects } from "../Projects/projects.js";

const selectLanguage = document.getElementById('language');
const selectOrder = document.getElementById('order');

export const languageFilter = () => {
  if (selectLanguage.value === 'all') {
    return projects
  }

  const filteredArr = projects.filter(project => project.tag.some(tag => tag === selectLanguage.value));

  // only the projects that have the tag specified in the select 
  // element are added to the filtered array
  return filteredArr;
}

export const sortingOrder = (arr) => {
  switch(selectOrder.value) {
    case 'oldest':
      return arr.slice().reverse();
    case 'newest':
      return arr;
  }
}

export const handleAllFilters = () => {
  const filteredArr = languageFilter();
  const sortedArr = sortingOrder(filteredArr);
  return sortedArr;
}