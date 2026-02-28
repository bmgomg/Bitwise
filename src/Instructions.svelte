<script>
    import { POINTS_TO_WIN } from './const';
    import { _prompt, ss } from './state.svelte';
</script>

<div class="instr {_prompt.id || ss.over ? 'hidden' : ''}">
    {#if !_prompt.id}
        Combine the two inputs from the queue by applying an available operator above. The selected operator will become unavailable on the
        next turn. To win, score at least {POINTS_TO_WIN} points with a 2-point lead after both players have completed the same number of turns.
    {/if}
</div>

<style>
    .instr {
        grid-area: 5/1;
        place-self: center;
        display: grid;
        font-family: UI;
        font-size: 15.4px;
        filter: drop-shadow(0 0 3px #00000080);
        color: var(--blue);
        transition: opacity 0.2s;
        translate: 0 -10px;
    }

    .hidden {
        opacity: 0;
    }
</style>
