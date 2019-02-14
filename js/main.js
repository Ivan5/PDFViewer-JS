const url = "../docs/pdf.pdf";

let pdfDoc = null;
let pageNum = 1;
let pageIsRendering = false;
let pageNumIsPending = null;

const scale = 1.5;
const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

//Render the page
const renderPAge = num => {
  pageIsRendering = true;

  //Get page
  pdfDoc.getPage(num).then(page => {
    console.log(page);
  });
};

//Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  document.querySelector("#page-count").textContent = pdfDoc.numPages;

  renderPAge(pageNum);
});
