import { projects } from "../Projects/projects.js";

const selectLanguage = document.getElementById('language');
const selectOrder = document.getElementById('order');

const languageFilter = () => {
  if (selectLanguage.value === 'all') {
    return projects
  }

  const filteredArr = projects.filter(project => project.tag.some(tag => tag === selectLanguage.value));

  // only the projects that have the tag specified in the select 
  // element are added to the filtered array
  return filteredArr;
}

const sortingOrder = (arr) => {
  switch(selectOrder.value) {
    case 'oldest':
      return arr.slice().reverse();
    case 'newest':
      return arr;
    case 'alphabet':
      return [...arr].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).reverse();
    case 'reversed-alphabet':
      return [...arr].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }
}

export const handleAllFilters = () => {
  const filteredArr = languageFilter();
  const sortedArr = sortingOrder(filteredArr);
  return sortedArr;
}