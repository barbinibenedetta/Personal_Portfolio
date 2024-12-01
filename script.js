import { projects } from "./Projects/projects.js"

const projectsSection = document.getElementById('projects');

const loadProjects = () => {
  projectsSection.innerHTML = '';

  for (let i = projects.length; i > projects.length - 6; i--) {
    const projectName = projects[i - 1].name;
    const projectNameNoUnderscores = projectName.replaceAll('_', ' ');

    projectsSection.innerHTML += `<div class="project-tile">
            <a href="https://barbinibenedetta.github.io/Personal_Portfolio/Projects/${projectName}/" target="blank">
            <div class="img-container">
              <img src="Projects\\${projectName}\\${projectName}_screen.PNG" alt="${projectNameNoUnderscores} Preview">
            </div>
              <p>${projectNameNoUnderscores}</p>
            </a>
          </div>`
  }
}

loadProjects();