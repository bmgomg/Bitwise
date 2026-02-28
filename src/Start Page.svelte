<script>
    import OppAI from '$lib/images/Opponent AI.webp';
    import OppFriend from '$lib/images/Opponent Friend.webp';
    import { fade } from 'svelte/transition';
    import { GAME_PAGE, OPP_AI, OPP_FRIEND, START_PAGE } from './const';
    import { appKey, onPlay } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { _stats, ss } from './state.svelte';
    import TextButton from './Text Button.svelte';

    const loadGame = () => {
        const json = localStorage.getItem(appKey());
        const job = JSON.parse(json);

        if (job) {
            _sound.sfx = job.sfx;
            _sound.music = job.music;

            _stats.plays = job.plays;
            _stats.won = job.won;
            _stats.total_points = job.total_points;

            ss.started = job.started;
            ss.queue = job.queue;
            ss.score = job.score;
            ss.over = job.over;
            ss.turn = job.turn;
            ss.who_started = job.who_started;
            ss.last_op = job.last_op;

            return true;
        }

        return false;
    };

    const onOppSelect = (opp) => {
        ss.opp = opp;

        if (!_sound.musicPlayed) {
            _sound.playMusic();
        }

        if (!loadGame() || ss.over) {
            onPlay();
        }

        ss.page = GAME_PAGE;
    };

    const onBitsSelect = (bits) => {
        ss.bits = bits;
    };
</script>

{#if ss.page === START_PAGE}
    <div class="start-page" in:fade>
        <div class="title">
            <span>BITWISE</span>
            <span class="subtitle">Use your bits wisely.</span>
        </div>
        <div></div>
        <div class="ops">
            {#each [1, 2] as bits (bits)}
                {@const style = 'width: 100px; filter: drop-shadow(0 0 5px black);'}
                <TextButton
                    id={'tb-bits-' + bits}
                    text={[bits + '-BIT']}
                    disabled={ss.bits === bits}
                    selected={ss.bits === bits}
                    {style}
                    onClick={() => onBitsSelect(bits)} />
            {/each}
        </div>
        <div class="ops">
            <img src={OppAI} alt="" width="100" onpointerdown={() => onOppSelect(OPP_AI)} />
            <img src={OppFriend} alt="" width="100" onpointerdown={() => onOppSelect(OPP_FRIEND)} />
        </div>
    </div>
{/if}

<style>
    .start-page {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        justify-items: center;
    }

    .title {
        font-family: Title;
        font-size: 56px;
        font-weight: bold;
        display: grid;
        justify-items: center;
        color: #ffffffd0;
        filter: drop-shadow(0 0 5px black);
    }

    .subtitle {
        font-family: Subtitle;
        font-size: 24px;
        font-weight: normal;
    }

    .ops {
        display: grid;
        grid-auto-flow: column;
        gap: 50px;
        font-family: Title;
        font-size: 28px;
        font-weight: bold;
    }

    img {
        cursor: pointer;
        filter: drop-shadow(0 0 5px black);
        transition: filter 0.2s;
    }

    img:hover {
        filter: drop-shadow(0 0 5px white);
    }
</style>
