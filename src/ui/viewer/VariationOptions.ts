export class VariationOptions {
  private container:HTMLElement;
  constructor(root:HTMLElement, onSelect:(v:string)=>void){
    this.container=document.createElement('div');
    this.container.style.display='flex';
    this.container.style.gap='8px';

    const variations=["mild","medium","wild"];
    variations.forEach(v=>{
      const btn=document.createElement('button');
      btn.textContent=v;
      btn.onclick=()=>onSelect(v);
      this.container.appendChild(btn);
    });

    root.appendChild(this.container);
  }
}
