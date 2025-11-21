
// C-25.0.3 — Modal Grammar Engine
import { frictionConfig } from '../friction/friction';

export const ModalGrammar = {
  choose(type){
    if(type === 'short') return 'BottomSheet';
    if(type === 'complex') return 'RightPanel';
    return 'Fullscreen';
  },
  apply(element, mode){
    if(mode === 'BottomSheet'){
      element.classList.add('dd-bottom-sheet');
    } else if(mode === 'RightPanel'){
      element.classList.add('dd-right-panel');
    }
  }
};
