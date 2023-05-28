
/**
 * Creates the Header element.
 * Cretes the Header Content and adds it to the Header
 * @return {Element} the header element
 */
function loadHeader() {
  // create Header Element
  const header = document.createElement('header');
  header.classList = ['bg-green-400 flex flex-col justify-center items-center'];
  // create HeaderContent
  const heading = document.createElement('h1');
  heading.innerText = 'Mini-Do';
  const subHeading = document.createElement('h2');
  subHeading.innerText = 'The minimalistic To-Do-List.';
  // add headerContent to HeaderElement
  header.appendChild(heading);
  header.appendChild(subHeading);
  return header;
};

export {loadHeader};
