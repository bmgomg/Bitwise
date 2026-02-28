import { PROMPT_TRANSITION, START_PAGE } from './const';
import { post } from './utils';

export const ss = $state({
    bits: 1,
    score: [0, 0],
    page: START_PAGE,
    show_reference: true,
});

export const _prompt = $state({
    id: '',
    opacity: 0,

    set: (id) => {
        const doSet = () => {
            _prompt.id = id;
            _prompt.opacity = id ? 1 : 0;
        };

        if (_prompt.id) {
            _prompt.opacity = 0;
            post(() => { _prompt.id = null; doSet(); }, PROMPT_TRANSITION);
        } else {
            doSet();
        }
    }
});

export const _stats = $state({
    plays: 0,
    won: 0,
    total_points: [0, 0],
});