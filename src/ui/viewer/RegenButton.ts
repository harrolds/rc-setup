export class RegenButton {
  private btn:HTMLButtonElement;
  constructor(root:HTMLElement, callback:()=>void){
    this.btn=document.createElement('button');
    this.btn.textContent="Re-Generate";
    this.btn.onclick=callback;
    root.appendChild(this.btn);
  }
}
