import { RewriteOrchestrator } from '../rewrite/RewriteOrchestrator';
import { AISuggestionState } from './AISuggestionState';
import { AISuggestionEvents } from './AISuggestionEvents';

export class AISuggestionRuntime {
  private orchestrator = new RewriteOrchestrator();
  private state = new AISuggestionState();

  async handleEditorEvent(event: AISuggestionEvents){
    if(event.type === 'text_changed'){
      // throttle / debounce in future phase
      const out = await this.orchestrator.run(event.payload);
      this.state.update(out);
      return this.state.snapshot();
    }
    return this.state.snapshot();
  }
}
