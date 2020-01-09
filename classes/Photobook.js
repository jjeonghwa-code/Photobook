class Photobook extends EventEmitter {
  constructor(width, height) {
    super();
    this.name = "Nowy projekt";
    this.pages = [];
    this.element = document.createElement('main');
    this.element.id = 'view';
    this.width = width;
    this.height = height;
    this.addPage(fabric3);
    this.addPage(fabric2);
    this.addPage(fabric1);

    this.activePageIndex = 0;
    this.activePage = this.pages[this.activePageIndex];
    this.activePage.visible = true;
    document.querySelector('.core').appendChild(this.element);
  }

  //#region Getters and setters
  get name() {
    return this.Name;
  }

  set name(value) {
    this.Name = value !== `` ? value : `Nowy projekt`;
  }

  get width() {
    return this.Width
  }

  set width(value) {
    this.Width = value;
    this.element.style.setProperty('width', value + 'px');
  }

  get height() {
    return this.Height;
  }

  set height(value) {
    this.Height = value;
    this.element.style.setProperty('height', value + 'px');
  }
  // #endregion

  showPreviousPage() {
    if (this.activePageIndex > 0) {
      this.activePageIndex--; // activePageIndex is saint, and it cannot be touched
      this.activePage.visible = false;
      this.activePage = this.pages[this.activePageIndex];
      this.activePage.visible = true;
    }
  }

  showNextPage() {
    if (this.activePageIndex < this.pages.length - 1) {
      this.activePageIndex++;
      this.activePage.visible = false;
      this.activePage = this.pages[this.activePageIndex];
      this.activePage.visible = true;
    }
  }

  addPage(backgroundImage) {
    let page = new Page(this.width, this.height, backgroundImage);
    this.pages.push(page);
    this.element.appendChild(page.element);
    this.emit('changed');
  }

  getPage(pageNumber) {
    if (pageNumber > 0 && pageNumber < this.pages.length - 1) {
      return this.pages[pageNumber - 1];
    }
  }

  addTextBoxToPage(pageNumber) {
    this.pages[pageNumber - 1].addTextBox(0, 0);
  }

  addTextBoxToActivePage() {
    this.activePage.addTextBox(0, 0);
  }

  addImageToPage(base64Image, pageNumber) {
    this.pages[pageNumber - 1].addImage(base64Image);
  }

  addImageToActivePage(base64Image) {
    this.activePage.addImage(base64Image);
  }

  exportToJSON() {
    const jsonPhotobook = JSON.stringify(this);
    console.log(this);
  }

  exportToHTML() {
    const exporter = new HTMLExporter();
    let documentString = exporter.getPhotobookDocumentAsString(this.element);

    console.log(documentString)
    const url = URL.createObjectURL(new Blob([documentString], { type: "text/html" }));
    download(url, `${this.name}.html`);
    console.log("Html donwload shoud happened");
  }

  exportToPDF() {
    const exporter = new PDFExporter(this);
    exporter.exportToPDF();
  }
}
