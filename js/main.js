const url = "../docs/pdf.pdf";

let pdfDoc = null;
let pageNum = 1;
let pageIsRendering = false;
let pageNumIsPending = null;

const scale = 1.5;
const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

//Render the page
const renderPage = num => {
  pageIsRendering = true;

  //Get page
  pdfDoc.getPage(num).then(page => {
    //Set scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport
    };
    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;
      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    //Output current page
    document.querySelector("#page-num").textContent = num;
  });
};

//Check for pages rendering
const queueRenderPage = num => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

//Show Prev Page
const showPrevPage = () => {
  if (pageNum <= 1) {
    return;
  }

  pageNum--;
  queueRenderPage(pageNum);
};

//Show next Page
const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }

  pageNum++;
  queueRenderPage(pageNum);
};

//Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  document.querySelector("#page-count").textContent = pdfDoc.numPages;

  renderPAge(pageNum);
});

// Button events
document.querySelector("#prev-page").addEventListener("click", showPrevPage);
document.querySelector("#next-page").addEventListener("click", showNextPage);
