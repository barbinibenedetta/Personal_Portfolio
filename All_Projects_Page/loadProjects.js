import { projects } from "../Projects/projects.js";
import { handleAllFilters } from "./filters.js";

const projectContainer = document.getElementById('project-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const selectLanguage = document.getElementById('language');
const selectOrder = document.getElementById('order');
const resetBtn = document.getElementById('reset-btn');

let currentProjectId;
let currentArray = [...projects];

// since the projects start with id = 1, position in the array is
// one less. In fact later we use projects.length as an argument.
const loadProjects = (num, arr) => {
  for (let i = num - 1; i >= num - 3; i--) {
    let projectName = arr[i].name.replaceAll('_', ' ');
    let imgSrc = `./../Projects/${arr[i].name}/${arr[i].name}_screen.PNG`;

    projectContainer.innerHTML += `
      <div id="row-div" class="row">
        <div class="col image-container">
          <a href="https://barbinibenedetta.github.io/Personal_Portfolio/Projects/${arr[i].name}/" target="_blank">
            <img src="${imgSrc}" alt="${projectName} Preview">
          </a>
        </div>
        <div class="col-6 description-container d-none d-md-block">
          <a href="https://barbinibenedetta.github.io/Personal_Portfolio/Projects/${arr[i].name}/" target="_blank">
            <h3>${projectName}</h3>
          </a>
          <p>${arr[i].description}</p>
        </div>
        <div class="col tags-container"></div>
      </div>
      <hr>
    `;

    currentProjectId = i;
  }
}

// loads the project when the page first loads
loadProjects(projects.length, projects);

//loads the more projects from the array currently examined (original or filtered)
loadMoreBtn.addEventListener('click', () => {
  if (currentProjectId > 0) {
    loadProjects(currentProjectId, currentArray);
  } else {
    alert('Woah! You\'ve gone through all my projects! Thanks!\nCome back later for more!');
  }
});

selectLanguage.addEventListener('change', () => {
  currentArray = handleAllFilters();

  projectContainer.innerHTML = '';
  loadProjects(currentArray.length, currentArray);
});

selectOrder.addEventListener('change', () => {
  currentArray = handleAllFilters();

  projectContainer.innerHTML = '';
  loadProjects(currentArray.length, currentArray);
});

resetBtn.addEventListener('click', () => {
  projectContainer.innerHTML = '';
  loadProjects(projects.length, projects);
  selectLanguage.value = 'all';
  selectOrder.value = 'newest';
})