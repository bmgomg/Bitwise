<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import Hand from './Hand.svelte';
    import Instructions from './Instructions.svelte';
    import Operators from './Operators.svelte';
    import Prompt from './Prompt.svelte';
    import QueueArea from './Queue Area.svelte';
    import Reference from './Reference.svelte';
    import Stats from './Stats.svelte';
    import Toolbar from './Toolbar.svelte';
    import { GAME_PAGE, OPP_AI } from './const';
    import Help from './routes/Help.svelte';
    import { loadCommon } from './shared.svelte';
    import { ss } from './state.svelte';
    import { post } from './utils';

    onMount(() => {
        post(loadCommon);
    });
</script>

{#if ss.page === GAME_PAGE}
    <div class="game-page" in:fade>
        {#if ss.help}
            <Help />
        {:else}
            <Stats />
            <Reference />
            <QueueArea />
            {#if !ss.over && ss.opp === OPP_AI && ss.turn === 2}
                <Hand />
            {/if}
            <Operators />
            <Instructions />
            <Prompt />
            <Toolbar />
        {/if}
    </div>
{/if}

<style>
    .game-page {
        grid-area: 1/1;
        /* place-self: center; */
        display: grid;
        grid: auto auto 1fr auto 100px auto / auto;
        gap: 15px;
        transition: opacity 0.2s;
        width: 100%;
        box-sizing: border-box;
        padding: 25px 35px;
    }
</style>
