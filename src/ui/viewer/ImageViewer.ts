export class ImageViewer {
  private container:HTMLElement;
  private img:HTMLImageElement;

  constructor(root:HTMLElement){
    this.container=root;
    this.img=document.createElement('img');
    this.img.style.maxWidth='100%';
    this.img.style.cursor='zoom-in';
    this.container.appendChild(this.img);

    this.img.onclick=()=> this.toggleFullscreen();
  }

  show(url:string){
    this.img.src=url;
  }

  toggleFullscreen(){
    if(!document.fullscreenElement){
      this.container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
