<script lang="ts">
    import ArrowIcon from "virtual:icons/material-symbols/arrow-forward-rounded";
    import { Temporal } from "@js-temporal/polyfill";

    interface Props {
        title: string;
        description: string;
        href: string;
        tag: string;
        readTime: Temporal.Duration;
    }

    let { title, description, href, tag, readTime }: Props = $props();
</script>

<a {href} class="container" title="Read - {readTime.toLocaleString()}">
    <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-[0.35rem]">
            <span class="text-[0.7rem] font-medium uppercase tracking-wider rounded bg-[color:var(--button-secondary)] text-[color:var(--text-primary)] px-[7px] py-0.5">{tag}</span>
            <span class="text-xs text-[color:var(--text-secondary)]">{readTime.toLocaleString()} read</span>
        </div>
        <h2 class="text-base font-medium text-[color:var(--text-primary)] mt-0 mb-1 mx-0">{title}</h2>
        <p class="text-sm text-[color:var(--text-body)] leading-normal m-0">{description}</p>
    </div>

    <span class="arrow" aria-hidden="true">
        <ArrowIcon />
    </span>
</a>

<style>
    .container {
        display: flex;
        align-items: center;
        padding: 1.25rem 1rem;
        border-bottom: none;
        text-decoration: none;
        user-select: none;

        transition-duration: var(--transition-delay);
        transition-property: background, transform;
    }

    .container:hover,
    .container:focus {
        background: var(--background-container);
        border-radius: 8px;

        transform: scale(1.02);
    }

    .arrow {
        font-size: 1.1rem;
        color: var(--text-secondary);
        flex-shrink: 0;
        transition: transform var(--transition-delay);
    }

    .container:hover .arrow,
    .container:focus .arrow {
        color: var(--link-color);
    }
</style>
