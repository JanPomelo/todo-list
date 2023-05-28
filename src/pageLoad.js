'use strict';

const loadHeaderMainHeading = () => {
  const heading = document.createElement('h1');
  heading.innerText = 'Mini-Do';
  heading.classList = ['text-white text-4xl'];
  return heading;
};

const loadHeaderSubHeading = () => {
  const subHeading = document.createElement('h2');
  subHeading.innerText = 'The minimalistic To-Do-List.';
  subHeading.classList = ['text-white text-xl mb-1'];
  return subHeading;
};

const loadHeader = () => {
  // create Header Element
  const header = document.createElement('header');
  // add styling to header
  header.classList = ['bg-black flex flex-col justify-center items-center'];
  // add headerContent to HeaderElement
  header.appendChild(loadHeaderMainHeading());
  header.appendChild(loadHeaderSubHeading());
  return header;
};

const loadMain = () => {
  const main = document.createElement('main');
  main.classList = ['flex-grow'];
  return main;
};

const loadFooterText1 = () => {
  const text = document.createElement('p');
  text.innerText = 'A Project from JanPomelo';
  text.classList = ['text-white text-lg'];
  return text;
};

const loadFooterText2 = () => {
  const text = document.createElement('p');
  text.innerText = 'All Rights Reserved';
  text.classList = ['text-white '];
  return text;
};

const loadFooter = () => {
  const footer = document.createElement('footer');
  footer.classList = ['bg-black flex flex-col justify-center items-center p-1'];
  footer.appendChild(loadFooterText1());
  footer.appendChild(loadFooterText2());
  return footer;
};

const loadPage = () => {
  const content = document.createElement('div');
  content.id = 'content';
  content.classList = ['flex flex-col h-screen'];
  content.appendChild(loadHeader());
  content.appendChild(loadMain());
  content.appendChild(loadFooter());
  return content;
};
export {loadPage};
